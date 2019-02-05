const express = require('express');
const mongodb = require('mongodb');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {

  let token = req.cookies.jwtToken;
  let qualifications = req.body.qualifications
  let availability = req.body.availability
  let oldState = req.cookies.savedState

  //TODO: Also move secret to environment vars.
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '')
    }
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'You have to have a valid token, try to log in again.'
        })
      } else {
        let username = decoded.username;
        let result = {
          ...oldState,
          ...{
            username,
            qualifications,
            availability
          }
        }
        res.cookie('savedState', result, {
            expire: new Date() + 15
          })
          .status(200)
          .json({
            message: 'Successfully saved state',
          })
      }
    });
  } else {
    return res.status(401).json({
      message: 'You have to be logged in'
    })
  }
});

async function loadApplicationCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
  return client.db('sanickmil-recruitment').collection('application');
}

module.exports = router;