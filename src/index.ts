import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import buildSchema from './graphql';

export const server = async () => {
    const port = process.env.PORT || 7000;
    const app = express();
    const schema = await buildSchema();

    const server = new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () =>
        console.log(`Now browse to http://localhost:${port}` + server.graphqlPath)
    );
};

server();
