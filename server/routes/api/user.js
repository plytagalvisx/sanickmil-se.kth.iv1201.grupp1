const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

router.get('/auth', async (req, res) => {
  console.log('Auth called');
  let token = req.cookies.jwtToken;
  //TODO: Also move hemlighet to environment vars.
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '')
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
})

router.post('/', async (req, res) => {
  console.log('LOGIN CALLED');
  if (req.body.username && req.body.password) {
    const users = await loadUsersCollection();
    const user = await users.findOne({
      username: req.body.username
    })
    if (user !== null) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result === true) {
          //TODO: mySecret must be in environment variable, cuz securityz.
          //Things to store in token: Username, real name, role
          let token = 'Bearer ' + jwt.sign({
            username: req.body.username
          }, config.SECRET, {
            expiresIn: '1h'
          })
          res.cookie('jwtToken', token, {
              expire: new Date() + 15
            })
            .json({
              success: true,
              message: 'Successfully authenticated'
            })
        } else {
          res.json({
            success: false,
            message: 'Incorrect username or password'
          })
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Account doesn\'t exist'
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Authentication failed, please make sure both fields are filled in.'
    })
  }
});

router.get('/logout', async (req, res) => {
  let token = req.cookies.jwtToken;

  if (token) {
    res.clearCookie('jwtToken')
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

// //Get users
// router.get('/register', async (req, res) => {
//     const users = await loadUsersCollection();
//     res.send(await users.find({}).toArray());
// });

//Add user
router.post('/register', async (req, res) => {
  const users = await loadUsersCollection();
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      res.json({
        success: false,
        message: 'Something went wrong'
      })
    }
    users.insertOne({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birth: req.body.birth
    });
  });
  res.json({
    success: true,
    message: 'Account created'
  });
});
router.post('/apply', async (req, res) => {
  const users = await loadUsersCollection();

  let token = req.cookies.jwtToken;

  //TODO: Also move secret to environment vars.
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '')
    }
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'You have to have a valid token, try to log in again.'
        })
      } else {
        let username = decoded.username
        let user = users.find({
          username: username
        })
        users.updateOne({
          "username": username
        }, {
          $set: {
            "name": req.body.firstname,
            "surname": req.body.lastname,
            "email": req.body.email,
            "ssn": req.body.ssn,
            "qualifications": req.body.qualifications,
            "availability": req.body.availability,
            "applicationStatus": "unhandled",
            "role": "applicant",
          }
        })


        return res.json({
          success: true,
          message: 'Token is valid',
          decoded
        })
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'You have to be logged in'
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