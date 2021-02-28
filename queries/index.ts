import gql from "graphql-tag";
export const GET_USERS_EMAILS = gql`
    {
        User {
            email
        }
    }
`;
export const GET_FEED = gql`
    query getFeed {
        getFeed {
            id
            creator {
                username
            }
            recentReaction
            ... on Image {
                caption
                url
            }
            ... on Post {
                title
                text
            }
        }
    }
`;
export const GET_USER = gql`
    query getUser {
        getUser {
            username
            email
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
