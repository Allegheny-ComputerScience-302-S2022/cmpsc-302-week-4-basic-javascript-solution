// Game buttons
var gameBtns = document.querySelectorAll(".game-button");
var userChoices = [];
var gamePattern = [];
var points = 0;
// Set delay for user response
const delay = 2000; // <-- 7 seconds

function playTurn() {
  let level = 0;
  userChoices = [];
  // Begin computer part of turn
  gamePattern.push(chooseRandomButton());
  const turn = setInterval(() =>{
    let id = gamePattern[level];
    activateButton(id);
    level++;
    if(level >= gamePattern.length){
      clearInterval(turn);
    }
  },1000);
  // Player's part of turn
  setTimeout(() =>{
      if(validatePattern()){
        playTurn();
        points++;
        document.getElementById("points").innerText = `Points: ${points}`;
      } else {
        const sound = document.querySelector(`[data-sound='lose']`);
        // Actually play the sound selected
        sound.play();
        console.log("YOU LOSE!");
      }
  }, gamePattern.length * delay);
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
  document.getElementById("points").innerText = `Points: ${points}`;
  // Reset userChoices to restart game
  userChoices = [];
  gamePattern = [];
  playTurn();
});
