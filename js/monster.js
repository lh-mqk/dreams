class Monster {
  constructor(id, name, level, hp, mp, attack, defense, speed, exp, gold) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.maxHp = hp;
    this.hp = hp;
    this.maxMp = mp;
    this.mp = mp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.exp = exp;
    this.gold = gold;
  }
}

const monsterDatabase = {
  1: new Monster(1, "Slime", 1, 20, 0, 5, 3, 3, 5, 3),
  2: new Monster(2, "Goblin", 3, 35, 0, 8, 5, 5, 10, 5),
  3: new Monster(3, "Wolf", 5, 50, 0, 12, 7, 8, 15, 8),
  // Add more monsters as needed
};

function getRandomMonster(playerLevel) {
  const availableMonsters = Object.values(monsterDatabase).filter(
    (monster) => Math.abs(monster.level - playerLevel) <= 2
  );
  return availableMonsters[
    Math.floor(Math.random() * availableMonsters.length)
  ];
}
