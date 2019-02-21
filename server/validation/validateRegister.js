const { check } = require('express-validator/check')

module.exports = [
  check('username').matches(/[a-zA-Z\d]/).withMessage('must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('has to be filled in'),
  check('password').matches(/[a-zA-Z\d]/).withMessage('must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('has to be filled in'),

  check('email').isEmail().withMessage('has to be an email').exists(`checkNull`).withMessage('cannot be empty'),

  check('firstname').matches(/[a-zA-Z]/).withMessage('has to contain letters').exists(`checkNull`).withMessage('cannot be empty'),

  check('lastname').matches(/[a-zA-Z]/).withMessage('has to contain letters').exists(`checkNull`).withMessage('cannot be empty'),

  check('ssn').matches(/^(19|20)[0-9]{6}[- ]?[0-9]{4}$/).withMessage('has to be in the format YYYYMMDD-XXXX').exists(`checkNull`)
]