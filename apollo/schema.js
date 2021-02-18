import { makeAugmentedSchema, assertSchema } from "neo4j-graphql-js";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

export const getAugmentedSchema = (driver) => {
    const excludeFromBoth = ["AuthToken", "GetUserResult", "Ok"];
    //schema is comprised of
    //1. the type definitions (type-defs.ts)
    //2. the resolvers (resolves.ts)
    const schema = makeAugmentedSchema({
        typeDefs,
        resolvers,
        config: {
            experimental: true,
            //Tell Neo4j not to create queries/mutations for the following types
            query: {
                exclude: [...excludeFromBoth]
            },
            mutation: {
                exclude: [...excludeFromBoth]
            }
        }
    });
    //this applies constaints such as uniquness
    assertSchema({ schema, driver, debug: true });
    return schema;
};
