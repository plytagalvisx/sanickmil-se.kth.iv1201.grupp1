const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

try {
  require('dotenv').config();
} catch (err){}
const config = require('./config')

const app = express();
const port = config.PORT;

//Middleware
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const user = require('./routes/api/user');
const application = require('./routes/api/application');
const skills = require('./routes/api/skills');
const auth = require('./routes/api/auth');
const guard =  require('./helpers/guard');


/* Authenticates each */
app.use(/\/api\/.{1,}/, guard);

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/application', application);
app.use('/api/skills', skills);

//Handle production
if(process.env.NODE_ENV === 'production'){
  console.log('Setting up for production enviroment...')
  //Static folder
  app.use(express.static(__dirname + '/public/'));
  
  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  console.log('Setting up for DEVelopment enviroment...')
  // Used for being able to transfer the SQLDB to MongoDB
  app.use('/dev/dbtransfer', require('./routes/dev/dbtransfer'));
}


app.listen(port, () => {
  console.log(`Server started on ${config.URL}`)
});

