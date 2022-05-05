const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;

  //Initial Game
  Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy("goblin", "sword"));
    this.enemies.push(new Enemy("orc", "baseball bat"));
    this.enemies.push(new Enemy("skeleton", "axe"));

    this.currentEnemy = this.enemies[0];

    //inquirer starter
    inquirer
      .prompt({
        type: "text",
        name: "name",
        message: "What is your name?",
      })
      .then(({ name }) => {
        this.player = new Player(name);

        this.startNewBattle();
      });
  };
}
//Start a new battle
Game.prototype.startNewBattle = function () {
  console.log(this.player.agility);
  console.log(this.currentEnemy.agility);
  // if player agility >  enemy agility
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log("Your stats are as follows:");
  console.log(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  this.battle();
};

//Battling
Game.prototype.battle = function () {
  //if player agility > enemy agility
  if (this.isPlayerTurn) {
    // player's turn, ask them questions
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      .then(({ action }) => {
        if (action === "Use potion") {
          if (!this.player.getInventory()) {
            console.log("You dont have any potions!");
            return this.checkEndOfBattle();
            // return nothing and tell user a message if they try to use a potion with an empty inventory
          }
          inquirer
            .prompt({
              type: "list",
              message: "which potion would you like to use?",
              name: "action",
              choices: this.player
                .getInventory()
                .map((item, index) => `${index + 1}: ${item.name}`),
            })
            .then(({ action }) => {
              // split values in choices
              const potionDetails = action.split(": ");

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} Potion`);
              this.checkEndOfBattle();
            });
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
          this.checkEndOfBattle();
        }
      });
  }
};

//Ending battle
Game.prototype.checkEndOfBattle = function () {
  //checking end of battle when:
  //  1. Player uses potion, 2. player attempts to use a potion but has an empty inventory, 3. the player attacks the enemy, 4. the enemy attacks the player
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name}`);

    this.player.addPotion(this.currentEnemy.potion);
    console.log(
      `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
    );

    this.roundNumber++;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log("You Win!");
    }
  } else {
    console.log("Youve been defated! GG");
  }
};

module.exports = Game;
