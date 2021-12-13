import { Field, Int, ObjectType, Extensions } from 'type-graphql';

@Extensions({
    joinMonster: {
        sqlTable: 'comments',
        uniqueKey: 'id'
    }
})
@ObjectType()
export class Comment {
    @Field((type) => Int, { nullable: true })
    id!: number;

    @Field({ nullable: true })
    body!: string;

    @Extensions({
        joinMonster: {
            sqlColumn: 'post_id'
        }
    })
    @Field((type) => Int)
    postId: number;

    @Extensions({
        joinMonster: {
            sqlColumn: 'author_id'
        }
    })
    @Field((type) => Int)
    authorId: number;

    @Field()
    archived: boolean;
}

@Extensions({
    joinMonster: {
        sqlTable: 'posts',
        uniqueKey: 'id'
    }
})
@ObjectType()
export class Post {
    @Field((type) => Int, { nullable: true })
    id!: number;

    @Field({ nullable: true })
    body!: string;

    @Extensions({
        joinMonster: {
            sqlColumn: 'author_id'
        }
    })
    @Field((type) => Int)
    authorId: number;

    @Extensions({
        joinMonster: {
            // count with a correlated subquery
            sqlExpr: (table: any) =>
                `(SELECT count(*) FROM comments where ${table}.id = comments.post_id)`
        }
    })
    @Field((type) => Int)
    numComments: number;

    @Extensions({
        joinMonster: {
            sqlBatch: {
                thisKey: 'post_id',
                parentKey: 'id'
            }
        }
    })
    @Field((type) => [Comment])
    comments: Comment[];
}

@Extensions({
    joinMonster: {
        sqlTable: 'accounts',
        uniqueKey: 'id'
    }
})
@ObjectType()
export class User {
    @Field((type) => Int, { nullable: true })
    id!: number;

    @Extensions({
        joinMonster: {
            sqlColumn: 'email_address'
        }
    })
    @Field({ nullable: true })
    email!: string;

    @Field({ nullable: true })
    first_name!: string;

    @Field({ nullable: true })
    last_name!: string;

    @Extensions({
        joinMonster: {
            sqlJoin: (userTable: any, postTable: any) => `${userTable}.id = ${postTable}.author_id`
        }
    })
    @Field((type) => [Post])
    posts: Post[];
}
