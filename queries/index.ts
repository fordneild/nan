import gql from "graphql-tag";
export const GET_USERS_EMAILS = gql`
    {
        users {
            email
        }
    }
`;