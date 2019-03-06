const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();
const dbservice = require('../../integration/database-services.js');
const { validationResult } = require('express-validator/check');
const validatingLogin = require('../../validation/validateLogin');
const { prettyValidation } = require('../../helpers/formatValidationError');
const { ERROR, SUCCESS } = require('../../../common/messageEnums')
const MyError = require('../../helpers/MyError')
const Logger = require('../../helpers/logger');

const authLogger = new Logger(`${__dirname}/../../../userActions`);
/**
 * GET: Authenticates a user and provides a token proving authentication
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
    if (!(err instanceof MyError)) {
      authLogger.chaos(`Unhandled error in GET /auth when ${username} tried to log in`, err);
      return res.sendStatus(500);
    }
    if (err.errorCode === ERROR.USER.NOT_FOUND)
      return res.status(400).json({message: err.errorCode});
    else if (err.errorCode === ERROR.DB.ERROR)
      return res.status(500).json({message: err.errorCode});
  }
  if (!authenticated) {
    authLogger.warn(`${username} tried to log in but enterd wrong credentials`);
    return res.status(401).json({
      message: ERROR.AUTH.WRONG_CREDENTIALS
    });
  }

  try {
    const authenticatedUser = await dbservice.getBasicUserInfo(username);

    const token = await jwt.sign({
      user: authenticatedUser.username,
      role: authenticatedUser.role
    }, config.SECRET, {
      expiresIn: '24h'
    });
    authLogger.log(`${username} has logged in`);
    return res.status(200).json({
      message: SUCCESS.AUTH.SUCCESS,
      access_token: token,
      token_type: 'Bearer',
      username: authenticatedUser.username,
      role: authenticatedUser.role
    });
  } catch (err) {
    if (!(err instanceof MyError)) {
      authLogger.chaos('Unhandeled error in GET /auth #2');
      return res.status(500);
    }
    if (err.errorCode === ERROR.DB.ERROR) {
      return res.status(500).json({message: err.errorCode});
    }
  }
})

module.exports = router;