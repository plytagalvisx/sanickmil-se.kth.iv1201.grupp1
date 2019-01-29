const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hejhej')
})

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});