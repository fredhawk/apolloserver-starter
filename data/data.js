import faker from "faker";

const generateData = (type, seed) => {
  faker.seed(seed);
  if (type === "recipe") {
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
          unit: faker.random.word()
        },
        {
          name: faker.random.words(2),
          amount: faker.random.number(500),
          unit: faker.random.word()
        },
        {
          name: faker.random.words(2),
          amount: faker.random.number(500),
          unit: faker.random.word()
        }
      ],
      steps: [
        faker.random.words(3),
        faker.random.words(5),
        faker.random.words(6),
        faker.random.words(3),
        faker.random.words(4)
      ],
      author: faker.random.uuid()
    };
  }
  if (type === "user") {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  }
};

const seeds = [155, 324, 173, 321];
export const data = {
  User: () => {
    const users = [...Array(seeds.length)].map((item, index) =>
      generateData("user", seeds[index])
    );
    return users;
  },
  Recipe: () => {
    const recipes = [...Array(seeds.length)].map((item, index) =>
      generateData("recipe", seeds[index])
    );
    return recipes;
  }
};

export const users = [
  {
    id: 1231,
    name: "Jon Snow",
    email: "jon.snow@email.com",
    password: "snowjon"
  },
  {
    id: 1232,
    name: "Tyrion Lannister",
    email: "tyrion.lannister@email.com",
    password: "lannistertyrion"
  },
  {
    id: 1233,
    name: "Sansa Stark",
    email: "sansa.stark@email.com",
    password: "starksansa"
  }
];

export const recipes = [
  {
    id: "sdhf123",
    title: "Meatballs with mash potatoes",
    description: "Mouthful of joy",
    cooktime: 25,
    createdAt: "2018-06-13",
    ingredients: [
      { name: "Minced meat", amount: 500, unit: "gram" },
      { name: "Onion", amount: 1, unit: "pcs" },
      { name: "salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Chop the onion.",
      "Mix the meat and onion and salt in a bowl.",
      "Roll the mix into balls.",
      "Fry the balls in a pan."
    ],
    author: 1232
  },
  {
    id: "sdhasf23",
    title: "Pasta Carbonara",
    description: "Delicious pasta with sauce.",
    cooktime: 23,
    createdAt: "2018-06-23",
    ingredients: [
      { name: "Pasta", amount: 500, unit: "gram" },
      { name: "Bacon", amount: 1, unit: "pack" },
      { name: "Parmegian cheese", amount: 250, unit: "gram" }
    ],
    steps: [
      "Cook the pasta.",
      "Fry the bacon.",
      "Mix it together and add the cheese."
    ],
    author: 1231
  },
  {
    id: "sdhiuhhf123",
    title: "Meatloaf",
    description: "Family dinner time",
    cooktime: 35,
    createdAt: "2018-06-06",
    ingredients: [
      { name: "Minced meat", amount: 500, unit: "gram" },
      { name: "Onion", amount: 1, unit: "pcs" },
      { name: "salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Chop the onion.",
      "Mix the meat and onion and salt in a bowl.",
      "Make a roll of the mix.",
      "Put it on a plate and into the oven for 30 minutes."
    ],
    author: 1232
  },
  {
    id: "sdhflsaw123",
    title: "Pasta Bolognese",
    description: "A lovely Italian specialty.",
    cooktime: 45,
    createdAt: "2018-05-17",
    ingredients: [
      { name: "Minced meat", amount: 500, unit: "gram" },
      { name: "Onion", amount: 1, unit: "pcs" },
      { name: "Pasta", amount: 1, unit: "pack" }
    ],
    steps: [
      "Chop the onion.",
      "Mix the meat and onion and salt in a bowl.",
      "Cook the pasta.",
      "Cook the meat in a pan."
    ],
    author: 1233
  }
];
