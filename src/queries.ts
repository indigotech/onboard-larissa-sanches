import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users($data: PageInput!) {
    users(data: $data) {
      nodes {
        id
        email
        name
      }
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
      count
    }
  }
`;

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
