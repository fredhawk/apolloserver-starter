import { users } from "../data/data";

describe("User", () => {
  it("should return 4 users", () => {
    expect(users).toHaveLength(3);
  });
  it("should have id, name, email and password properties", () => {
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
    expect(users[0]).toHaveProperty("password");
  });
});
