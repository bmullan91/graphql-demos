// TODO
// -----
// 1. add 'user' to the RootQuery fields: type, args, resolve method.. GraphQLNonNull on id
// 2. create the UserType: instance of GraphQLObjectType - name description, fields
// 3. add basic scalar values: id, firstName, lastName, email
// 4. add 'users' to the RootQuery: type, resolve method
// 5. verify users query works
// 6. verify user query works against user id: copy one from the prev users query
// 7. query for two separate users renaming them using aliases
// 8. add the 'user_create' mutation
// 9. profilePic field on UserType - new type GravatarPicType, url field.. resolve on user.
// 10. Demo Operation Name getUser($id: String!)...

// Notes:
// ------
// - Gravatar url `https://www.gravatar.com/avatar/${md5(userRecord.email)}?s=${args.size}`

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const md5 = require('md5');
const db = require('./db');

const GravatarPicType = new GraphQLObjectType({
  name: 'GravatarPicType',
  description: '..',
  fields: {
    url: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'user object',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    profilePic: {
      type: GravatarPicType ,
      args: {
        size: {
          type: GraphQLInt,
          defaultValue: 20
        }
      },
      resolve: (userRecord, args, ctx) => ({
        url: `https://www.gravatar.com/avatar/${md5(userRecord.email)}?s=${args.size}`
      })
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: '..',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, { id }, ctx) => db.Users.read({ id })
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (obj, args, ctx) => db.Users.read(args)
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'All mutation actions',
  fields: {
    user_create: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve: (obj, args, ctx) => db.Users.create(args)
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
