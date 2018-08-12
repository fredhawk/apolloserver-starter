import { gql } from 'apollo-server'

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

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

  type Recipe {
    _id: ID
    title: String
    description: String
    cooktime: Int
    createdAt: String
    updatedAt: String
    ingredients: [Ingredient]
    steps: [String]
    authorid: String
  }

  type Ingredient {
    _id: ID
    name: String
    amount: Int
    unit: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input IngredientInput {
    name: String!
    amount: Int!
    unit: String!
  }

  input RecipeInput {
    title: String!
    description: String!
    cooktime: Int!
    ingredients: [IngredientInput!]!
    steps: [String!]
    authorid: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getUsers(_id: String, email: String): [User]
    getRecipes(_id: String, title: String, authorid: String): [Recipe]
    me(_id: String!): User
    users: [User]
    userstest: [User]
    recipes: [Recipe]
    recipestest: [Recipe]
  }

  type Mutation {
    createUser(input: UserInput!): Token
    updateUser(
      _id: String!
      name: String
      email: String
      password: String
    ): User
    deleteUser(_id: String!): User
    signInUser(email: String!, password: String): Token

    createRecipe(input: RecipeInput!): Recipe
  }
`

export default typeDefs
