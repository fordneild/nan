import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../../mutations";
import { GET_USERS_EMAILS } from "../../queries";
import { GET_USER_COUNT } from "../../queries";
import refetchQueriesHelper from "../../util/refetchQueriesHelper";
import useAuth from "../../hooks/useAuth";
import Router from "next/router";
export default function useSignUp() {
    //get mutation hook from apollo client
    const [signUpMutation, mutationState] = useMutation(SIGN_UP);
    const { setToken, isAuthenticated } = useAuth();

    // useEffect(() => {
    //     Router.push("/");
    // }, [mutationState.called, isAuthenticated]);

    const token = mutationState.data?.signUp?.token;
    useEffect(() => {
        if (token && token !== "") {
            setToken(token);
        }
    }, [token]);
    const signUp = async (email: string, password: string) => {
        //trigger mutation hook
        try {
            await signUpMutation({
                //variables passed into the graphql mutation
                variables: {
                    email,
                    password
                },
                // additionally, refetch these queries?
                refetchQueries: refetchQueriesHelper([
                    GET_USER_COUNT,
                    GET_USERS_EMAILS
                ])
            });
        } catch (error) {
            //TODO: log error
        }
    };

    return {
        signUp,
        ...mutationState
    };
}
