import axios from './RequestObject';

const APPLICATION = 'api/application';
const SKILLS = 'api/skills';

/**
 * Works as a service between the front-end and back-end. The functions in this class are all database calls regarding applications
 */
class ApplicationService {

  /**
   * Updates an application in the database
   * @param {Object} qualifications The qualifications to be updated
   * @param {Object} availability The availability to be updated
   */
  static updateApplication(qualifications, availability) {
    return axios.patch(APPLICATION, {
      qualifications,
      availability
    });
  }

  /**
   * Submits an application to the database.
   * @param {Object} qualifications The qualifications to be added to the users profile (or application)
   * @param {Object} availability The availabilities to be added to the users profile (or application)
   */
  static submitApplication(qualifications, availability) {
    return axios.post(APPLICATION, {
      qualifications,
      availability
    });
  }

  /**
   * Get all applications in the database.
   * Can only be done by recruiters
   */
  static getApplications() {
    return axios.get(APPLICATION  + "/all");
  }

  /**
   * Get one specific application from the database
   */
  static getApplication() {
    return axios.get(APPLICATION);
  }

  /**
   * Get the skills that is stored in the database in order to populate the qualifications that one can choose from
   * when applying
   */
  static getSkills() {
    return axios.get(SKILLS);
  }

  /**
   * Updates one specific application with a new application status
   * @param {Number} ssn Social security number of the applicant which the recruiter wants to change status of
   * @param {String} status The new status that should be changed to
   */
  static changeStatus(ssn, status) {
    return axios.patch(APPLICATION + "/" + ssn, {
      status
    });
  }

  /**
   * Deletes one specific application
   * This is not implemented in the user interface yet
   */
  static deleteApplication() {
    return axios.delete(APPLICATION);
  }
}

export default ApplicationService;