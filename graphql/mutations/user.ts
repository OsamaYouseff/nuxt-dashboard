import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation addUser($data: CreateUserDto!) {
    addUser(data: $data) {
      id
      name
      email
      role
      avatar
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;
export const IS_EMAIL_AVAILABLE = gql`
  query isAvailable($email: String!) {
    isAvailable(email: $email)
  }
`;

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      password
      name
      role
      avatar
      creationAt
      updatedAt
    }
  }
`;

export const GET_MY_PROFILE_QUERY = gql`
  query {
  myProfile {
    id
    name
    avatar
  }
}
`;


export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: Int!, $data: UpdateUserDto!) {
    updateUser(id: $id, data: $data) {
      id
      na
      email
      role
      avatar
    }
  }
`;


