import {
    DocumentNode,
    QueryLazyOptions,
    useLazyQuery
} from "@apollo/react-hooks";
import { useEffect } from "react";
import useAuth from "./useAuth";

/* for executing queries when:
once someone becomes authenticated, 
or when the components loads and they were already authenticated
*/
export default function useAuthQuery(
    query: DocumentNode,
    options?: QueryLazyOptions<Record<string, any>> | undefined
) {
    const { isAuthenticated } = useAuth();
    const [lazyQuery, queryState] = useLazyQuery(query, options);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("triggering query");
            lazyQuery(options);
        }
    }, [isAuthenticated]);

    return queryState;
}
