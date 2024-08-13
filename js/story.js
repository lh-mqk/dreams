const storyEvents = {
  introduction: {
    text: "Welcome to the world of Aethoria! You are a young adventurer setting out on a grand journey. Your first stop is the town of Millennia.",
    nextEvent: "arriveInTown",
  },
  arriveInTown: {
    text: "You arrive in Millennia, a bustling town full of opportunities for a novice adventurer.",
    nextEvent: "meetMayor",
  },
  meetMayor: {
    text: "The town's mayor greets you and tells you about the recent troubles with slimes in the nearby fields.",
    action: () => {
      startQuest(1);
      gameState.currentScene = "townSquare";
    },
    nextEvent: "exploreTown",
  },
  exploreTown: {
    text: "You're free to explore the town. Where would you like to go?",
    choices: [
      { text: "Visit the Shop", action: "goToShop" },
      { text: "Go to the Inn", action: "goToInn" },
      { text: "Leave Town", action: "leaveTown" },
    ],
  },
  // Add more story events as needed
};

let currentStoryEvent = "introduction";

function progressStory() {
  const event = storyEvents[currentStoryEvent];
  updateUI({
    text: event.text,
    buttons: event.choices || [{ text: "Continue", action: "nextStoryEvent" }],
  });

  if (event.action) {
    event.action();
  }

  if (event.nextEvent) {
    currentStoryEvent = event.nextEvent;
  }
}

function handleStoryChoice(choice) {
  const event = storyEvents[currentStoryEvent];
  const chosenAction = event.choices.find((c) => c.text === choice);
  if (chosenAction) {
    handleSceneAction(chosenAction.action);
  }
}
