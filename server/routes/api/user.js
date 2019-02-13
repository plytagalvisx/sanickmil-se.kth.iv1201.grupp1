const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

const DUPL_USER = 11000;

/**
 * This is for ADDING users aka registry.
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
      birth: req.body.birth,
      role: 'applicant'
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
        res.status(201).json({
          message: 'Account created'
        });
      }
    });
  });
});

/**
 * Get a single user, TODO:
 */
router.get('/:username', async (req, res) => {
  res.json({user: req.params.username, status: 'NOT DONE, TODO!!!'});
});

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
  return client.db('sanickmil-recruitment').collection('users');
}

module.exports = router;