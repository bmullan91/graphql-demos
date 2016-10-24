# GraphQL 'meetup-app' Demo

## Goals

1. query events and and events.group and events.attendees
2. query user.events
3. query group.events
4. recursive queries
5. dataLoaders

## Challenges

Go to `./schema.js` and complete it's TODO's.

### Notes

- start the server via `node index.js`
- the 'database' is not persistent across re-starts, it will re-generate the fixtures each time. 

## Bonus round - dataLoaders

__1.__ Add the following log line into Table.read in `db.js`

```js
console.log(`${this.name} table read called: id -> ${args.id}`);
```

__2.__ Use dataLoaderFixtures when creating each table in `db.js`.

__3.__ Try out the following query and check the logs:
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

## Challenges

1. Create a new `userLoader`, which is a instance of DataLoader
2. Replace all calls to db.Users.read({ id }) with userLoader calls
3. Repeat #3 and re-check the logs
