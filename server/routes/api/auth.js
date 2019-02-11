const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const router = express.Router();

//TODO: Duplicate code, refactor
async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
  return client.db('sanickmil-recruitment').collection('users');
}

/**
 * Authenticates a user and provides a cookie proving authentication
 */
router.get('/', async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  if (username && password) {
    const users = await loadUsersCollection();
    const user = await users.findOne({
      username
    })
    if (user !== null) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          let token = 'Bearer ' + jwt.sign({
            username
          }, config.SECRET, {
            expiresIn: '1h'
          })
          res.cookie('jwtToken', token, {
              expire: new Date() + 15
            })
            .status(200).json({
              message: 'Successfully authenticated'
            })
        } else {
          res.status(401).json({
            message: 'Incorrect username or password'
          })
        }
      });
    } else {
      res.status(401).json({
        message: 'Account doesn\'t exist'
      })
    }
  } else {
    res.status(400).json({
      message: 'Authentication failed, please make sure both fields are filled in.'
    })
  }
})

router.delete('/', async (req, res) => {
  let token = req.cookies.jwtToken;

  if (token) {
    res.clearCookie('jwtToken')
    res.clearCookie('savedState')
    return res.statusCode(200).json({
      message: 'Successfully logged out.'
    })
  } else {
    return res.statusCode(403).json({
      message: 'You must be logged in to log out.'
    })
  }
})

module.exports = router;