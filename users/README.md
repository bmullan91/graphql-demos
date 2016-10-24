# GraphQL 'users' Demo

Most applications have users, right?

## Goals

1. query a user by id, and get their id, email, firstName and lastName
2. query a list of users
3. limit the users query
4. create a new user via `user_create` mutation

## prerequisites

1. I've created a fake database, with basic crud operations that return promises: see `db.js`
2. I've created fake user data: see `fixtures.js`
3. `/graphiql` route added to middleware
