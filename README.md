# Typegraphql and JoinMonster example

This repository demonstrates how to integrate [JoinMonster](https://dev.to/) and [Typegraphql](https://typegraphql). The SQL schema and relationship metadata is embedded in Typegraphql Entities and Resolvers, which is used by JoinMonster to perform query planning between GraphQL and SQL.

Quick Start

1. Clone repository

```sh
git clone https://github.com/munikeraragon/typegraphql-joinmonster-example.git
```

2. Install dependecies

```sh
npm install
```

3. Start server

```sh
npm start
```

4. Go to http://localhost:7000/graphql and run the following GraphQL query:

```gql
{
    user(id: 4) {
        id
        first_name
        last_name
        email
        posts {
            id
            authorId
            body
            numComments
            comments {
                id
                body
                postId
                authorId
                archived
            }
        }
    }
}
```
