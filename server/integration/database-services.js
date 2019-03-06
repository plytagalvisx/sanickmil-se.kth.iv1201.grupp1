const mongodb = require('mongodb');
const config = require('../config');
const bcrypt = require('bcryptjs');
const {ERROR} = require('../../common/messageEnums');
const MyError = require('../helpers/MyError');

const DUPL_USER = 11000;
class DBService {

  /**
   * Loads the user collection from MongoDB
   */
  static async loadUserCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    });
    return client.db('sanickmil-recruitment').collection('user');
  }

  /**
   * Loads the skill collection from MongoDB
   */
  static async loadSkillCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    });
    return client.db('sanickmil-recruitment').collection('skill');
  }

  /**
   * Authenticates a user by their username and password
   * @param {String} username The username to be authenticated
   * @param {String} password The password to authenticate the username with
   * @returns {Boolean} True if the user is authenticated, otherwise false.
   */
  static async authenticateUser(username, password) {
    try {
      const userCollection = await this.loadUserCollection();
      const foundUser = await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          password: 1
        }
      });
      if (!foundUser) {
        console.log('Error in authenticateUser, no user found')
        throw new MyError('No such user').setCode(ERROR.USER.NOT_FOUND);
      }
      return await bcrypt.compare(password, foundUser.password);
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      console.log('Error in authenticateUser: ', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Gets basic user information by username
   * @param {String} username The username to fetch user information from
   * @returns {Object} A object containing the: username, firstname, lastname, email, role
   */
  static async getBasicUserInfo(username) {
    try {
      const userCollection = await this.loadUserCollection();
      const foundUser = await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          username: 1,
          firstname: 1,
          lastname: 1,
          ssn: 1,
          email: 1,
          role: 1,
        }
      });
      if (!foundUser) {
        throw new MyError('No user was found by that username').setCode(ERROR.USER.NOT_FOUND);
      }
      return foundUser;
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      console.log('Error in getBasicUserInfo', err);
      throw new MyError('Error fetching from database').setCode(ERROR.DB.ERROR);
    }
  }
/**
 * Gets a users SSN by the username
 * @param {String} username The username of the user.
 * @returns {String} The SSN of the user.
 */
  static async getSSNByUsername(username) {
    try {
      const userCollection = await this.loadUserCollection();
      const foundSSN = await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          ssn: 1,
        }
      });
      if (!foundSSN) {
        throw new MyError('No such user').setCode(ERROR.USER.NOT_FOUND);
      }
      return foundSSN.ssn;
    } catch (err) {
      if (err.errorCode === ERROR.USER.NOT_FOUND)
        throw err;
      console.log('Error in getSSNByUsername', err);
      throw new MyError('No such user').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Gets all skills from the database.
   * @returns {Array} A array of all skills as strings
   */
  static async getSkills() {
    try {
      const skillCollection = await this.loadSkillCollection();
      let fetchedSkills = await skillCollection.find({}).project({
        _id: 0
      }).toArray();
      fetchedSkills = fetchedSkills.map((ele) => ele.name);
      return fetchedSkills;
    } catch (err) {
      console.log('Error in getSkills', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Registers a new user to the database
   * @param {Object} newUser The new user to be registered
   */
  static async registerUser(newUser) {
    try {
      const userCollection = await this.loadUserCollection();
      await userCollection.insertOne(newUser);
    } catch (err) {
      if (err.code === DUPL_USER)
        throw new MyError('A user with that username already exists').setCode(ERROR.USER.DUPLICATE);
      
        console.log('Error in registerUser: ', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Submits a application. Overwrites any existing application.
   * @param {String} ssn The Social Security Number
   * @param {Array} qualifications An array of qualifications
   * @param {Array} availability An array of the availability periods
   */
  static async submitApplication(ssn, qualifications, availability) {
    try {
      const application = await this.loadUserCollection();
      const results = await application.findOneAndUpdate({
        ssn,
        applicationStatus: {
          $exists: false
        }
      }, {
        $set: {
          qualifications,
          availability,
          applicationStatus: 'unhandled',
          submissionDate: new Date().toISOString()
        }
      }, {
        upsert: false,
        new: true
      });
      if (!results.lastErrorObject.updatedExisting) {
        throw new MyError('Application already exists. PATCH to update it instead.').setCode(ERROR.APPLICATION.ALREADY_SUBMITTED);
      }
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      console.log('Error in submitApplication: ', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Updates an application
   * @param {String} ssn The social security number of the update user
   * @param {Object} updateObject An object containing two keys: qualifications & availability
   */
  static async updateApplication(ssn, updateObject) {
    const expected = 2;
    let count = 0;
    for (let key in updateObject) {
      if (updateObject.hasOwnProperty(key)) {
        count++;
      }
    }
    if ((!updateObject.qualifications || !updateObject.availability) || count !== expected)
      throw new MyError('Incomplete parameters').setCode(ERROR.APPLICATION.INCOMPLETE_PARAMS);
    try {
      const application = await this.loadUserCollection();
      await application.findOneAndUpdate({
        ssn
      }, {
        $set: {
          ...updateObject,
          submissionDate: new Date().toISOString()
        }
      }, {
        upsert: false,
        new: true
      }, (err, docs) => {
        if (err) {
          console.log('Error in updateApplication', err);
          throw new MyError('Database error').setCode(ERROR.DB.ERROR);
        }
        console.log(docs);
      });
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Gets all the applications of applicants who has an applicationStatus
   * @returns {Array} Returns a array of application objects
   */
  static async getAllApplications() {
    try {
      const applicationCollection = await this.loadUserCollection();
      const applications = await applicationCollection.find({
        role: 'applicant',
        applicationStatus: {
          $exists: true
        }
      }).project({
        _id: 0,
        username: 0,
        password: 0,
        person_id: 0,
        role: 0
      }).toArray();
      if (applications.length === 0 || !applications)
        throw new MyError('No applications was found').setCode(ERROR.APPLICATION.NOT_FOUND);
      return applications;
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      console.log('Error in getAllApplications', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Gets the application by SSN
   * @param {String} ssn The Social Security Number of the applicant
   * @returns {Object} An application object
   */
  static async getApplicationStatusBySSN(ssn) {
    try {
      const applicationCollection = await this.loadUserCollection();
      const application = await applicationCollection.find({
        ssn,
        role: 'applicant',
        applicationStatus: {
          $exists: true
        }
      }).project({
        _id: 0,
        username: 0,
        password: 0,
        person_id: 0,
        role: 0
      }).toArray();
      if (application.length === 0 || !application)
        throw new MyError('No application was found by that SSN').setCode(ERROR.APPLICATION.NOT_FOUND);
        return application[0];
      } catch (err) {
        if (err instanceof MyError)
         throw err;
      console.log('Error in getApplicationStatusBySSN', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Allows a recruiter to handle the application, by setting its status.
   * @param {String} ssn Social security number of the application
   * @param {String} status Application status. Might be: accepted|rejected|unhandled
   */
  static async handleApplication(ssn, status) {
    if (!(status === 'accepted' || status === 'rejected'))
      throw new MyError('Status parameter must be \'accepted\', \'rejected\'').setCode(ERROR.APPLICATION.INCOMPLETE_PARAMS);
      try {
        const userCollection = await this.loadUserCollection();
        const result = await userCollection.findOneAndUpdate({
          ssn,
          applicationStatus: 'unhandled'
        }, {
          $set: {
            applicationStatus: status
          }
        });
        if (!result.lastErrorObject.updatedExisting) {
          throw new MyError('Already handled').setCode(ERROR.APPLICATION.ALREADY_HANDLED);
        }
      } catch (err) {
        if (err instanceof MyError)
          throw err;
        console.log('Error in handleApplication:', err);
        throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }

  /**
   * Removes a application from a user.
   * @param {String} ssn The SSN of the person who wants to remove their application
   */
  static async removeApplicationBySSN(ssn) {
    try {
      const applicationCollection = await this.loadUserCollection();
      applicationCollection.updateOne({
        ssn
      }, {
        $unset: {
          applicationStatus: '',
          qualifications: '',
          availability: '',
          submissionDate: ''
        }
      })
    } catch (err) {
      console.log('Error in removeApplicationBySSN', err);
      throw new MyError('Database error').setCode(ERROR.DB.ERROR);
    }
  }
}

module.exports = DBService;