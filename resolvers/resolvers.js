// import { users, recipes } from "../data/data";
import { User, Recipe } from "../model/model";

export default {
  Query: {
    getUsers: (root, args) => User.find(args),
    getRecipes: (root, args) => Recipe.find(args)
  },
  Mutation: {
    async createUser(
      root,
      {
        input: { name, email, password }
      }
    ) {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({ name, email, password }).save();
      return newUser;
    },
    async updateUser(root, args) {
      const user = await User.findByIdAndUpdate(args.id, args, { new: true });
      return user;
    },
    async deleteUser(root, args) {
      const user = await User.findByIdAndRemove(args.id);
      return user;
    },
    async createRecipe(
      root,
      {
        input: { title, description, cooktime, steps, ingredients }
      }
    ) {
      const recipe = new Recipe({
        title,
        description,
        cooktime,
        steps,
        ingredients
      }).save();
      return recipe;
    }
  },
  User: {
    // recipes: ({ id }) => Recipe.find(recipe => recipe.author === id)
  },
  Recipe: {
    // author: parent => {
    //   console.log(parent);
    //   // return User.find(parent.author.id);
    //   return null;
    // }
  }
};
