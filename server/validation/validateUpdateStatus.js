const { check } = require('express-validator/check')

module.exports = [
  /**
   * Checks that the ssn is in the form of YYYYMMDD-XXXX and that the first two digits are 19 or 20. Also checks that ssn is filled in.
   */
  check('ssn').matches(/^(19|20)[0-9]{6}[- ]?[0-9]{4}$/).withMessage('The SSN has to be in the format YYYYMMDD-XXXX')
  .not().isEmpty().withMessage('SSN cannot be empty'),

  /**
   * Checks that the status is only lowercase letters and it is not empty.
   */
  check('status').matches(/[a-z]/).withMessage('The status may only contain small letters').not().isEmpty().withMessage('The status cannot be empty')
]