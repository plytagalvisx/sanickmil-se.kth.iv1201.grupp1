import axios from 'axios';

const APPLICATION = 'api/application';

class ApplicationService {

static saveState(qualifications, availability) {
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }
static removeState(){
    return axios.delete(APPLICATION, {
    });
}
}

export default ApplicationService;