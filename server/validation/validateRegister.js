const { check } = require('express-validator/check')

module.exports = [
  /**
   * Checks that the username only contains lowercase and/or uppercase letters and that the username is filled in.
   */
  check('username').matches(/[a-öA-Ö\d]/).withMessage('Username must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('Username has to be filled in'),
  /**
   * Checks that the password only contains lowercase, uppercase and/or numbers and that it is filled in.
   */
  check('password').matches(/[a-öA-Ö\d@$!%*#?&]/).withMessage('The password must contain letters, numbers and/or special characters')
  .exists(`checkNull`).withMessage('Password has to be filled in').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  /**
   * Checks that the email is written in the form of test@gmail.com and that it is filled in.
   */

  check('email').isEmail().withMessage('Email has to be an email').exists(`checkNull`).withMessage('Email cannot be empty'),
  /**
   * Checks that the first name only contains lowercase and/or uppercase and that it is filled in.
   */

  check('firstname').matches(/[a-öA-Ö]/).withMessage('First name has to contain letters').exists(`checkNull`).withMessage('First name cannot be empty'),
  /**
   * Checks that the last name only contains lowercase and/or uppercase and that it is filled in.
   */

  check('lastname').matches(/[a-öA-Ö]/).withMessage('Last name has to contain letters').exists(`checkNull`).withMessage('Last name cannot be empty'),
  /**
   * Checks that the ssn is in the form of YYYYMMDD-XXXX and that the first two digits are 19 or 20. Also checks that ssn is filled in.
   */

  check('ssn').matches(/^(19|20)[0-9]{6}[- ]?[0-9]{4}$/).withMessage('SSN has to be in the format YYYYMMDD-XXXX').exists(`checkNull`)
]