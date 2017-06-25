const md5 = require('md5');


// NOTE
// ----
// we're using makeExecutableSchema instead of `buildSchema`
// this supports a more flexible way to define resolvers
const { makeExecutableSchema } = require('graphql-tools');

const db = require('./db');

const typeDefs = `
  type User {
    id: ID!
    email: String
    firstName: String
    lastName: String
    profilePic(size: Int!): GravatarPic
  }

  type GravatarPic {
    url: String
  }

  type Query {
    user(id: String!): User
    users(limit: Int): [User]
  }

  type Mutation {
    user_create(email: String!, firstName: String!, lastName: String!): User
  }
`;

const resolvers = {
  Query: {
    user: (root, { id }) => db.Users.read({ id }),
    users: (root, { limit = 20 }) => db.Users.read({ limit }),
  },
  Mutation: {
    user_create: (root, args) => db.Users.create(args)
  },
  User: {
    // NOTE
    // ----
    // This is a derived field, it's not actually on the user model
    // but like any field - it's just a function
    // we can add abriatary in our resolve function
    profilePic: (user, { size }) => ({
      url: `https://www.gravatar.com/avatar/${md5(user.email)}?s=${size}`
    })
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
