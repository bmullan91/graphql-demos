const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello(name: String): String
  }
`);

const rootValue = {
  hello: ({ name = '' }) => `hello world ${name}!`
};

module.exports = {
  schema,
  rootValue
};
