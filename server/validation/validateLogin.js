const { check } = require('express-validator/check')

module.exports = [
  /**
   * Checks that the username only contains lowercase and/or uppercase letters and that the username is filled in.
   */
  check('username').matches(/[a-zA-Z\d]/).withMessage('The username can only contain letters and/or numbers')
  .not().isEmpty().withMessage('The username cannot be empty'),
  /**
   * Checks that the password only contains lowercase, uppercase and/or numbers and that it is filled in.
   */
  check('password').matches(/[a-zA-Z\d]/).withMessage('The password can only contain letters and/or numbers')
  .not().isEmpty().withMessage('The password cannot be empty')
]