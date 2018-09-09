import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isRecipeOwner = async (parent, { _id }, { me, Recipe }) => {
  const recipe = await Recipe.findById({ _id })
  if (recipe.author !== me._id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}
