class Battle {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 0;
  }

  start() {
    updateUI({
      image: `battle_${this.monster.name.toLowerCase()}.png`,
      text: `A wild ${this.monster.name} appears!`,
      buttons: [
        { text: "Attack", action: "attack" },
        { text: "Defend", action: "defend" },
        { text: "Use Item", action: "useItem" },
        { text: "Run", action: "run" },
      ],
    });
  }

  attack(attacker, defender) {
    const damage = Math.max(0, attacker.attack - defender.defense);
    defender.hp = Math.max(0, defender.hp - damage);
    return damage;
  }

  playerTurn(action) {
    let result = "";
    switch (action) {
      case "attack":
        const damage = this.attack(this.player, this.monster);
        result = `You dealt ${damage} damage to ${this.monster.name}!`;
        break;
      case "defend":
        this.player.defense += 5; // Temporary defense boost
        result = "You brace yourself for the incoming attack.";
        break;
      case "useItem":
        // Implement item usage in battle
        result = "Item usage not implemented yet.";
        break;
      case "run":
        if (Math.random() < 0.5) {
          endBattle("escape");
          return;
        } else {
          result = "Couldn't escape!";
        }
        break;
    }
    this.checkBattleEnd();
    if (this.monster.hp > 0) {
      this.monsterTurn();
    }
    return result;
  }

  monsterTurn() {
    const damage = this.attack(this.monster, this.player);
    if (this.player.defense > 5) {
      this.player.defense -= 5; // Remove temporary defense boost
    }
    this.checkBattleEnd();
    return `${this.monster.name} attacks! You take ${damage} damage.`;
  }

  checkBattleEnd() {
    if (this.monster.hp <= 0) {
      endBattle("win");
    } else if (this.player.hp <= 0) {
      endBattle("lose");
    }
  }
}

let currentBattle = null;

function startBattle(monster) {
  currentBattle = new Battle(gameState.player, monster);
  currentBattle.start();
}

function handleBattleAction(action) {
  if (currentBattle) {
    const playerResult = currentBattle.playerTurn(action);
    const monsterResult =
      currentBattle.monster.hp > 0 ? currentBattle.monsterTurn() : "";
    updateUI({
      text: `${playerResult}\n${monsterResult}`,
      buttons: [
        { text: "Attack", action: "attack" },
        { text: "Defend", action: "defend" },
        { text: "Use Item", action: "useItem" },
        { text: "Run", action: "run" },
      ],
    });
  }
}

function endBattle(result) {
  let message = "";
  switch (result) {
    case "win":
      const expGained = currentBattle.monster.exp;
      const goldGained = currentBattle.monster.gold;
      gameState.player.gainExp(expGained);
      gameState.gold += goldGained;
      message = `You defeated ${currentBattle.monster.name}! You gained ${expGained} EXP and ${goldGained} gold.`;
      break;
    case "lose":
      message = "You were defeated. Game Over!";
      // Implement game over logic
      break;
    case "escape":
      message = "You successfully escaped from the battle!";
      break;
  }
  currentBattle = null;
  updateUI({
    text: message,
    buttons: [{ text: "Continue", action: "continueBattle" }],
  });
}
