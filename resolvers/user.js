import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserInputError, AuthenticationError } from 'apollo-server'

const createToken = (user, secret, expiresIn) => {
  const { _id, name, email } = user
  return jwt.sign({ _id, name, email }, secret, { expiresIn })
}

export default {
  Query: {
    getUsers: (parent, args, { User }) => User.find(args),
    getUser: (parent, { _id }, { User }) => User.findOne({ _id }),
    me: (parent, args, { me }) => me,
  },
  Mutation: {
    async createUser(
      parent,
      {
        input: { name, email, password },
      },
      { User, secret },
    ) {
      const user = await User.findOne({ email })

      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({ name, email, password }).save()
      return { token: createToken(newUser, secret, '1hr') }
    },
    async updateUser(parent, args, { User }) {
      const user = await User.findByIdAndUpdate(args._id, args, { new: true })
      return user
    },
    async deleteUser(parent, { _id }, { User }) {
      const user = await User.findByIdAndRemove(_id)
      return user
    },
    async signInUser(parent, { email, password }, { User, secret }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new AuthenticationError('Invalid password')
      }

      return { token: createToken(user, secret, '1hr') }
    },
  },
  User: {
    recipes: ({ _id }, args, { Recipe }) => Recipe.find({ author: _id }),
  },
}
