const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

// TODO
// ----
// Assign RootQuery to be an instance of GraphQLObjectType with the following keys:
// name: String - the name of the type
// description: [String] - describe the type
// fields: Object - all possible query entery points
// > fields.hello: Object - hello query
//   > hello.type: GraphQLString - return type of the hello query
//   > hello.args: [Object] - Arguments the hello query can accept
//     > args.name: Object - object describing the `name` argument
//       > name.type: GraphQLString - the Type the argument must be
//       > name.defaultValue: [String] - when no argument is passed
//   > hello.resolve: Function - resolves the hello query
const RootQuery;

module.exports = new GraphQLSchema({
  query: RootQuery
});
