import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'

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
  },
  Recipe: {
    author: ({ author }, args, { User }) => User.findOne({ _id: author }),
  },
}
