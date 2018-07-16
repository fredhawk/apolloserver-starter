// import { users, recipes } from "../data/data";
import { User, Recipe } from "../model/model";

export default {
  Query: {
    getUsers: (root, args) => User.find(args),
    getRecipes: (root, args) => Recipe.find(args)
  },
  Mutation: {
    createUser(root, args) {
      const user = new User(args);
      return user.save();
    },
    async updateUser(root, args) {
      const user = await User.findByIdAndUpdate(args.id, args, { new: true });
      return user;
    },
    async deleteUser(root, args) {
      const user = await User.findByIdAndRemove(args.id);
      return user;
    },
    createRecipe(root, args) {
      const recipe = new Recipe(args);
      return recipe.save();
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
