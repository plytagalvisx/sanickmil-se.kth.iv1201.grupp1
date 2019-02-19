import axios from './RequestObject';

const USER = 'api/user';
const AUTH = 'api/auth';
class UserService {

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

  static logout() {
    return axios.delete(`${AUTH}`, {
      headers: {
        'Authorization': localStorage.getItem('userAuth')
      }
    }).then(response => response.data)
  }

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

  //Gets necessary information for application receipt
  static getUserInfo(){
    return axios.get(USER)
  }
}

export default UserService;