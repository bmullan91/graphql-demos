const { buildSchema } = require('graphql');

// TODO
// -----
// 1. Create the 'Query' type which is our RootQuery
//    It should have a field called 'hello', which return type is 'String'
//    > 'hello' accepts an argument called 'name' of type 'String'
//    Update the `schema` below, replacing all the <things> with the expected values


const schema = buildSchema(`
  type <name> {
    <field-name>(<arg-name>: <arg-return-type>): <field-return-type>
  }
`);

// TODO
// -----
// 2. Create the 'rootValue' type which describes how to resolve types defined in our schema
//    It should be an object, that contains the key `hello` and the value is it's resolver fn
//    The resolver fn's first argument will be an object containing the args to the field
//      > Pick our the `name` argument
//    > Return `hello world ${name}!`

const rootValue = {
  hello: ({ name = '' }) => `hello world ${name}!`
};

module.exports = {
  schema,
  rootValue
};
