// TODO
// -----
// 1. add 'user' to the RootQuery fields: type, args, resolve method
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
  GraphQLString
} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: '..',
  fields: {
    // TODO
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
