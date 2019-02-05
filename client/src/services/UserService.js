import axios from 'axios';

const USER = 'api/user';
const APPLICATION = 'api/application';

class UserService {

  static login(username, password) {
<<<<<<< HEAD
    // eslint-disable-next-line
    console.log('CHECKTOKEN');
=======
>>>>>>> started work on saving state of application in cookies
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

<<<<<<< HEAD
  static apply(firstname, lastname, email) {
    return axios.post(APPLICATION, {
      firstname,
      lastname,
      email,

=======
  static saveState(qualifications, availability) {
    return axios.post(APPLICATION, {
      qualifications,
      availability
>>>>>>> started work on saving state of application in cookies
    });
  }
}

export default UserService;