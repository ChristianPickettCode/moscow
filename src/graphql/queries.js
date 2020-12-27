/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      apiKeys {
        items {
          id
          appName
          userID
          sessionCount
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        apiKeys {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getApiKey = /* GraphQL */ `
  query GetApiKey($id: ID!) {
    getApiKey(id: $id) {
      id
      appName
      userID
      sessionCount
      user {
        id
        firstName
        lastName
        email
        apiKeys {
          nextToken
        }
        createdAt
        updatedAt
      }
      sessions {
        items {
          id
          apiKeyID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listApiKeys = /* GraphQL */ `
  query ListApiKeys(
    $filter: ModelApiKeyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApiKeys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        appName
        userID
        sessionCount
        user {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      apiKeyID
      type
      apiKey {
        id
        appName
        userID
        sessionCount
        user {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        apiKeyID
        type
        apiKey {
          id
          appName
          userID
          sessionCount
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const sessionByApiKeyId = /* GraphQL */ `
  query SessionByApiKeyId(
    $apiKeyID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionByApiKeyID(
      apiKeyID: $apiKeyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        apiKeyID
        type
        apiKey {
          id
          appName
          userID
          sessionCount
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
