import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./schemas/schema";
import resolvers from "./resolvers/resolvers";
import mocks from "./mocks/mocks";

import "dotenv/config";

// Setup MongoDB connection
mongoose.connect(
  process.env.MONGODB,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "MongoDB connection error:"));
db.once(`open`, () => {
  console.log("Connected to MongoDB");
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, mocks });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
