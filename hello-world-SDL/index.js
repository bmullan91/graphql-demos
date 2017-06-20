const express = require('express');
const expressGraphql = require('express-graphql');

// TODO
// -----
// 1. Update schema.js to export schema & rootValue

const { schema, rootValue } = require('./schema');

const app = express();

app.use('/graphql', expressGraphql({
  schema,
  rootValue,
  graphiql: true
}));

app.get('/', (req, res) => res.end('homepage'));

app.listen(8000, (err) => {
  if(err) {
    throw new Error(err);
  }

  console.log('*** server started ***');
});
