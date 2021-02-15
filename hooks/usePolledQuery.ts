import { DocumentNode, useQuery } from "@apollo/react-hooks";

const MILISECONDS_IN_SECOND = 1000;

//data more stable in dev, so we can afford to increase the poll interval
const DELAY_MULTIPLIER = process.env.DEV === "true" ? 10 : 1;

export default function usePolledQuery(
    query: DocumentNode,
    pollIntervalSeconds: number
) {
    const MIN_POLL_INTERVAL_SECONDS = 5;
    if (pollIntervalSeconds < MIN_POLL_INTERVAL_SECONDS) {
        throw new Error(
            `pollIntervalSeconds must be at least ${MIN_POLL_INTERVAL_SECONDS}`
        );
    }
    return useQuery(query, {
        pollInterval:
            MILISECONDS_IN_SECOND * pollIntervalSeconds * DELAY_MULTIPLIER
    });
}
