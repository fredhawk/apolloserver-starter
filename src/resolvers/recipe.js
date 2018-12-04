import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isRecipeOwner } from './authorization'

export default {
  Query: {
    getRecipes: async (parent, args, { Recipe }) => {
      const recipes = await Recipe.find(args)
      return recipes
    },
  },
  Mutation: {
    createRecipe: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { input: { title, description, cooktime, steps, ingredients } },
        { Recipe, me },
      ) => {
        const recipe = await new Recipe({
          title,
          description,
          cooktime,
          steps,
          ingredients,
          author: me._id,
        }).save()
        return recipe
      },
    ),
    updateRecipe: combineResolvers(
      isAuthenticated,
      isRecipeOwner,
      async (parent, args, { Recipe }) => {
        const recipe = await Recipe.findByIdAndUpdate(args._id, args.input, {
          new: true,
        })
        return recipe
      },
    ),
    deleteRecipe: combineResolvers(
      isAuthenticated,
      isRecipeOwner,
      async (parent, { _id }, { Recipe }) => {
        const recipe = await Recipe.findByIdAndRemove(_id)
        return recipe
      },
    ),
  },
  Recipe: {
    author: ({ author }, args, { User }) => User.findOne({ _id: author }),
  },
}
