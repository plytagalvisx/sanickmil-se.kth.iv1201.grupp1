import axios from './RequestObject';

const APPLICATION = 'api/application';
const SKILLS = 'api/skills';

class ApplicationService {

  static saveState(qualifications, availability) {
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }
  static removeState(){
    return axios.delete(APPLICATION);
  }

  static getApplications() {
    return axios.get(APPLICATION);
  }

  static getSkills() {
    return axios.get(SKILLS);
  }
}

export default ApplicationService;