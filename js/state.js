// Game state management
let gameState = {
  currentScene: null,
  player: null,
  inventory: [],
  quests: [],
  gold: 0,
};

function updateGameState(newState) {
  gameState = { ...gameState, ...newState };
}

// Inventory management
function addToInventory(item) {
  gameState.inventory.push(item);
}

function removeFromInventory(item) {
  const index = gameState.inventory.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    gameState.inventory.splice(index, 1);
  }
}

function useItem(item) {
  if (item.use) {
    item.use(gameState.player);
    removeFromInventory(item);
  }
}

// Item definitions
const itemTypes = {
  WEAPON: "weapon",
  ARMOR: "armor",
  ACCESSORY: "accessory",
  CONSUMABLE: "consumable",
};

class Item {
  constructor(id, name, type, description) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
  }
}

class EquipmentItem extends Item {
  constructor(id, name, type, description, attack, defense, speed) {
    super(id, name, type, description);
    this.attack = attack || 0;
    this.defense = defense || 0;
    this.speed = speed || 0;
  }
}

class ConsumableItem extends Item {
  constructor(id, name, description, effect) {
    super(id, name, itemTypes.CONSUMABLE, description);
    this.effect = effect;
  }

  use(character) {
    this.effect(character);
  }
}

// Example items
const ironSword = new EquipmentItem(
  1,
  "Iron Sword",
  itemTypes.WEAPON,
  "A basic iron sword",
  5,
  0,
  0
);
const leatherArmor = new EquipmentItem(
  2,
  "Leather Armor",
  itemTypes.ARMOR,
  "Basic leather armor",
  0,
  3,
  0
);
const healingPotion = new ConsumableItem(
  3,
  "Healing Potion",
  "Restores 20 HP",
  (character) => {
    character.hp = Math.min(character.hp + 20, character.maxHp);
  }
);

// Add these items to the game
addToInventory(ironSword);
addToInventory(leatherArmor);
addToInventory(healingPotion);
