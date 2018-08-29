import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import 'dotenv/config'

const createToken = (user, secret, expiresIn) => {
  const { name, email } = user
  return jwt.sign({ name, email }, secret, { expiresIn })
}

export default {
  Query: {
    getUsers: (root, args, { User }) => User.find(args),
    getUser: (parent, { _id }, { User }) => User.findOne({ _id }),
    me: (_, args, { me }) => me,
    getRecipes: async (root, args, { Recipe }) => {
      const recipes = await Recipe.find(args)
      return recipes
    },
  },
  Mutation: {
    async createUser(
      root,
      {
        input: { name, email, password },
      },
      { User },
    ) {
      const user = await User.findOne({ email })

      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({ name, email, password }).save()
      return { token: createToken(newUser, process.env.SECRET, '1hr') }
    },
    async updateUser(root, args, { User }) {
      const user = await User.findByIdAndUpdate(args.id, args, { new: true })
      return user
    },
    async deleteUser(root, { _id }, { User }) {
      const user = await User.findByIdAndRemove(_id)
      return user
    },
    async signInUser(root, { email, password }, { User }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }

      return { token: createToken(user, process.env.SECRET, '1hr') }
    },
    async createRecipe(
      root,
      {
        input: { title, description, cooktime, steps, ingredients, author },
      },
      { Recipe },
    ) {
      const recipe = await new Recipe({
        title,
        description,
        cooktime,
        steps,
        ingredients,
        author,
      }).save()
      return recipe
    },
  },
  User: {
    recipes: ({ _id }, args, { Recipe }) => Recipe.find({ author: _id }),
  },
  Recipe: {
    author: ({ author }, args, { User }) => User.findOne({ _id: author }),
  },
}
