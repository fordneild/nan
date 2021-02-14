import gql from "graphql-tag";
export const ADD_USER = gql`
  mutation AddUser($email: String!) {
    addUser(email: $email) {
      email
    }
  }
`;
