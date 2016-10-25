# GraphQL 'hello world' Demo

## Goals

__1.__ The following query:
```
curl -XPOST localhost:8000/graphql \
 -H "Content-Type:application/graphql" \
 -d "query { hello }"
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
curl -XPOST localhost:8000/graphql \
 -H "Content-Type:application/graphql" \
 -d "query { hello(name: \"Brian\") }"
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
