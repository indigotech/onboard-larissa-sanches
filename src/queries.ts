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
