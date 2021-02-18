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
