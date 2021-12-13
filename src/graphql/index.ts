import { buildSchema } from 'type-graphql';
import path from 'path';
import resolvers from './resolvers';

export default () =>
    buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    });
