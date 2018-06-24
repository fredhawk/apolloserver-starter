import { data } from "../data/data";

const mocks = {
  Query: () => ({
    users: () => data.User(),
    recipes: () => data.Recipe()
  })
};

export default mocks;
