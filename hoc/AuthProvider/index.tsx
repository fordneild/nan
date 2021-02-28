import React, { useState } from "react";
import { useApollo } from "../../apollo/client";
import authContext from "../../context/authContext";

export default function AuthProvider({
    children,
    initialApolloState,
    initialToken = ""
}: {
    children: any;
    initialApolloState: any;
    initialToken?: string;
}) {
    const [token, setToken] = useState<string>(initialToken);
    const apolloClient = useApollo(initialApolloState, token);
    //we expose these to the entire project
    const contextValue = {
        //will be used by auth methods once they token back from the api
        setToken,
        //this is how components can determine if the user is authenticated
        isAuthenticated: token && token !== "" ? true : false,
        //we provide the apolloClient which attaches the token to outgoing requests
        apolloClient
    };
    return (
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    );
}
