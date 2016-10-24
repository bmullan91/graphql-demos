const _ = require('lodash');
const uuid = require('uuid');
const faker = require('faker');


// Difference between fixtures.js
// - only 4 users, with simple id's
// - all groups.members will have all the same users
// - all events.attendee will have all the same users

const fakeUsers = _.times(4, (index) => ({
  id: index + 1,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  groups: [],
  events: []
})).reduce((usersMap, user) => {
  usersMap[user.id] = user;
  return usersMap
}, {});

const fakeGroups = _.times(5, (index) => {
  const city = faker.address.city();

  return {
    id: uuid(),
    name: `${city}: ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
    location: city,
    members: Object.keys(fakeUsers),
    events: [] // added by fakeEvents
  }
}).reduce((groupsMap, user) => {
  groupsMap[user.id] = user;
  return groupsMap
}, {});

const fakeEvents = _.times(10, (index) => {
  const groupKey = Object.keys(fakeGroups)[Math.floor(index / 2)];
  const group = fakeGroups[groupKey];
  const attendeeKeys = Object.keys(fakeUsers);
  const eventId = uuid();

  // mutate the group, updating the events array
  group.events = [...group.events, eventId];
  // mutate each of the two users adding this event group to there list group ids
  // and adding the eventId to there
  attendeeKeys.forEach(key => {
    fakeUsers[key].groups = _.uniq([...fakeUsers[key].groups, groupKey]);
    fakeUsers[key].events = [...fakeUsers[key].events, eventId];
  });

  return {
    id: eventId,
    groupId: group.id,
    // each group will have 2 events, one past and one future
    date: (index % 2) === 0 ? faker.date.past() : faker.date.future(),
    location: `${group.location}: ${faker.company.companyName()}`,
    title: faker.company.catchPhrase(),
    description: faker.hacker.phrase(),
    // 2 users per event
    attendees: attendeeKeys
  };
}).reduce((eventsMap, user) => {
  eventsMap[user.id] = user;
  return eventsMap
}, {});


module.exports = {
  users: fakeUsers,
  groups: fakeGroups,
  events: fakeEvents
}
