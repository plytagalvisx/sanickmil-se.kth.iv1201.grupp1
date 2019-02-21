const { check } = require('express-validator/check')

module.exports = [
  check('username').matches(/[a-zA-Z\d]/).withMessage('must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('has to be filled in'),
  check('password').matches(/[a-zA-Z\d]/).withMessage('must contain letters and/or numbers')
  .exists(`checkNull`).withMessage('has to be filled in')
]