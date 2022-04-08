// Game buttons
var gameBtns = document.querySelectorAll(".game-button");
var userChoices = [];
var gamePattern = [];
var delay = 5000;

function playTurn() {
  let step = 0;
  userChoices = [];
  gamePattern.push(chooseRandomButton());
  const turn = setInterval(() =>{
    let id = gamePattern[step];
    activateButton(id);
    step++;
    if(step >= gamePattern.length){
      clearInterval(turn);
    }
  },1000);
  setTimeout(()=>{
    if(validatePattern()){
      playTurn();
    } else {
      console.log("Lose");
    }
  }, (step + 1) * delay);
}

function activateButton(id) {
  const elem = document.getElementById(id);
  const origBg = elem.style.backgroundColor;
  setTimeout(()=>{
    elem.style.backgroundColor = "#FFF";
    // Get a specific attribute from clicked element
    const data = elem.getAttribute("data-button");
    // Get the audio element with that attribute
    const sound = document.querySelector(`[data-sound='${data}']`);
    // Actually play the sound selected
    sound.play();
  },500);
  setTimeout(()=> {
    elem.style.backgroundColor = origBg;
  },750);
}

// Get all of the IDs of possible buttons
const elements = Array.from(gameBtns).map(btn => {
  // Return an individual id to add to the element array
  return btn.id;
});

// Function returning one random ID when called
const chooseRandomButton = () => {
  // Generate a random number between 0 and 3 to choose
  // correct "index" from array
  let choice = Math.floor(Math.random() * elements.length);
  return elements[choice];
}


const validatePattern = () => {
  if(userChoices.length !== gamePattern.length) return false;
  for(var i=0; i < userChoices.length; i++){
    if(userChoices[i] !== gamePattern[i]) return false;
  }
  return true;
}

// For every game button
gameBtns.forEach(elem => {
  // For one particular game button
  elem.addEventListener("click", (evt)=>{
    // Display the ID of that clicked element in console
    let source = evt.target.id;
    userChoices.push(source);
    // Call visual activation
    activateButton(source);
    // Get a specific attribute from clicked element
    const data = elem.getAttribute("data-button");
    // Get the audio element with that attribute
    const sound = document.querySelector(`[data-sound='${data}']`);
    // Actually play the sound selected
    sound.play();
  });
});

// Start button to start game

var startBtn = document.getElementById("start-button");

// Handle click on start button
startBtn.addEventListener("click", () => {
  // Reset points to 0
  document.getElementById("points").innerText = "Points: 0";
  // Reset userChoices to restart game
  userChoices = [];
  gamePattern = [];
  playTurn();
});
