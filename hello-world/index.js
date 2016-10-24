const express = require('express');
const expressGraphql = require('express-graphql');
const app = express();

// TODO
// -----
// 1. verify homepage route works
// 2. include the expressGraphql middleware, passing it the schema object
// 3. create the schema.js file and require it

app.get('/', (req, res) => res.end('homepage'));

app.listen(8000, (err) => {
  if(err) {
    throw new Error(err);
  }

  console.log('*** server started ***');
});
