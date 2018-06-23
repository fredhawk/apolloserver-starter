import { ApolloServer, gql } from "apollo-server";
import { users, recipes } from "./data/data.js";

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type User {
    id: String
    name: String
    email: String
    password: String
  }

  type Recipe {
    id: String
    title: String
    description: String
    cooktime: Int
    createdAt: String
    ingredients: [Ingredient]
    steps: [String]
    author: String
  }

  type Ingredient {
    name: String
    amount: Int
    unit: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    users: [User]
    recipes: [Recipe]
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    recipes: () => recipes
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
