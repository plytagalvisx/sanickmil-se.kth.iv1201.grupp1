const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hejhej')
})

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});