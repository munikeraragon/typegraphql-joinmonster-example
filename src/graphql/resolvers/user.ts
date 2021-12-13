import {
    Query,
    Resolver,
    FieldResolver,
    Arg,
    Root,
    createParamDecorator,
    Extensions,
    Int,
    ObjectType,
    Field,
    InterfaceType,
    ResolverInterface
} from 'type-graphql';
import knex from 'knex';
import path from 'path';
import joinMonster from 'join-monster';
import { User } from '../entities/User';

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '../../../demo-data.sl3')
    }
});

@InterfaceType()
class Test {
    @Field() firstName: string;
    @Field() lastName: string;
    @Field() fullName: string;
}

function JoinMonsterSql() {
    return createParamDecorator<any>(async ({ info, context }) => {
        return joinMonster(
            info,
            context,
            (sql: string) => {
                console.log(sql);
                return conn.raw(sql);
            },
            { dialect: 'sqlite3' }
        );
    });
}

@Resolver()
export class UserResolver {
    @Extensions({
        joinMonster: {
            where: (table: any, args: any) => {
                return `${table}.id = ${args.id}`;
            }
        }
    })
    @Query((returns) => User)
    async user(@Arg('id', (type) => Int) id: number, @JoinMonsterSql() user: User): Promise<User> {
        return user;
    }
}
