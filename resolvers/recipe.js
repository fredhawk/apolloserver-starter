export default {
  Query: {
    getRecipes: async (root, args, { Recipe }) => {
      const recipes = await Recipe.find(args)
      return recipes
    },
  },
  Mutation: {
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
  Recipe: {
    author: ({ author }, args, { User }) => User.findOne({ _id: author }),
  },
}
