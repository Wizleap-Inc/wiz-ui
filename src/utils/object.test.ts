import { describe, expect, it } from "vitest";

import { getValueFromAccessor } from "./object";

const nestedObject = {
  user: {
    name: "John",
    age: 30,
    address: {
      street: "Main Street",
      city: "New York",
      country: "USA",
      house: {
        color: "red",
        size: 100,
      },
    },
  },
};

describe("getValueFromAccessor", () => {
  it("１ネストのオブジェクトへのアクセス", () => {
    expect(getValueFromAccessor(nestedObject, "user.age")).toEqual(30);
  });

  it("２ネストのオブジェクトへのアクセス", () => {
    expect(getValueFromAccessor(nestedObject, "user.address.city")).toEqual(
      "New York"
    );
  });

  it("３ネストのオブジェクトへのアクセス", () => {
    expect(
      getValueFromAccessor(nestedObject, "user.address.house.color")
    ).toEqual("red");
  });
});
