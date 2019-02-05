import axios from 'axios';

const USER = 'api/user';
const AUTH = 'api/auth';
const APPLICATION = 'api/application';

class UserService {

  static login(username, password) {
    return axios.get(USER, {
      params: {
        username,
        password
      }
    }).then(response => response.data);
  }
  static checkToken() {
    return axios.get(`${AUTH}`).then(response => response.data);
  }

  static logout() {
    return axios.delete(`${AUTH}`, {}).then(response => response.data)
  }

  static register(username, password, email, firstname, lastname, birth) {
    return axios.post(USER, {
      username,
      password,
      email,
      firstname,
      lastname,
      birth
    });
  }

  static saveState(qualifications, availability) {
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }
}

export default UserService;