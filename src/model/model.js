const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const { Schema } = mongoose
const skipInit = process.env.NODE_ENV === 'test'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  { timestamps: true },
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cooktime: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    steps: [
      {
        type: String,
        required: true,
      },
    ],
    author: { type: String, required: true },
  },
  { timestamps: true },
)

const User = mongoose.model(`User`, userSchema, 'users', skipInit)

const Recipe = mongoose.model(`Recipe`, recipeSchema, 'recipes', skipInit)

module.exports = {
  User,
  Recipe,
}
