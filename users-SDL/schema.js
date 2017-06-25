const md5 = require('md5');
const db = require('./db');

// NOTE
// ----
// we're using makeExecutableSchema instead of `buildSchema`
// this supports a more flexible way to define resolvers
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type User {
    id: ID!
    email: String
    firstName: String
    lastName: String
    # TODO: 1
    # define a new field: profilePic
    # it expects a required argument 'size' of type Int
    # its return type is GravatarPic
  }

  # TODO: 2
  # define a new type 'GravatarPic'
  # it has a 'url' field of type String

  type Query {
    user(id: String!): User
    users(limit: Int): [User]
  }

  # TODO: 4
  # Define a new type 'Mutation'
  # add a field 'user_create'
  # it should take the following arguments: email, firstName & lastName
  # it's return type is User
  # next: update the resolvers below to include Mutation.user_create
`;

const resolvers = {
  Query: {
    user: (root, { id }) => db.Users.read({ id }),
    users: (root, { limit = 20 }) => db.Users.read({ limit }),
  },
  User: {
    // TODO: 3
    // ----
    // Add the profilePic resolver here
    // This is a derived field, it's not actually on the user model
    // but like any field - it's just a function
    // we can add abriatary code in it's resolve function
    // gravatar.com images are identified by the users email, hashed by md5
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
