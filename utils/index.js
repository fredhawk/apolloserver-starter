import faker from 'faker'
import { graphql } from 'graphql'
import schema from '../schemas/schema'

export const generateData = (type, seed) => {
  faker.seed(seed)
  if (type === 'recipe') {
    return {
      id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      cooktime: faker.random.number(99),
      createdAt: faker.date.past(),
      ingredients: [
        {
          name: faker.random.words(2),
          amount: faker.random.number(500),
          unit: faker.random.word(),
        },
        {
          name: faker.random.words(2),
          amount: faker.random.number(500),
          unit: faker.random.word(),
        },
        {
          name: faker.random.words(2),
          amount: faker.random.number(500),
          unit: faker.random.word(),
        },
      ],
      steps: [
        faker.random.words(3),
        faker.random.words(5),
        faker.random.words(6),
        faker.random.words(3),
        faker.random.words(4),
      ],
      author: faker.random.uuid(),
    }
  }
  if (type === 'user') {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  }
}

export const seeds = [155, 324, 173, 321]

export const request = (query, context = {}, variables = {}) =>
  graphql(schema, query, undefined, { context }, variables)
