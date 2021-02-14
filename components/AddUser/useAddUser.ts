import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../../mutations";
import { GET_USERS_EMAILS } from "../../queries";

export default function useSearchUser() {
    const [addUserMutation] = useMutation(ADD_USER);
    const addUser = (emailValue: string) => {
        addUserMutation({
            variables: {
                email: emailValue
            },
            optimisticResponse: {
                __typename: "Mutation",
                addUser: {
                    __typename: "User",
                    email: emailValue
                }
            },
            update: (cache, { data }) => {
                const newUser = data?.addUser;
                const existingUsers =
                    cache.readQuery<any>({
                        query: GET_USERS_EMAILS
                    })?.users || [];
                const newUsers = [...existingUsers, newUser];
                cache.writeQuery({
                    query: GET_USERS_EMAILS,
                    data: {
                        users: newUsers
                    }
                });
            }
        });
    }

    return addUser

}
