import { gql } from "apollo-server";

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type User {
    id: ID
    name: String
    email: String
    password: String
    recipes: [Recipe]
    createdAt: String
    updatedAt: String
  }

  type Recipe {
    id: ID
    title: String
    description: String
    cooktime: Int
    createdAt: String
    updatedAt: String
    ingredients: [Ingredient]
    steps: [String]
    author: User
  }

  type Ingredient {
    id: ID
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
    author: ID
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getUsers(id: String, email: String): [User]
    getRecipes(id: String, title: String, author: ID): [Recipe]
    users: [User]
    userstest: [User]
    recipes: [Recipe]
    recipestest: [Recipe]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: String!, name: String, email: String, password: String): User
    deleteUser(id: String!): User
    createRecipe(recipe: RecipeInput): Recipe
  }
`;

export default typeDefs;
