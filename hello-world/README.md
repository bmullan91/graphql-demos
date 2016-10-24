# GraphQL 'hello world' Demo

## Goals

__1.__ The following query:
```
curl -XPOST -H "Content-Type:application/graphql" -d "query { hello }" localhost:8000/graphql
```

should return:

```js
{
  "data": {
    "hello": "hello world !"
  }
}
```

__2.__ The query `hello` should accept a `name` parameter of type `GraphQLString` and respond with `hello world ${name}!`

```
curl -XPOST -H "Content-Type:application/graphql" -d "query { hello(name:\"Brian\") }" localhost:8000/graphql
```
Should return

```js
{
  "data": {
    "hello": "hello world Brian!"
  }
}
```

## Challenges

Go to `./index.js` and `./schema.js` and complete it's TODO's.

### Notes

- start the server via `node index.js`
