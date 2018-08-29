import connection from '../database/database'
import { Recipe } from '../model/model'

import 'dotenv/config'

describe('Recipe', () => {
  let db
  beforeAll(() => {
    db = connection(process.env.TESTDB)
  })

  beforeEach(async done => {
    await db.collections.recipes.drop()
    const recipe1 = await new Recipe({
      title: 'Meatballs with mash potatoes',
      description: 'Mouthful of joy',
      cooktime: 25,
      createdAt: '2018-06-13',
      ingredients: [
        { name: 'Minced meat', amount: 500, unit: 'gram' },
        { name: 'Onion', amount: 1, unit: 'pcs' },
        { name: 'salt', amount: 1, unit: 'pinch' },
      ],
      steps: [
        'Chop the onion.',
        'Mix the meat and onion and salt in a bowl.',
        'Roll the mix into balls.',
        'Fry the balls in a pan.',
      ],
      author: '1',
    })
    const recipe2 = await new Recipe({
      title: 'Pasta Carbonara',
      description: 'Delicious pasta with sauce.',
      cooktime: 23,
      createdAt: '2018-06-23',
      ingredients: [
        { name: 'Pasta', amount: 500, unit: 'gram' },
        { name: 'Bacon', amount: 1, unit: 'pack' },
        { name: 'Parmegian cheese', amount: 250, unit: 'gram' },
      ],
      steps: [
        'Cook the pasta.',
        'Fry the bacon.',
        'Mix it together and add the cheese.',
      ],
      author: '4',
    })
    const recipe3 = await new Recipe({
      title: 'Meatloaf',
      description: 'Family dinner time',
      cooktime: 35,
      createdAt: '2018-06-06',
      ingredients: [
        { name: 'Minced meat', amount: 500, unit: 'gram' },
        { name: 'Onion', amount: 1, unit: 'pcs' },
        { name: 'salt', amount: 1, unit: 'pinch' },
      ],
      steps: [
        'Chop the onion.',
        'Mix the meat and onion and salt in a bowl.',
        'Make a roll of the mix.',
        'Put it on a plate and into the oven for 30 minutes.',
      ],
      author: '2',
    })
    const recipe4 = await new Recipe({
      title: 'Pasta Bolognese',
      description: 'A lovely Italian specialty.',
      cooktime: 45,
      createdAt: '2018-05-17',
      ingredients: [
        { name: 'Minced meat', amount: 500, unit: 'gram' },
        { name: 'Onion', amount: 1, unit: 'pcs' },
        { name: 'Pasta', amount: 1, unit: 'pack' },
      ],
      steps: [
        'Chop the onion.',
        'Mix the meat and onion and salt in a bowl.',
        'Cook the pasta.',
        'Cook the meat in a pan.',
      ],
      author: '2',
    })
    await recipe1.save()
    await recipe2.save()
    await recipe3.save()
    await recipe4.save()
    done()
  })

  afterAll(async done => {
    await db.close()
    return done()
  })

  it('should be able to create a recipe', async () => {
    const recipe = await new Recipe({
      title: 'Sausage Stroganoff',
      description: 'Family dinner time',
      cooktime: 25,
      createdAt: '2018-06-09',
      ingredients: [
        { name: 'Falu sausage', amount: 500, unit: 'gram' },
        { name: 'Onion', amount: 1, unit: 'pcs' },
        { name: 'Pasta', amount: 500, unit: 'gram' },
        { name: 'salt', amount: 1, unit: 'pinch' },
      ],
      steps: [
        'Chop the onion.',
        'Fry the sausage and onion in a pan',
        'Boil the pasta',
        'Eat.',
      ],
      author: '2',
    })

    await recipe.save()
    expect(!recipe.isNew).toBe(true)
    const recipes = await Recipe.find()
    expect(recipes).toHaveLength(5)
  })
  it('should have 4 recipes', async () => {
    const recipes = await Recipe.find()
    expect(recipes).toHaveLength(4)
    expect(recipes[0]).toHaveProperty('_id')
    expect(recipes[0]).toHaveProperty('title')
    expect(recipes[0]).toHaveProperty('description')
    expect(recipes[0]).toHaveProperty('cooktime')
    expect(recipes[0]).toHaveProperty('createdAt')
    expect(recipes[0]).toHaveProperty('ingredients')
    expect(recipes[0]).toHaveProperty('steps')
    expect(recipes[0]).toHaveProperty('author')
  })

  it('should update recipe', async () => {
    const recipe = await Recipe.findOneAndUpdate(
      { title: 'Meatballs with mash potatoes' },
      { title: 'Swedish Meatballs' },
      { new: true },
    )
    expect(recipe).toMatchObject({
      title: 'Swedish Meatballs',
      description: 'Mouthful of joy',
    })
  })

  it('should delete recipe', async () => {
    const recipe = await Recipe.findOneAndRemove({
      title: 'Meatballs with mash potatoes',
    })
    const recipes = await Recipe.find()

    expect(recipe).toMatchObject({
      title: 'Meatballs with mash potatoes',
      description: 'Mouthful of joy',
      cooktime: 25,
    })
    expect(recipes).toHaveLength(3)
  })
})
