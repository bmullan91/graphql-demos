# GraphQL 'users' Demo Using SDL

Most applications have users, right?

## Goals

1. query a user by id, and get their id, email, firstName and lastName
2. query a list of users
3. limit the users query
4. create a new user via `user_create` mutation

## prerequisites

1. I've created a fake database, with basic crud operations that return promises: see `db.js`
2. I've created fake user data: see `fixtures.js`

## Challenges

Go to `./schema.js` and complete it's TODO's.

### Notes

- start the server via `node index.js`
- the 'database' is not persistent across re-starts, it will re-generate the fixtures each time.

## Extra

__aliases__

Try out the following query

```
query {
  user1: user(id: "1") {
    firstName
  }
  user2: user(id: "2") {
    firstName
  }
}
```

__fragments__

A basic composition primitive within graph.

```
fragment UserFragment on UserType {
  firstName
  lastName
  email
}

query {
  user1: user(id: "1") {
    ...UserFragment
  }
  user2: user(id: "2") {
    ...UserFragment
  }
}
```

__query operation name + variables__

This avoids manual string interpolation to construct queries

```
query FetchUser($id: String!) {
  user(id: $id) {
    firstName
    lastName
    email
  }
}

// in the variables section:
{
  "id": "1"
}
```

__directives__

`<field-name> @include(if: Boolean) { sub selection }`

example:

```
query FetchUser($id: String!, $includeEmail: Boolean!) {
  user(id: $id) {
    firstName
    lastName
    email @include(if: $includeEmail)
  }
}
```

__enumeration types__

Example:

```
const SexEnumType = new GraphQLEnumType({
  name: 'SexEnumType',
  description: '...',
  values: {
    MALE: { value: 'male' },
    FEMALE: { value: 'female' },
    OTHER: { value: 'other' }
  }
});
```

Note: this isn't wired up in the fixtures / user query / user mutation

__more....__

Check out http://graphql-swapi.parseapp.com/
