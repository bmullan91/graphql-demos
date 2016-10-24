# GraphQL 'meetup-app' Demo

## Goals

1. query events and and events.group and events.attendees
2. query user.events
3. query group.events
4. Recursive queries
5. dataLoaders

## prerequisites

1. faked db, with basic crud operations that return promises: see db.js
2. fake user, group and event data with relationships: see fixtures.js


## to begin

Go to `./schema.js` and complete it's TODO's.

## bonus round - dataLoaders

1. Add the following log line into Table.read in `db.js`

```js
console.log(`${this.name} table read called: id -> ${args.id}`);
```

2. Use dataLoaderFixtures when creating each table in `db.js`.

3. Try out the following query and check the logs:
```
query {
  events {
    attendees {
      id
      firstName
    }
  }
}
```

4. Create a new `userLoader`, which is a instance of DataLoader
5. Replace all calls to db.Users.read({ id }) with userLoader calls
6. Repeat #3 and re-check the logs
