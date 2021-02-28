import { gql } from "apollo-server-micro";
// Describe our GraphQL schema with type definitions
export const typeDefs = gql`
    # MODELS
    type User {
        id: ID! @id
        email: String! @unique
        username: String! @unique
        password: String!
        createdAt: DateTime!
        history: [Interaction!] @relation(name: "HAD", direction: OUT)
    }
    #user HAD interactions
    #suggestions FOR user
    # suggestions: [Suggestion] @relation(name: "FOR", direction: IN)

    interface Interaction {
        id: ID! @id
        #user HAD interaction
        user: User! @relation(name: "HAD", direction: IN)
        at: DateTime!
        #interaction WITH content
        content: Content @relation(name: "WITH", direction: OUT)
        #interaction BECAUSE cause
        # cause: InteractionCause @relation(name: "BECUASE", direction: OUT)
    }

    interface Content {
        id: ID! @id
        #interaction WITH content
        interactions: [Interaction!] @relation(name: "WITH", direction: IN)
        #user CREATED content
        creator: User! @relation(name: "CREATED", direction: IN)
        createdAt: DateTime!
        #comment ON content
        comments: [Comment!] @relation(name: "ON", direction: IN)
    }

    type ContentForUser {
        content: Content!
        reactions: [Reaction!]
    }

    type Post implements Content {
        id: ID! @id
        #interaction WITH post
        interactions: [Interaction!] @relation(name: "WITH", direction: IN)
        #user CREATED post
        creator: User! @relation(name: "CREATED", direction: IN)
        createdAt: DateTime!
        #comments ON post
        comments: [Comment!] @relation(name: "ON", direction: IN)
        title: String!
        text: String!
    }

    type Comment implements Content {
        id: ID! @id
        interactions: [Interaction!] @relation(name: "WITH", direction: IN)
        creator: User! @relation(name: "CREATED", direction: IN)
        createdAt: DateTime!
        on: Content! @relation(name: "ON", direction: OUT)
        comments: [Comment!] @relation(name: "ON", direction: IN)
        text: String!
    }

    type Image implements Content {
        id: ID! @id
        interactions: [Interaction!] @relation(name: "WITH", direction: IN)
        creator: User! @relation(name: "CREATED", direction: IN)
        createdAt: DateTime!
        comments: [Comment!] @relation(name: "ON", direction: IN)
        caption: String!
        url: String!
    }

    type Reaction implements Interaction {
        id: ID! @id
        user: User! @relation(name: "HAD", direction: IN)
        at: DateTime!
        content: Content! @relation(name: "WITH", direction: OUT)
        emotions: Emotion
    }

    type View implements Interaction {
        id: ID! @id
        user: User! @relation(name: "HAD", direction: IN)
        at: DateTime!
        content: Content! @relation(name: "WITH", direction: OUT)
        until: DateTime!
    }

    # HELPER STRCUTURES

    type GetUserResult {
        email: String
        username: String
    }
    type Ok {
        ok: Boolean!
    }

    type AuthToken {
        token: String!
    }

    union FeedContent = Post | Image

    enum Emotion {
        LIKE
        DISLIKE
        LAUGH
        LOVE
    }

    #QUERIES
    type Query {
        userCount: Int!
            @cypher(statement: "MATCH (u:User) RETURN COUNT(u) as userCount")
        login(email: String!, password: String!): AuthToken
        loginWithRefreshToken: AuthToken
        logout: Ok
        getFeed: [ContentForUser]
            @cypher(
                statement: """
                MATCH (fc:FeedContent)-[:HAD]-(r:Reaction)-(u:User {id: $cypherParams.id})
                """
            )
        getUser: GetUserResult
            @cypher(
                statement: """
                MATCH (u:User {id: $cypherParams.id}) RETURN {
                    email: u.email,
                    username: u.username
                }
                """
            )
    }
    #MUTATIONS
    type Mutation {
        signUp(email: String!, password: String!): AuthToken
        react(contentId: ID!, emotion: Emotion): Reaction
            @cypher(
                statement: """
                MATCH (u:User {id:$cypherParams.id})
                MATCH (c:Content {id: $contentId})
                MERGE (u)-[:HAD]-(r:Interaction:Reaction {id: randomUUID(), at: datetime(), emotion: $emotion})-[:WITH]-(c)
                RETURN r
                """
            )
        createPost(title: String!, text: String!): Post
            @cypher(
                statement: """
                MATCH (u: User {id: $cypherParams.id})
                WITH u
                CREATE (p:Content:FeedContent:Post {id: randomUUID(), createdAt: datetime(), title: $title, text: $text})
                WITH u,p
                CREATE (u)-[:CREATED]->(p)
                RETURN p
                """
            )
    }
`;
