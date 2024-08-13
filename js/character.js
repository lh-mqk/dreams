// Character management
class Character {
  constructor(name, job) {
    this.name = name;
    this.job = job;
    this.level = 1;
    this.exp = 0;
    this.maxHp = 50;
    this.hp = 50;
    this.maxMp = 20;
    this.mp = 20;
    this.attack = 10;
    this.defense = 5;
    this.speed = 5;
    this.equipment = {
      weapon: null,
      armor: null,
      accessory: null,
    };
  }

  levelUp() {
    this.level++;
    this.maxHp += 10;
    this.maxMp += 5;
    this.hp = this.maxHp;
    this.mp = this.maxMp;
    this.attack += 2;
    this.defense += 1;
    this.speed += 1;
  }

  gainExp(amount) {
    this.exp += amount;
    if (this.exp >= this.level * 100) {
      this.levelUp();
      return true;
    }
    return false;
  }

  equipItem(item) {
    if (item.type in this.equipment) {
      this.unequipItem(item.type);
      this.equipment[item.type] = item;
      this.applyItemStats(item);
    }
  }

  unequipItem(slot) {
    if (this.equipment[slot]) {
      this.removeItemStats(this.equipment[slot]);
      this.equipment[slot] = null;
    }
  }

  applyItemStats(item) {
    this.attack += item.attack || 0;
    this.defense += item.defense || 0;
    this.speed += item.speed || 0;
  }

  removeItemStats(item) {
    this.attack -= item.attack || 0;
    this.defense -= item.defense || 0;
    this.speed -= item.speed || 0;
  }
}

function createCharacter(name, job) {
  const character = new Character(name, job);
  updateGameState({ player: character });
  return character;
}

function getCharacterStatus(character) {
  return `
        Name: ${character.name}
        Job: ${character.job}
        Level: ${character.level}
        EXP: ${character.exp}
        HP: ${character.hp}/${character.maxHp}
        MP: ${character.mp}/${character.maxMp}
        Attack: ${character.attack}
        Defense: ${character.defense}
        Speed: ${character.speed}
    `;
}
