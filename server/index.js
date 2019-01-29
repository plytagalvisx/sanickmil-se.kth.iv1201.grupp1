const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config')

const app = express();
const port = config.PORT;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hejhej');
});

app.listen(port, () => {
  console.log(`Server started on ${config.URL}`)
});