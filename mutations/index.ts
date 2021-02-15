import gql from "graphql-tag";
export const CREATE_USERS = gql`
    mutation CreateUser($data: _UserCreate!) {
        CreateUser(data: $data) {
            userId
            email
        }
    }
`;
