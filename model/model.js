import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]
  },
  { timestamps: true }
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cooktime: {
      type: Number,
      required: true
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          required: true
        }
      }
    ],
    steps: [
      {
        type: String,
        required: true
      }
    ],
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const User = mongoose.model(`User`, userSchema);

export const Recipe = mongoose.model(`Recipe`, recipeSchema);
