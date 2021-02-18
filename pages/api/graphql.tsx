import { ApolloServer } from "apollo-server-micro";
import { getAugmentedSchema } from "../../apollo/schema";
import { neo4jDriverInstance } from "../../apollo/neo4j-driver";
import { verify } from "../../util/jwt";
import { parseRefreshToken } from "../../util/refreshToken";
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");

const isDev = process.env.DEV === "true";

export const apolloServer = new ApolloServer({
    schema: getAugmentedSchema(neo4jDriverInstance),
    plugins: [httpHeadersPlugin],
    context: ({ req }) => {
        //strip Bearer from the token
        const token = req?.headers?.authorization?.slice(7);
        //get refresh token from headers
        const refreshToken = parseRefreshToken(req);
        let userId;
        if (token) {
            const decoded = verify(token);
            // @ts-expect-error, we just decrpted it, no way it knows what properities it has on the object
            userId = decoded?.id;
        }
        return {
            cypherParams: { id: userId },
            driver: neo4jDriverInstance,
            setCookies: new Array(),
            setHeaders: new Array(),
            refreshToken
            //   neo4jDatabase: process.env.NEO4J_DATABASE,
        };
    },
    // Disable GraphIQL in production
    introspection: isDev,
    playground: isDev
});

// We need to disable the bodyParser so we can consume our API endpoint as a stream
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
