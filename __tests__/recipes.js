import { data } from "../data/data";

describe("Recipes", () => {
  const recipes = data.Recipe();
  it("should have 4 recipes", () => {
    expect(recipes).toHaveLength(4);
  });
  it("should have 8 properties", () => {
    expect(recipes[0]).toHaveProperty("id");
    expect(recipes[0]).toHaveProperty("title");
    expect(recipes[0]).toHaveProperty("description");
    expect(recipes[0]).toHaveProperty("cooktime");
    expect(recipes[0]).toHaveProperty("createdAt");
    expect(recipes[0]).toHaveProperty("ingredients");
    expect(recipes[0]).toHaveProperty("steps");
    expect(recipes[0]).toHaveProperty("author");
  });
});
