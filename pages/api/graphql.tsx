import { ApolloServer } from "apollo-server-micro";
import { augmentedSchema } from "../../apollo/schema";
import * as neo4j from "neo4j-driver";
import console from "console";

// Create a configured neo4j driver instance (this doesn't start a session)
export const driver = (
    neo4jURI = process.env.NEO4J_URI,
    neo4jUser = process.env.NEO4J_USER,
    neo4jPassword = process.env.NEO4J_PASSWORD,
    neo4jEncryptedConnection = process.env.NEO4J_ENCRYPTED
) => {
    const isEncrypted =
        neo4jEncryptedConnection === "true"
            ? "ENCRYPTION_ON"
            : "ENCRYPTION_OFF";
    return neo4j.driver(neo4jURI, neo4j.auth.basic(neo4jUser, neo4jPassword), {
        encrypted: isEncrypted
    });
};

export const neo4jDriverInstance = driver();

export const apolloServer = new ApolloServer({
    schema: augmentedSchema.schema,
    context: ({ req }) => ({ req, driver: neo4jDriverInstance }),
    // Disable GraphIQL in production by setting these to false
    introspection: process.env.DEV == "true",
    playground: process.env.DEV == "true"
});

// We need to disable the bodyParser so we can consume our API endpoint as a stream
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
