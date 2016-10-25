const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const db = require('./db');

// TODO #1
// -------
// Assign UserType to be an instance of GraphQLObjectType with the following keys:
// name: String - UserType
// description: [String] - describe the type
// fields: Object - user fields (id, email, firstName, lastName) : GraphQLString
const UserType;

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: '..',
  fields: {
    user: {
      type: UserType,
      // id: GraphQLString!
      args: {},
      // call db.Users.read passing the id argument
      resolve: (rootObj, args, ctx) => {}
    }
  }
});


// TODO #2
// -------
// A 'mutation' in graphql has the _exact_ same format as a query!
// Queries should be idempotent - where as mutation is a place where
// we list a the possible muatation _actions_ ... similar to flux actions
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'mutation actions',
  fields: {
    // TODO user_create: {type, args, resolve}
  }
});

// NOTE
// ----
// We've included the RootMutation into the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
