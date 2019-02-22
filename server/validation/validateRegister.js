const { check } = require('express-validator/check')

module.exports = [
  check('username').matches(/[a-öA-Ö\d]/).withMessage('Username must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('Username has to be filled in'),
  check('password').matches(/[a-öA-Ö\d@$!%*#?&]/).withMessage('The password must contain letters, numbers and/or special characters')
  .exists(`checkNull`).withMessage('Password has to be filled in').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),

  check('email').isEmail().withMessage('Email has to be an email').exists(`checkNull`).withMessage('Email cannot be empty'),

  check('firstname').matches(/[a-öA-Ö]/).withMessage('First name has to contain letters').exists(`checkNull`).withMessage('First name cannot be empty'),

  check('lastname').matches(/[a-öA-Ö]/).withMessage('Last name has to contain letters').exists(`checkNull`).withMessage('Last name cannot be empty'),

  check('ssn').matches(/^(19|20)[0-9]{6}[- ]?[0-9]{4}$/).withMessage('SSN has to be in the format YYYYMMDD-XXXX').exists(`checkNull`)
]