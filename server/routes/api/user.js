const express = require('express');
const bcrypt = require('bcryptjs');
const dbservice = require('../../integration/database-services');
const router = express.Router();
const config = require('../../config');
const { validationResult } = require('express-validator/check');
const validatingRegister = require('../../validation/validateRegister');
const { prettyValidation } = require('../../helpers/formatValidationError');
const ERROR = require('../../helpers/errors')

/**
 * POST: Register a new user
 */
router.post('/', validatingRegister, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const error = prettyValidation(result);
    return res.status(400).json(error);
  }
  try {
    const hash = await bcrypt.hash(req.body.password, config.BCRYPTSALT);
    const newUser = {
      username: req.body.username,
      password: hash,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      ssn: req.body.ssn,
      role: 'applicant'
    }
    await dbservice.registerUser(newUser);
    return res.status(201).json({message: 'Successfully registered user'});
  } catch (err) {
    if (err.errorCode === ERROR.USER.DUPLICATE) {
      return res.status(409).json({message: 'A user with that username already exists, try another one!'});
    }
    console.log('Unhandled error in POST /user:', err);
    return res.sendStatus(500);
  }
});

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
  try {
    const fetchedUser = await dbservice.getBasicUserInfo(req.userSSN);
    return res.json(fetchedUser);
  } catch (err) {
    if (err.errorCode === ERROR.USER.NOT_FOUND) {
      return res.status(404).json({message: 'User not found.'});
    }
    console.log('Unhandled error in GET /user:', err);
    return res.sendStatus(500);
  }
});

module.exports = router;