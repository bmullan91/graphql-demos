// TODO
// ----
// 1. Define the EventType: new GraphQLObjectType with name, desc and the following scalar fields:
//  id, date, location, title, description : GraphQLString
// 2. Add the field 'group': GroupType and its resolve method
// 3. Add the field 'attendees': [UserType] and its resolve method
// 4. Add the field 'attendeeCount': Int
// 5. Add the events and event as query fields to the root QueryType
// 6. Verify both events and event(id: String) queries work in graphiql
// 7. Add the the 'events' field to UserType and GroupType
// 8. Verify both user.events and group.events queries
// 9. TODO dataLoaders?


const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql');

const md5 = require('md5');
const db = require('./db');

const GravatarPic = new GraphQLObjectType({
  name: 'GravatarPicType',
  description: '...',
  fields: () => ({
    url: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'user',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    groups: {
      type: new GraphQLList(GroupType),
      description: 'A list of groups the user is a member of',
      resolve: (userRecord) => {
        const promises = userRecord.groups.map(id => db.Groups.read({ id }));
        return Promise.all(promises);
      }
    },
    profilePic: {
      type: GravatarPic,
      args: {
        size: {
          type: GraphQLInt,
          defaultValue: 300
        }
      },
      resolve: (userRecord, { size }) => ({
        url: `https://www.gravatar.com/avatar/${md5(userRecord.email)}?s=${size}`
      })
    }
  })
});

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  description: 'Meetup group',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    memebersCount: {
      type: GraphQLInt,
      resolve: (groupRecord) => groupRecord.members.length
    },
    members: {
      type: new GraphQLList(UserType),
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 3
        }
      },
      resolve: (groupRecord) => {
        const promises = groupRecord.members.map(id => db.Users.read({ id }));
        return Promise.all(promises);
      }
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: '...',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, ctx) => db.Users.read(args)
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 3
        }
      },
      resolve: (obj, args, ctx) => db.Users.read(args)
    },
    group: {
      type: GroupType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (obj, args, ctx) => db.Groups.read(args)
    },
    groups: {
      type: new GraphQLList(GroupType),
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 3
        }
      },
      resolve: (obj, args, ctx) => db.Groups.read(args)
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'mutations as such',
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, ctx) => db.Users.create(args)
    }
  })

});

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

module.exports = Schema;
