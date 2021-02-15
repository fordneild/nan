import { ApolloCache, DocumentNode } from "@apollo/react-hooks";

export function addItemToCache(
    cache: ApolloCache<any>,
    QUERY: DocumentNode,
    dataField: string,
    newItem: any
) {
    // get exisiting tems
    const existingItems =
        cache.readQuery<any>({
            query: QUERY
        })[dataField] || [];
    //write back those items and our new one to the cache
    cache.writeQuery({
        query: QUERY,
        data: {
            [dataField]: [...existingItems, newItem]
        }
    });
}
export function updateNumberInCache(
    cache: ApolloCache<any>,
    QUERY: DocumentNode,
    dataField: string,
    delta?: number,
    value?: number,
    defaultValue = 0
) {
    // if absolute value not passed in, use delta and cached value to compute newVal
    const newVal =
        typeof value === "undefined"
            ? (cache.readQuery<any>({
                  query: QUERY
              })[dataField] || defaultValue) + delta
            : value;
    //write back new value to query
    cache.writeQuery({
        query: QUERY,
        data: {
            [dataField]: newVal
        }
    });
}
