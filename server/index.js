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
app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//app.use('/dev/dbtransfer', require('./routes/dev/dbtransfer'))

app.listen(port, () => {
  console.log(`Server started on ${config.URL}`)
});

