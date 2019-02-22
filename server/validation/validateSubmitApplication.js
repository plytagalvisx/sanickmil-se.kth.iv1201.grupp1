const { check } = require('express-validator/check')

module.exports = [
  check('qualifications').isArray().withMessage('NOT ARRAY!'),

  check('qualifications.*.competenceName').not().isEmpty().withMessage('You have to fill out at least one qualification')
  .isString().withMessage('The competence name may only contain letters'),

  check('qualifications.*.yearsOfExperience').not().isEmpty().withMessage("You have to fill out years of experience")
  .isNumeric().withMessage('Years of experience can only contain numbers')
]