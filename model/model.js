import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const recipeSchema = new Schema({
  title: String,
  description: String,
  cooktime: Number,
  createdAt: Date,
  ingredients: [
    {
      name: String,
      amount: Number,
      unit: String
    }
  ],
  steps: [String],
  author: { type: Schema.Types.ObjectId, ref: `User` }
});

export const User = mongoose.model(`User`, userSchema);

export const Recipe = mongoose.model(`Recipe`, recipeSchema);
