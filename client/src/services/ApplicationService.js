import axios from './RequestObject';

const APPLICATION = 'api/application';
const SKILLS = 'api/skills';

class ApplicationService {

  static saveState(qualifications, availability) {
    // eslint-disable-next-line
    console.log("In saveState")
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }
  static removeState(){
    return axios.delete(APPLICATION);
  }

  static submitApplication(ssn, qualifications, availability) {
    return axios.post(APPLICATION, {
      ssn,
      qualifications,
      availability
    });
  }

  static getApplications() {
    return axios.get(APPLICATION  + "/all");
  }

  static getPersonalApplication() {
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
}

export default ApplicationService;