import { gql } from 'apollo-server'

import userSchema from './user'
import recipeSchema from './recipe'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, userSchema, recipeSchema]
