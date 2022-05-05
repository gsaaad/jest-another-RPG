//import Potion
const Potion = require("../lib/Potion");
const Character = require("./Character");

class Player extends Character {
  constructor(name = "") {
    //calling the parent constructor here:
    super(name);
    // this.name = name;

    // this.health = Math.floor(Math.random() * 10 + 95);
    // this.strength = Math.floor(Math.random() * 5 + 7);
    // this.agility = Math.floor(Math.random() * 5 + 7);

    //   this will be overridden by the mock initially!
    this.inventory = [new Potion("health"), new Potion()];
  }
  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  }
  //returns the inventory array or false if empty
  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }
  usePotion(index) {
    const potion = this.getInventory().splice(index, 1)[0];
    console.log(potion, "this is what splice potion is like");
    switch (potion.name) {
      case "agility":
        this.agility += potion.value;
        break;
      case "health":
        this.health += potion.value;
        break;
      case "strength":
        this.strength += potion.value;
        break;
    }
  }
}

//inherit prototype methods from character, HERE!

module.exports = Player;
