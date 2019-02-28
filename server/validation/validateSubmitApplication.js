const { check } = require('express-validator/check')

module.exports = [
  check('qualifications').isArray().withMessage('NOT ARRAY!'),
  /**
   * Checks that the competence name is filled in and that it is only letters.
   */

  check('qualifications.*.competenceName').not().isEmpty().withMessage('You have to fill out at least one qualification')
  .isString().withMessage('The competence name may only contain letters'),
  /**
   * Checks that years of experience is filled in and it is only numbers.
   */

  check('qualifications.*.yearsOfExperience').not().isEmpty().withMessage("You have to fill out years of experience")
  .isNumeric().withMessage('Years of experience can only contain numbers')
]