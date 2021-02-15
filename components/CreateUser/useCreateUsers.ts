import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { CREATE_USERS } from "../../mutations";
import { GET_USERS_EMAILS } from "../../queries";
import { GET_USER_COUNT } from "../../queries";
import { addItemToCache, updateNumberInCache } from "../../util/cache";
import refetchQueriesHelper from "../../util/refetchQueriesHelper";
export default function useAddUser() {
    //get mutation hook from apollo client
    const [error, setError] = useState<Error | undefined>();
    const [createUsersMutation, mutationState] = useMutation(CREATE_USERS);
    const addUser = async (emailValue: string) => {
        //trigger mutation hook
        try {
            await createUsersMutation({
                //variables passed into the graphql mutation
                variables: {
                    data: { email: emailValue }
                },
                optimisticResponse: {
                    __typename: "Mutation",
                    CreateUser: {
                        __typename: "User",
                        userId: "loading...",
                        email: emailValue
                    }
                },
                // update the cache with the added user
                update: (cache, { data }) => {
                    const newUser = data?.CreateUser;
                    //add new user to cache
                    addItemToCache(cache, GET_USERS_EMAILS, "User", newUser);
                    // increment number of users by 1 in cache
                    updateNumberInCache(cache, GET_USER_COUNT, "userCount", 1);
                }
                // additionally, refetch these queries?
                // refetchQueries: refetchQueriesHelper([
                //     GET_USER_COUNT,
                //     GET_USERS_EMAILS
                // ])
            });
        } catch (error) {
            setError(error);
        }
    };

    return { addUser, ...mutationState, mutationError: error };
}
