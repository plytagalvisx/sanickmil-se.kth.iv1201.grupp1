import axios from './RequestObject';

const USER = 'api/user';
const AUTH = 'api/auth';
/**
 * Works as a service between the front-end and back-end. The functions in this class are all database calls regarding users
 */
class UserService {

  /**
   * Logs in a user by username and password
   * @param {String} username Username
   * @param {String} password Password
   */
  static login(username, password) {
    return axios.get(AUTH, {
      params: {
        username,
        password
      }
    }).then(response => {
      return {
        ...response.data,
        auth: response.headers.authorization
      }
    })
    // .catch(err => err);
  }

  /**
   * Register a new user in the database
   * @param {String} username The username to be registered
   * @param {String} password The password to be registered
   * @param {String} email The email to be registered
   * @param {String} firstname The first name to be registered
   * @param {String} lastname The last name to be registered
   * @param {Object} ssn The SSN to be registered
   */
  static register(username, password, email, firstname, lastname, ssn) {
    return axios.post(USER, {
      username,
      password,
      email,
      firstname,
      lastname,
      ssn
    });
  }

  /**
   * Gets necessary information for application receipt
   */
  static getUserInfo(){
    return axios.get(USER)
  }
}

export default UserService;