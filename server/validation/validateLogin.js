const { check } = require('express-validator/check')

module.exports = [
  check('username').matches(/[a-zA-Z\d]/).withMessage('The username can only contain letters and/or numbers')
  .not().isEmpty().withMessage('The username cannot be empty'),
  check('password').matches(/[a-zA-Z\d]/).withMessage('The password can only contain letters and/or numbers')
  .not().isEmpty().withMessage('The password cannot be empty')
]