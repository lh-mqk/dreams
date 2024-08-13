class Quest {
  constructor(id, title, description, objectives, rewards) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.objectives = objectives;
    this.rewards = rewards;
    this.isCompleted = false;
    this.progress = objectives.map(() => 0);
  }

  updateProgress(objectiveIndex, amount) {
    this.progress[objectiveIndex] = Math.min(
      this.progress[objectiveIndex] + amount,
      this.objectives[objectiveIndex].target
    );
    this.checkCompletion();
  }

  checkCompletion() {
    this.isCompleted = this.progress.every(
      (p, i) => p >= this.objectives[i].target
    );
  }
}

const questDatabase = {
  1: new Quest(
    1,
    "Slime Extermination",
    "Defeat 5 slimes that have been troubling the town.",
    [{ description: "Defeat Slimes", target: 5 }],
    { exp: 50, gold: 100 }
  ),
  2: new Quest(
    2,
    "Herb Collection",
    "Collect 3 healing herbs for the town's apothecary.",
    [{ description: "Collect Healing Herbs", target: 3 }],
    { exp: 30, gold: 50, item: "Potion of Strength" }
  ),
  // Add more quests as needed
};

function startQuest(questId) {
  const quest = questDatabase[questId];
  if (quest && !gameState.quests.some((q) => q.id === questId)) {
    gameState.quests.push(quest);
    updateUI({
      text: `New quest accepted: ${quest.title}\n${quest.description}`,
      buttons: [{ text: "Continue", action: "closeQuestDialog" }],
    });
  }
}

function updateQuestProgress(questId, objectiveIndex, amount) {
  const quest = gameState.quests.find((q) => q.id === questId);
  if (quest) {
    quest.updateProgress(objectiveIndex, amount);
    if (quest.isCompleted) {
      completeQuest(quest);
    }
  }
}

function completeQuest(quest) {
  gameState.player.gainExp(quest.rewards.exp);
  gameState.gold += quest.rewards.gold;
  if (quest.rewards.item) {
    addToInventory(quest.rewards.item);
  }
  updateUI({
    text: `Quest completed: ${quest.title}\nRewards: ${
      quest.rewards.exp
    } EXP, ${quest.rewards.gold} Gold${
      quest.rewards.item ? `, ${quest.rewards.item}` : ""
    }`,
    buttons: [{ text: "Continue", action: "closeQuestDialog" }],
  });
  gameState.quests = gameState.quests.filter((q) => q.id !== quest.id);
}
