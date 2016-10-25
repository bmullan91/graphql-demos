const _ = require('lodash');
const uuid = require('uuid');
const faker = require('faker');

const fakeUsers = _.times(20, (index) => ({
  id: index + 1,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
})).reduce((usersMap, user) => {
  usersMap[user.id] = user;
  return usersMap
}, {});

module.exports = {
  users: fakeUsers
}
