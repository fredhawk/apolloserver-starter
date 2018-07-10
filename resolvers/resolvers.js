// import { users, recipes } from "../data/data";
import { User, Recipe } from "../model/model";

export default {
  Query: {
    getUsers: () => User.find(),
    getUser: (root, args) => User.findById(args.id)
    // getRecipes: () => Recipe.find().populate(`author`)
  }
  // Mutation: {
  // createUser(root, args) {
  //   const user = new User(args);
  //   return user.save();
  // },
  // async updateUser(root, args) {
  //   const user = await User.findByIdAndUpdate(args.id, args, { new: true });
  //   return user;
  // },
  // async deleteUser(root, args) {
  //   const user = await User.findByIdAndRemove(args.id);
  //   return user;
  // }
  // createRecipe(root, args) {
  //   console.log(args);
  //   const recipe = new Recipe(args);
  //   return recipe.save();
  // }
  // }
};

// const resolvers = {
//   Query: {
//     users: () => users,
//     recipes: () => recipes
//   }
// };

// export default resolvers;
