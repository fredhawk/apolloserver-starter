import { MockList } from 'apollo-server'
import faker from 'faker'

const mocks = {
  User: () => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),
  Recipe: () => ({
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    cooktime: faker.random.number(99),
    createdAt: faker.date.past(),
    ingredients: () =>
      new MockList([4, 8], () => ({
        name: faker.random.words(2),
        amount: faker.random.number(500),
        unit: faker.random.word(),
      })),
    steps: () => new MockList([4, 7], () => faker.random.words(4)),
    author: faker.random.uuid(),
  }),
  Query: () => ({
    userstest: () => new MockList(3),
    recipestest: () => new MockList([3, 8]),
  }),
}

export default mocks
