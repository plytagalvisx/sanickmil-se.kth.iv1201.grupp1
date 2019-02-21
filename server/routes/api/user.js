const express = require('express');
const bcrypt = require('bcryptjs');
const dbservice = require('../../integration/database-services');
const router = express.Router();
const config = require('../../config');
const { validationResult } = require('express-validator/check');
const validatingRegister = require('../../validation/validateRegister');
const { prettyValidation } = require('../../helpers/formatValidationError');

/**
 * This is for ADDING users aka registry.
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
    res.status(201).json({message: 'Successfully registered user'});
  } catch (err) {
    if (err === 'DUPLICATE_USER') {
      return res.status(409).json({message: 'A user with that username already exists, try another one!'});
    }
    res.status(500).json({message: 'Internal error'});
  }
});

/**
 * Get a single user basic info
 */
router.get('/', async (req, res) => {
  try {
    const fetchedUser = await dbservice.getBasicUserInfo(req.userSSN);
    res.json(fetchedUser);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;