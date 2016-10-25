const express = require('express');
const expressGraphql = require('express-graphql');
const app = express();

// TODO
// -----
// 1. include the expressGraphql middleware, passing it an object with the schema as a key/value
// 2. create the schema.js

const schema = require('./schema');

app.use('/graphql', /* #1 */);

app.get('/', (req, res) => res.end('homepage'));

app.listen(8000, (err) => {
  if(err) {
    throw new Error(err);
  }

  console.log('*** server started ***');
});
