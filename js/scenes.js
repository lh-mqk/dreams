// Scene management system
const scenes = {
  // Define your scenes here
  battlefield: {
    image: "battlefield.png",
    text: "You encounter a monster!",
    buttons: [
      { text: "Fight", action: "startBattle" },
      { text: "Run", action: "runFromBattle" },
    ],
  },
  startScreen: {
    image: "D1_M1.jpg",
    text: "Welcome to the JRPG! Press Start to begin your adventure.",
    buttons: [
      { text: "Start", action: "startGame" },
      { text: "Load Game", action: "loadGame" },
    ],
  },
  townSquare: {
    image: "town_square.png",
    text: "You are in the town square. Where would you like to go?",
    buttons: [
      { text: "Shop", action: "goToShop" },
      { text: "Inn", action: "goToInn" },
      { text: "Leave Town", action: "leaveTown" },
    ],
  },
  // Add more scenes as needed
};

function loadScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) {
    console.error(`Scene "${sceneKey}" not found`);
    return;
  }

  updateGameState({ currentScene: sceneKey });
  updateUI(scene);
}

function handleSceneAction(action) {
  switch (action) {
    case "startGame":
      startNewGame();
      break;
    case "loadGame":
      // Implement load game functionality
      break;
    case "goToShop":
      // Implement shop scene
      break;
    case "goToInn":
      // Implement inn scene
      break;
    case "leaveTown":
      loadScene("battlefield");
      break;
    case "startBattle":
      const monster = getRandomMonster(gameState.player.level);
      startBattle(monster);
      break;
    case "runFromBattle":
      if (Math.random() < 0.5) {
        loadScene("townSquare");
      } else {
        updateUI({
          text: "Couldn't escape! The battle begins!",
          buttons: [{ text: "Continue", action: "startBattle" }],
        });
      }
      break;
    case "continueBattle":
      loadScene("townSquare");
      break;
    case "attack":
    case "defend":
    case "useItem":
    case "run":
      handleBattleAction(action);
      break;
    case "nextStoryEvent":
      progressStory();
      break;
    case "closeQuestDialog":
      loadScene(gameState.currentScene);
      break;
    default:
      if (action.startsWith("quest_")) {
        const questId = parseInt(action.split("_")[1]);
        startQuest(questId);
      } else {
        handleStoryChoice(action);
      }
  }
}
