import { makeAugmentedSchema, assertSchema } from "neo4j-graphql-js";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

export const getAugmentedSchema = (driver) => {
    const schema = makeAugmentedSchema({
        typeDefs,
        config: {
            experimental: true
        },
        resolvers
    });
    assertSchema({ schema, driver, debug: true });
    return schema;
};
