const { check } = require('express-validator/check')

module.exports = [
  check('ssn').matches(/^(19|20)[0-9]{6}[- ]?[0-9]{4}$/).withMessage('The SSN has to be in the format YYYYMMDD-XXXX')
  .not().isEmpty().withMessage('SSN cannot be empty'),

  check('status').matches(/[a-z]/).withMessage('The status may only contain small letters').not().isEmpty().withMessage('The status cannot be empty')
]