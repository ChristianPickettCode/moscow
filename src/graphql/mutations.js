/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createApiKey = /* GraphQL */ `
  mutation CreateApiKey(
    $input: CreateApiKeyInput!
    $condition: ModelApiKeyConditionInput
  ) {
    createApiKey(input: $input, condition: $condition) {
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
export const updateApiKey = /* GraphQL */ `
  mutation UpdateApiKey(
    $input: UpdateApiKeyInput!
    $condition: ModelApiKeyConditionInput
  ) {
    updateApiKey(input: $input, condition: $condition) {
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
export const deleteApiKey = /* GraphQL */ `
  mutation DeleteApiKey(
    $input: DeleteApiKeyInput!
    $condition: ModelApiKeyConditionInput
  ) {
    deleteApiKey(input: $input, condition: $condition) {
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
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
