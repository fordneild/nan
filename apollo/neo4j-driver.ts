import * as neo4j from "neo4j-driver";

// Create a configured neo4j driver instance (this doesn't start a session)
export const driver = (
    neo4jURI = process.env.NEO4J_URI || "bolt://localhost:7687",
    neo4jUser = process.env.NEO4J_USER || "neo4j",
    neo4jPassword = process.env.NEO4J_PASSWORD || "letmein",
    neo4jEncryptedConnection = process.env.NEO4J_ENCRYPTED || "false"
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
