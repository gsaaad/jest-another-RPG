//import Potion
const Potion = require("../lib/Potion");

function Player(name = "") {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  //   this will be overridden by the mock initially!
  this.inventory = [new Potion("health"), new Potion()];
}
Player.prototype.getStats = function () {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility,
  };
};

//returns the inventory array or false if empty
Player.prototype.getInventory = function () {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};
Player.prototype.getHealth = function () {
  return `${this.name}'s health is now ${this.health}`;
};
Player.prototype.isAlive = function () {
  if (this.health === 0) {
    return false;
  }
  return true;
};
Player.prototype.reduceHealth = function (hitDMG) {
  this.health -= hitDMG;

  if (this.health < 0) {
    this.health = 0;
  }
};
module.exports = Player;
