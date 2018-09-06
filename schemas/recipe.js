import { gql } from 'apollo-server'

export default gql`
  type Recipe {
    _id: ID
    title: String
    description: String
    cooktime: Int
    createdAt: String
    updatedAt: String
    ingredients: [Ingredient]
    steps: [String]
    author: User!
  }

  type Ingredient {
    _id: ID
    name: String
    amount: Int
    unit: String
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
  }

  extend type Query {
    getRecipes(_id: String, title: String, author: String): [Recipe]
    recipes: [Recipe]
    recipestest: [Recipe]
  }

  extend type Mutation {
    createRecipe(input: RecipeInput!): Recipe
  }
`
