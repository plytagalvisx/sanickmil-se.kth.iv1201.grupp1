const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();
const dbservice = require('../../integration/database-services.js');
const { validationResult } = require('express-validator/check');
const validatingLogin = require('../../validation/validateLogin');
const { prettyValidation } = require('../../helpers/formatValidationError');
const MyError = require('../../helpers/MyError')
const ERROR = require('../../helpers/errors')

/**
 * Authenticates a user and provides a cookie proving authentication
 */
router.get('/', validatingLogin, async (req, res) => {
  const result = validationResult(req); 
  
  if (!result.isEmpty()) {
    const validationError = prettyValidation(result);
    return res.status(400).json(validationError);
  }

  let username = req.query.username;
  let password = req.query.password;

  let authenticated = null;
  try {
    authenticated = await dbservice.authenticateUser(username, password);
  } catch (err) {
    if (err.errorCode === ERROR.USER.NOT_FOUND)
      return res.status(400).json({message: 'There are no users with that username'});
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: 'Database error'});

    console.log('Unhandled error in GET /auth');
    return res.sendStatus(500);
  }
  if (!authenticated) {
    return res.status(401).json({
      message: 'Wrong username or password'
    });
  }

  try {
    const authenticatedUser = await dbservice.getBasicUserInfoByUsername(username);

    const token = await jwt.sign({
      user: authenticatedUser.username,
      role: authenticatedUser.role
    }, config.SECRET, {
      expiresIn: '24h'
    });

    return res.status(200).json({
      message: 'Successfully logged in',
      access_token: token,
      token_type: 'Bearer',
      username: authenticatedUser.username,
      role: authenticatedUser.role
    });
  } catch (err) {
    if (err.errorCode === ERROR.DB.ERROR) {
      return res.status(500).json({message: 'Database communcation error'});
    } else {
      return res.status(500).json({message: 'Token error'});
    }
  }
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
  return res.status(200).json({
    message: 'Successfully logged out.'
  });
})

module.exports = router;