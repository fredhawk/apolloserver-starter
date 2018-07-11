import connection from "../database/database";
import { User } from "../model/model";

import "dotenv/config";

describe("User", () => {
  let db;
  beforeAll(() => {
    db = connection(process.env.TESTDB);
  });

  beforeEach(async done => {
    await db.collections.users.drop();
    done();
  });

  afterAll(async done => {
    await db.close();
    return done();
  });
  it("should create a user", async done => {
    const joe = await new User({
      name: "Joe",
      email: "joe@example.com",
      password: "auh239saf"
    });

    await joe.save();
    // await expect(!joe.isNew).toBe(true);
    await expect(joe).toHaveProperty("_id");
    await expect(joe).toHaveProperty("name");
    await expect(joe).toHaveProperty("email");
    await expect(joe).toHaveProperty("password");
    done();
  });
});
