import gql from "graphql-tag";
export const CREATE_USER = gql`
    mutation CreateUser($data: _UserCreate!) {
        CreateUser(data: $data) {
            id
            email
        }
    }
`;
export const SIGN_UP = gql`
    mutation signUp($email: String!, $password: String!) {
        signUp(email: $email, password: $password) {
            token
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($title: String!, $text: String!) {
        createPost(title: $title, text: $text) {
            id
            title
            text
        }
    }
`;

export const REACT = gql`
    mutation react($contentId: ID!, $emotion: Emotion!) {
        react(contentId: $contentId, emotion: $emotion) {
            id
        }
    }
`;
