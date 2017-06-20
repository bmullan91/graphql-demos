# GraphQL 'hello world' Demo using SDL

**SDL** (Schema Definition Language) is [soon to be added to the official GraphQL Spec](https://github.com/facebook/graphql/pull/90). The community has been using this for a while under the name `IDL` (Interface Definition Language) to concisely describe a GraphQL Schema.

## Goals

Based on the `hello-world` example, let's now write the Schema using the `SDL`. Our previous two queries should still work:


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
