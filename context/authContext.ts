import { ApolloClient } from "@apollo/react-hooks";
import { createContext } from "react";
export interface AuthContext {
    //you can have a token, but not be ready to make authenticated requests yet, because the headers hvaent been attached to Apollo Client yet
    //that is why we need both pieces of state
    setToken: (newToken: string) => any;
    isAuthenticated: boolean;
    apolloClient?: ApolloClient<any>;
}

const initAuthContext: AuthContext = {
    setToken: () => {},
    isAuthenticated: false
};

const authContext = createContext<AuthContext>(initAuthContext);

export default authContext;
