import axios from 'axios';

const USER = 'api/user';
class UserService {

  static login(username, password) {
    return axios.post(USER, {
      username,
      password
    }).then(response => {
      return response.data
    })
  }
  static checkToken() {
    return axios.get(`${USER}/auth`).then(response => response.data);
  }

  static logout() {
    return axios.get(`${USER}/logout`, {}).then(response => response.data)
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
}

export default UserService;