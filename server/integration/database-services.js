const mongodb = require('mongodb');
const config = require('../config');
const bcrypt = require('bcryptjs');

const DUPL_USER = 11000;
class DBService {

  static async loadUserCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    });
    return client.db('sanickmil-recruitment').collection('user');
  }

  static async loadSkillCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    });
    return client.db('sanickmil-recruitment').collection('skill');
  }

  /**
   * Authenticates a user by their username and password
   * @param {String} username The username
   * @param {String} password The password
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
        console.log("Error in authenticateUser, no user found: ", err)
        throw 'NO_SUCH_USER';
      }
      return await bcrypt.compare(password, foundUser.password);
    } catch (err) {
      console.log('Error in authenticateUser: ', err);
      throw err;
    }
  }

  /**
   * Gets basic user information by SSN.
   * @param {String} SSN The user to get info of
   * @returns {Object} A object containing the: username, firstname, lastname, email, role
   */
  static async getBasicUserInfo(ssn) {
    try {
      const userCollection = await this.loadUserCollection();
      return await userCollection.findOne({
        ssn
      }, {
        projection: {
          _id: 0,
          username: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          ssn: 1,
          role: 1,
        }
      });
    } catch (err) {
      console.log('Error in getBasicUserInfo', err);
      throw err;
    }
  }

  /**
   * Gets basic user information by username
   * @param {String} username Username
   * @returns {Object} A object containing the: username, firstname, lastname, email, role
   */
  static async getBasicUserInfoByUsername(username) {
    try {
      const userCollection = await this.loadUserCollection();
      return await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          username: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          role: 1,
        }
      });
    } catch (err) {
      console.log('Error in getBasicUserInfo', err);
      throw err;
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
        throw 'NO_SUCH_USER';
      }
      return foundSSN.ssn;
    } catch (err) {
      console.log('Error in getSSNByUsername', err);
      throw err;
    }
  }

  /**
   * Gets all skills from the database.
   * @returns {Array} A array of all skills as astrings
   */
  static async getSkills() {
    const skillCollection = await this.loadSkillCollection();
    try {
      let fetchedSkills = await skillCollection.find({}).project({
        _id: 0
      }).toArray();
      fetchedSkills = fetchedSkills.map((ele) => ele.name);
      return fetchedSkills;
    } catch (err) {
      console.log('Error in getSkills', err);
      throw err;
    }
  }

  /**
   * Registers a new user to the database
   * @param {Object} newUser The new user to be registerd
   */
  static async registerUser(newUser) {
    try {
      const userCollection = await this.loadUserCollection();
      await userCollection.insertOne(newUser);
    } catch (err) {
      if (err.code === DUPL_USER) {
        console.log('Error in registerUser: Duplicate user');
        throw 'DUPLICATE_USER';
      }
      console.log('Error in registerUser: ', err);
      throw err;
    }
  }

  /**
   * Submits a application. Overwrites any existing application.
   * @param {String} ssn The Social Securit Number
   * @param {Array} qualifications A array of qualifications
   * @param {Array} availability A array of the availability periods
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
        console.log('Errorn in submitApplication: application already exists...')
        throw 'APPLICATIONS_ALREADY_EXISTS'
      }
    } catch (err) {
      console.log('Error in submitApplication: ', err);
      throw err;
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
      throw 'A application edit must contain both availability and qualifications';
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
          throw err;
        }
        console.log(docs);
      });
    } catch (err) {
      console.log('Error in updateApplication', err);
      throw err;
    }
  }

  /**
   * Gets all the applications of applicants who has an applicationStatus
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
      return applications;
    } catch (err) {
      console.log('Error in getAllApplications', err);
      throw err;
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
      const applications = await applicationCollection.find({
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
      return applications.length === 1 ? applications[0] : null;
    } catch (err) {
      console.log('Error in getApplicationStatusBySSN', err);
      throw err;
    }
  }

  /**
   * Allows a recruiter to handle the application, by setting its status.
   * @param {String} ssn Social security number of the application
   * @param {String} status Application status. Might be: accepted|rejected|unhandled
   */
  static async handleApplication(ssn, status) {
    if (!(status === 'accepted' || status === 'rejected' || status === 'unhandled'))
      throw 'INCORRECT_PARAMETERS';
    try {
      const userCollection = await this.loadUserCollection();
      userCollection.findOneAndUpdate({
        ssn,
        applicationStatus: {
          $exists: true
        }
      }, {
        $set: {
          applicationStatus: status
        }
      });
    } catch (err) {
      console.log('Error in handleApplication:', err);
      throw err;
    }
  }

  /**
   * Removes a application from a user.
   * @param {String} ssn The SSN of the person who wants to remove their application
   */
  static async removeApplicationBySSN(ssn) {
    // TODO: Validate ssn
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
      throw err;
    }
  }
}

module.exports = DBService;