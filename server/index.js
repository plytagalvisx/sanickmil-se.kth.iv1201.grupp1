const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/application', application);
app.use('/api/skills', skills);

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  // Used for being able to transfer the SQLDB to MongoDB
  app.use('/dev/dbtransfer', require('./routes/dev/dbtransfer'));
}


app.listen(port, () => {
  console.log(`Server started on ${config.URL}`)
});

