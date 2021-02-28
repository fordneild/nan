import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { GET_FEED } from "../../queries";
import FeedContent from "./FeedContent";
import QueryResult from "../../hoc/QueryResult";
import styles from "./Feed.module.scss";
export default function Feed() {
    const { error, loading, data } = useQuery(GET_FEED);
    return (
        <QueryResult error={error} loading={loading}>
            <ul className={styles.feed}>
                {data?.getFeed.map((content: any, index: number) => {
                    return (
                        <li key={index}>
                            <FeedContent content={content} />
                        </li>
                    );
                })}
            </ul>
        </QueryResult>
    );
}
