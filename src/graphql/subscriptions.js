/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          whitelist
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          whitelist
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          whitelist
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
export const onCreateApiKey = /* GraphQL */ `
  subscription OnCreateApiKey {
    onCreateApiKey {
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
      whitelist
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApiKey = /* GraphQL */ `
  subscription OnUpdateApiKey {
    onUpdateApiKey {
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
      whitelist
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApiKey = /* GraphQL */ `
  subscription OnDeleteApiKey {
    onDeleteApiKey {
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
      whitelist
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
        whitelist
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
        whitelist
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
        whitelist
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
