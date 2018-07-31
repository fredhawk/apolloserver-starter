import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import "dotenv/config";

const createToken = (user, secret, expiresIn) => {
  const { name, email } = user;
  return jwt.sign({ name, email }, secret, { expiresIn });
};

export default {
  Query: {
    getUsers: (root, args, { User }) => User.find(args),
    getRecipes: async (root, args, { Recipe }) => {
      const recipes = await Recipe.find(args);
      return recipes;
    }
  },
  Mutation: {
    async createUser(
      root,
      {
        input: { name, email, password }
      },
      { User }
    ) {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({ name, email, password }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    async updateUser(root, args, { User }) {
      const user = await User.findByIdAndUpdate(args.id, args, { new: true });
      return user;
    },
    async deleteUser(root, args, { User }) {
      const user = await User.findByIdAndRemove(args.id);
      return user;
    },
    async signInUser(root, { email, password }, { User }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    async createRecipe(
      root,
      {
        input: { title, description, cooktime, steps, ingredients, authorid }
      },
      { Recipe }
    ) {
      const recipe = await new Recipe({
        title,
        description,
        cooktime,
        steps,
        ingredients,
        authorid
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
