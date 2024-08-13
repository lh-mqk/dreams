// UI management
function updateUI(sceneData) {
  updateSceneImage(sceneData.image);
  updateScriptDisplay(sceneData.text);
  updateButtons(sceneData.buttons);
}

function updateSceneImage(imageSrc) {
  const sceneImage = document.getElementById("scene-image");
  sceneImage.style.backgroundImage = `url('assets/${imageSrc}')`;
}

function updateScriptDisplay(text) {
  const scriptDisplay = document.getElementById("script-display");
  scriptDisplay.textContent = text;
}

function updateButtons(buttons) {
  const buttonContainer = document.getElementById("button-container");
  buttonContainer.innerHTML = "";

  buttons.forEach((button) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = button.text;
    buttonElement.addEventListener("click", () =>
      handleSceneAction(button.action)
    );
    buttonContainer.appendChild(buttonElement);
  });
}

function showInventory() {
  // Implement inventory display
}

function showStatus() {
  // Implement character status display
}

function showDialog(text, options) {
  // Implement dialog box for conversations or choices
}
