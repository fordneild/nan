import gql from "graphql-tag";
export const GET_USERS_EMAILS = gql`
    {
        User {
            email
        }
    }
`;
export const GET_USERNAME = gql`
    query getUser {
        getUser {
            username
        }
    }
`;

export const GET_USER_COUNT = gql`
    query userCount {
        userCount
    }
`;
export const LOGIN = gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const LOGIN_WITH_REFRESH_TOKEN = gql`
    query loginWithRefreshToken {
        loginWithRefreshToken {
            token
        }
    }
`;
export const LOGOUT = gql`
    query logout {
        logout {
            ok
        }
    }
`;
