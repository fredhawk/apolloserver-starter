import { users, recipes } from "../data/data";

const resolvers = {
  Query: {
    users: () => users,
    recipes: () => recipes
  }
};

export default resolvers;
