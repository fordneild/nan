import { gql } from "apollo-server-micro";
// Describe our GraphQL schema with type definitions
export const typeDefs = `
    type User {
        userId: ID! @id
        email: String! @unique
    }

    type Query {
        hello: String!
        userCount: Int!
            @cypher(statement: "MATCH (u:User) RETURN COUNT(u) as userCount")
    }

    # type Mutation {
    #     addUser(id: ID!, email: String!): User!
    #         @cypher(
    #             statement: "CREATE (u:User {id: $id, email: $email}) RETURN u"
    #         )
    # }
`;

export const oldtypeDefs = `
  type Business {
    businessId: ID!
    name: String!
    address: String
    city: String
    state: String
    reviews: [Review] @relationship(type: "REVIEWS", direction: "IN")
    categories: [Category] @relationship(type: "IN_CATEGORY", direction: "OUT")
  }

  type Category {
    name: ID!
    businesses: [Business] @relationship(type: "IN_CATEGORY", direction: "IN")
  }

  type RatingCount {
    stars: Float!
    count: Int!
  }

  type User {
    userId: ID!
    name: String
    reviews: [Review] @relationship(type: "WROTE", direction: "OUT")
  }

  type Review {
    reviewId: ID!
    stars: Float
    text: String
    date: Date
    business: Business @relationship(type: "REVIEWS", direction: "OUT")
    user: User @relationship(type: "WROTE", direction: "IN")
  }

  type Query {
    """
    A sample query to verify that our GraphQL server is online.

    It returns a friendly greeting with the current timestamp.
    """
    hello: String!,

    """
    A sample query to return the total number of users in our system
    """
    userCount: Int! @cypher(statement: "MATCH (u:User) RETURN COUNT(u)")

    """
    A sample query to return the total number of stars awarded in reviews for our system
    """
    ratingsCount: [RatingCount]
    @cypher(
      statement: "MATCH (r:Review) WITH r.stars AS stars, COUNT(*) AS count ORDER BY stars RETURN {stars: stars, count: count}"
    )
  }
`;
