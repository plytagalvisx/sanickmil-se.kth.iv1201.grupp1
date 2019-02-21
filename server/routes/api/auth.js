const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();
const dbservice = require('../../integration/database-services.js');
const { validationResult } = require('express-validator/check');
const validatingLogin = require('../../validation/validateLogin');
const { prettyValidation } = require('../../helpers/formatValidationError');

/**
 * Authenticates a user and provides a cookie proving authentication
 */
router.get('/', validatingLogin, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const error = prettyValidation(result);
    return res.status(400).json(error);
  }

  let username = req.query.username;
  let password = req.query.password;

  let authenticated = null;
  try {
    authenticated = await dbservice.authenticateUser(username, password);
  } catch (err) {
    return res.status(500).json({message: 'There are no users with that username'});
  }
  if (!authenticated) {
    return res.status(401).json({
      message: 'Wrong username or password'
    });
  }

  let authenticatedUser = null;
  try {
    authenticatedUser = await dbservice.getBasicUserInfoByUsername(username);
  } catch (err) {
    return res.status(500).json({message: 'Database communcation error'});
  }
  const token = 'Bearer ' + jwt.sign({
    user: authenticatedUser.username,
    role: authenticatedUser.role
  }, config.SECRET, {
    expiresIn: '1h'
  });
  res.setHeader('Authorization', token);
  res.cookie('jwtToken', token, {
      expire: new Date() + 15
    })
    .status(200)
    .json({
      message: 'Successfully logged in!',
      role: authenticatedUser.role
    });
})

/**
 * TODO: If the token is decided to be a Authorization header instead, remove this.
 * Deletes the jwt token cookie
 */
router.delete('/', async (req, res) => {
  let token = req.cookies.jwtToken;
  if (token) {
    res.clearCookie('jwtToken')
    res.clearCookie('savedState')
  }
  res.status(200).json({
    message: 'Successfully logged out.'
  });
})

module.exports = router;