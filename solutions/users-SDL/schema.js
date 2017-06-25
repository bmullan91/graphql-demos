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
    profilePic: (user, { size }) => ({
      url: `https://www.gravatar.com/avatar/${md5(user.email)}?s=${size}`
    })
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
