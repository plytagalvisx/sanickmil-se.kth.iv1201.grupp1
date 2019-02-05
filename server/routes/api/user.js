const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

const DUPL_USER = 11000;

/**
 * This is for ADDING users aka registtry.
 */
router.post('/', async (req, res) => {
  const users = await loadUsersCollection();
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      res.status(400).json({
        message: 'Something went wrong: ' + err
      })
    }
    users.insertOne({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birth: req.body.birth
    }, (err, docs) => {
      if (err) {
        if (err.code === DUPL_USER) {
          res.status(400).send({
            message: 'That user already exists.'
          })
        } else {
          res.status(400).send({
            message: err.errmsg
          });
        }
      } else {
        res.status(200).json({
          message: 'Account created'
        });
      }
    });
  });
});

/**
 * This is LOGIN, for "getting" a user of the info matches
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
});

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
  return client.db('sanickmil-recruitment').collection('users');
}

module.exports = router;