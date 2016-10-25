// NOTE
// ----
// This also includes a user derived property `profilePic`

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

// TODO #1
// -------
// Assign UserType to be an instance of GraphQLObjectType with the following keys:
// name: String - UserType
// description: [String] - describe the type
// fields: Object - user fields (id, email, firstName, lastName) : GraphQLString
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

// TODO #2
// -------
// A 'mutation' in graphql has the _exact_ same format as a query!
// Queries should be idempotent - where as mutation is a place where
// we list a the possible muatation _actions_ ... similar to flux actions
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

// NOTE
// ----
// We've included the RootMutation into the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
