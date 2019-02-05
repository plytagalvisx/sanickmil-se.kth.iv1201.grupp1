const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();

/**
 * Authenticates a user and provides a cookie proving authentication
 */
router.get('/', async (req, res) => {
  try {
    let token = req.cookies.jwtToken;
  //TODO: Also move hemlighet to environment vars.
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401)
        .json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        return res.status(200)
        .json({
          success: true,
          message: 'Token is valid',
          decoded: decoded
        });
      }
    });
  } else {
    return res.status(400).
    json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
  } catch (err) {
    console.log('ERROR CAUGHT', err);
  }
})

router.delete('/', async (req, res) => {
  let token = req.cookies.jwtToken;

  if (token) {
    res.clearCookie('jwtToken')
    res.clearCookie('savedState')
    return res.json({
      success: true,
      message: 'Successfully logged out.'
    })
  } else {
    return res.json({
      success: false,
      message: 'You can\'t log out when you\'re not logged in.'
    })
  }
})

module.exports = router;