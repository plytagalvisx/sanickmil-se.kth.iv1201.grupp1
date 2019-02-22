import axios from './RequestObject';

const APPLICATION = 'api/application';
const SKILLS = 'api/skills';

class ApplicationService {

  static updateApplication(qualifications, availability) {
    return axios.patch(APPLICATION, {
      qualifications,
      availability
    });
  }

  static submitApplication(qualifications, availability) {
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