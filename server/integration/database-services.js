const mongodb = require('mongodb');
const config = require('../config');
const bcrypt = require('bcryptjs');

const DUPL_USER = 11000;

class DBService {

  static async loadUserCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    });
    return client.db('sanickmil-recruitment').collection('users');
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
        fields: {
          _id: 0,
          password: 1
        }
      });
      return await bcrypt.compare(password, foundUser.password);
    } catch (err) {
      console.log('Error in authenticateUser: ', err);
      throw err;
    }
  }

  /**
   * 
   * @param {String} username The user to get info of
   * @returns {Object} A object containing the: username, firstname, lastname, email, role
   */
  static async getBasicUserInfo(username) {
    try {
      const userCollection = await this.loadUserCollection();
      return await userCollection.findOne({
        username
      }, {
        fields: {
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
      await application.updateOne({
        ssn
      }, {
        $set: {
          qualifications,
          availability,
          applicationStatus: 'unhandled'
        }
      });
    } catch (err) {
      console.log('Error in submitApplication: ', err);
      throw err;
    }
  }

  /**
   * Gets all the applications of applicants who has a applicationStatus
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
      return applications.length === 1 ? applications : null;
    } catch (err) {
      console.log('Error in getApplicationStatusBySSN', err);
      throw err;
    }
  }

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
          availability: ''
        }
      })
    } catch (err) {
      console.log('Error in removeApplicationBySSN', err);
      throw err;
    }
  }
}

module.exports = DBService;