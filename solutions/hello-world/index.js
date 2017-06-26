const express = require('express');
const expressGraphql = require('express-graphql');

const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphql({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.end('homepage'));

app.listen(8000, (err) => {
  if(err) {
    throw new Error(err);
  }

  console.log('*** server started ***');
});
