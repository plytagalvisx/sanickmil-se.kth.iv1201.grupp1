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
   * @deprecated Logs out a user. 
   */
  static logout() {
    return axios.delete(`${AUTH}`, {
      headers: {
        'Authorization': localStorage.getItem('userAuth')
      }
    }).then(response => response.data)
  }

  /**
   * Adds a new user in the database
   * @param {String} username 
   * @param {String} password 
   * @param {String} email 
   * @param {String} firstname 
   * @param {String} lastname 
   * @param {Object} ssn 
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

  static getUser(usr) {
    return axios.get(USER + "/" + usr)
  }

  /**
   * Gets necessary information for application receipt
   */
  static getUserInfo(){
    return axios.get(USER)
  }
}

export default UserService;