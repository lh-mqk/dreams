function saveGame() {
  const saveData = {
    player: gameState.player,
    inventory: gameState.inventory,
    quests: gameState.quests,
    gold: gameState.gold,
    currentScene: gameState.currentScene,
    currentStoryEvent: currentStoryEvent,
  };

  localStorage.setItem("jrpgSaveData", JSON.stringify(saveData));
  console.log("Game saved successfully");
}

function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("jrpgSaveData"));
  if (saveData) {
    gameState.player = Object.assign(new Character(), saveData.player);
    gameState.inventory = saveData.inventory;
    gameState.quests = saveData.quests.map((q) =>
      Object.assign(new Quest(), q)
    );
    gameState.gold = saveData.gold;
    gameState.currentScene = saveData.currentScene;
    currentStoryEvent = saveData.currentStoryEvent;

    console.log("Game loaded successfully");
    return true;
  }
  console.log("No save data found");
  return false;
}

function hasSaveData() {
  return localStorage.getItem("jrpgSaveData") !== null;
}
