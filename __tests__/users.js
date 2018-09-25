import mongoose from 'mongoose'
import { User } from '../model/model'

describe('User', () => {
  let db
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true },
    )
    db = await mongoose.connection
  })

  beforeEach(async () => {
    await User.deleteMany({})
    const jane = await new User({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'asfh2899831',
    })
    const rick = await new User({
      name: 'Rick',
      email: 'rick@example.com',
      password: 'lkjsaf187',
    })

    await jane.save()
    await rick.save()
  })

  afterAll(async () => {
    await db.close()
  })

  it('should create a user', async () => {
    const joe = await new User({
      name: 'Joe',
      email: 'joe@example.com',
      password: 'auh239saf',
    })

    await joe.save()
    await expect(!joe.isNew).toBe(true)
    await expect(joe).toHaveProperty('_id')
    await expect(joe).toHaveProperty('name')
    await expect(joe).toHaveProperty('email')
    await expect(joe).toHaveProperty('password')
    // done()
  })

  it('should return all users', async () => {
    const users = await User.find()
    expect(users).toHaveLength(2)
    expect(users[0]).toMatchObject({
      name: 'Jane',
      email: 'jane@example.com',
    })
  })
  it('should return a user with Janes information', async () => {
    const jane = await User.findOne({ name: 'Jane' })
    expect(jane).toMatchObject({
      name: 'Jane',
      email: 'jane@example.com',
    })
  })

  it('should update a users information', async () => {
    const rick = await User.findOneAndUpdate(
      { name: 'Rick' },
      { email: 'ricksemail@example.com' },
      { new: true },
    )
    expect(rick).toMatchObject({
      name: 'Rick',
      email: 'ricksemail@example.com',
    })
  })

  it('should delete a user.', async () => {
    const deletedUser = await User.findOneAndRemove({ name: 'Jane' })
    expect(deletedUser).toMatchObject({
      name: 'Jane',
      email: 'jane@example.com',
    })
    const users = await User.find()
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({
      name: 'Rick',
      email: 'rick@example.com',
    })
  })
})
