const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: '..',
  fields: {
    hello: {
      type: GraphQLString,
      args: {
        name: {
          type: GraphQLString,
          defaultValue: ''
        }
      },
      resolve: (obj, args) => `hello world ${args.name}!`
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
