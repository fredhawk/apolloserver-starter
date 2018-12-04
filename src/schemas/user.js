import { gql } from 'apollo-server'

export default gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    recipes: [Recipe]
    createdAt: String
    updatedAt: String
  }

  type Token {
    token: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  extend type Query {
    getUsers(_id: String, email: String): [User]
    getUser(_id: String!): User
    me: User
    users: [User]
    userstest: [User]
  }

  extend type Mutation {
    createUser(input: UserInput!): Token
    updateUser(_id: ID!, name: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    cleanDB: Boolean!
    signInUser(email: String!, password: String): Token
  }
`
