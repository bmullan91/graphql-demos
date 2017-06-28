const md5 = require('md5');
const db = require('./db');

// NOTE
// ----
// we're using makeExecutableSchema instead of `buildSchema`
// this supports a more flexible way to define resolvers
const { makeExecutableSchema } = require('graphql-tools');


// TODO: Type Definitions
// ----
// 1. Define the 'Query' type
//  - find a user by id
//  - get a list of users, and limit it
// 2. Define the 'User' type
//  - id, firstName, lastName, email, profilePic -> GravatarPic
// 3. Define the 'GravatarPic' type
//  - url field
// 4. Define the 'Mutation' type
//  - user_create, firstName, lastName, email -> User
const typeDefs = `
  # TODO!
`;


// TODO: Resolvers
// 1. Query.user(id) -> User
// 2. Query.users(limit) -> [User]
// 2. User.profilePic...
// This is a derived field, it's not actually on the user model
// but like any field - it's just a function
// we can add abriatary code in it's resolve function
// gravatar.com images are identified by the users email, hashed by md5
// https://www.gravatar.com/avatar/${md5(user.email)}?s=${size}
// remember its an object we're expecting with a url prop
// 4. Mutation.user_create(fn, ln, email) -> User
const resolvers = {
  // TODO!
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
