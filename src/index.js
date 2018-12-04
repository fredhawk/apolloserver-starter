import { ApolloServer, AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

import typeDefs from './schemas/schema'
import resolvers from './resolvers'
import mocks from './mocks/mocks'
import database from './database/database'
import { User, Recipe } from './model/model'

import 'dotenv/config'

// Start Database connection.
const db = database(process.env.MONGODB)

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError(
        'Your session has expired. Please sign in again.',
      )
    }
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req)

    return {
      Recipe,
      User,
      me,
      secret: process.env.SECRET,
    }
  },
  mocks,
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
