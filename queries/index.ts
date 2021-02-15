import gql from "graphql-tag";
export const GET_USERS_EMAILS = gql`
    {
        User {
            userId
            email
        }
    }
`;

export const GET_USER_COUNT = gql`
    query userCount {
        userCount
    }
`;
