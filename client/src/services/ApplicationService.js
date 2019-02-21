import axios from './RequestObject';

const APPLICATION = 'api/application';
const SKILLS = 'api/skills';

class ApplicationService {

  static updateApplication(qualifications, availability) {
    // eslint-disable-next-line
    console.log("In update")
    return axios.patch(APPLICATION, {
      qualifications,
      availability
    });
  }

  static submitApplication(qualifications, availability) {
    // eslint-disable-next-line
    console.log("In submit")
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }

  static removeState(){
    return axios.delete(APPLICATION);
  }

  static getApplications() {
    return axios.get(APPLICATION  + "/all");
  }

  static getApplication() {
    return axios.get(APPLICATION);
  }

  static getSkills() {
    return axios.get(SKILLS);
  }

  static changeStatus(ssn, status) {
    return axios.patch(APPLICATION + "/" + ssn, {
      status
    });
  }

  static deleteApplication() {
    return axios.delete(APPLICATION);
  }
}

export default ApplicationService;