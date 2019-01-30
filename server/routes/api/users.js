const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Get users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

//Add users
router.post('/', async (req, res) => {
    const users = await loadUsersCollection();
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        users.insertOne({
            username: req.body.username,
            password: hash
        });
      });
    res.status(201).send();
});

router.get('/login', async (req, res) => {

    let token = req.cookies.jwtToken;

    //TODO: Also move hemlighet to environment vars.
    if(token){
        if (token.startsWith('Bearer ')){
            token = token.replace('Bearer ', '')
        }
        jwt.verify(token, 'hemlighet', (err, decoded) =>{
            if(err){
                console.log(err.message)
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            }else{
                this.decoded = decoded
                return res.json({
                    success: true,
                    message: 'Token is valid',
                    decoded: decoded
                })
            }
        });
    }else{
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
})

router.post('/login', async (req, res) => {
    if(req.body.username && req.body.password){
        const users = await loadUsersCollection();
        const user = await users.findOne({username: req.body.username})
        if(user !== null){
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result === true) {
                //TODO: mySecret must be in environment variable, cuz securityz.
                //Things to store in token: Username, real name, role
                let token = 'Bearer ' + jwt.sign({username: req.body.username}, 'hemlighet', {expiresIn: '1h'})
                res.cookie('jwtToken', token, {expire : new Date() + 15}).json({
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
    }else{
        res.json({
            success: false,
            message: 'Account doesn\'t exist'
        })
    }
    }else{
        res.json({
            success: false,
            message: 'Authentication failed, please make sure both fields are filled in.'
        })
    }
});

router.get('/logout', async (req, res) => {
    let token = req.cookies.jwtToken;

    if(token){
        res.clearCookie('jwtToken')
        return res.json({
            success: true,
            message: 'Successfully logged out.'
        })
    }else{
        return res.json({
            success: false,
            message: 'You can\'t log out when you\'re not logged in.'
        })
    }
})

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://ockelberg:Bajsbajs11@ds054118.mlab.com:54118/vuetestdb', {
            useNewUrlParser: true
        });
        return client.db('vuetestdb').collection('users');
    }

module.exports = router;