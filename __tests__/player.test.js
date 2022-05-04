const Player = require("../lib/Player");
const Potion = require("../lib/Potion");
console.log(new Potion(), "POTION!");

jest.mock("../lib/Potion");
console.log(new Potion());
test("creates a player object", () => {
  const player = new Player("Dave");

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(
    //expect inventory to equal an array containing any object!
    //   inventory will be an object
    expect.arrayContaining([expect.any(Object)])
  );
});

test("Gets player's state as an object", () => {
  const player = new Player("Dave");

  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});

test("Gets inventory from player, if no inventory, returns false", () => {
  const player = new Player("George");

  expect(player.getInventory()).toEqual(expect.any(Array));
  player.inventory = [];
  expect(player.getInventory()).toEqual(false);
});

test("Gets player's health value ", () => {
  const player = new Player("Dave");

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString())
  );
});

test("checks if player is still alive or not", () => {
  const player = new Player("dave");

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;
  expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
  const player = new Player("dave");
  const oldHealth = player.health;

  player.reduceHealth(5);
  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});
