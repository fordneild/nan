import { ApolloServer } from "apollo-server-micro";
import { getAugmentedSchema } from "../../apollo/schema";
import { neo4jDriverInstance } from "../../apollo/neo4j-driver";

export const apolloServer = new ApolloServer({
    // schema: augmentedSchema.schema,
    schema: getAugmentedSchema(neo4jDriverInstance),
    context: ({ req }) => ({ req, driver: neo4jDriverInstance }),
    // Disable GraphIQL in production by setting these to false
    introspection: process.env.DEV === "true",
    playground: process.env.DEV === "true"
});

// We need to disable the bodyParser so we can consume our API endpoint as a stream
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
