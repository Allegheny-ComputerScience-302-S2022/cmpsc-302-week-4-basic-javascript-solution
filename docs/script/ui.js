let choices = Array();
let points = 0;
let locked = true;
let pattern = [];
let winning = true;
let delay = 5000;

function generatePattern() {
  const buttons = ["top-left","top-right","bottom-left","bottom-right"];
  let choice = Math.floor(Math.random() * buttons.length);
  return buttons[choice];
}

function checkPatterns(){
  if(choices.length !== pattern.length) return false;
  for(var i = 0; i < pattern.length; i++){
    if(pattern[i] !== choices[i]) return false;
  }
  return true;
}

function activateButton(id) {
  const elem = document.getElementById(id);
  const data = elem.getAttribute("data-button");
  origBg = elem.style.backgroundColor;
  setTimeout(function(){
    const sound = document.querySelector(`[data-sound='${data}']`);
    sound.play();
    elem.style.backgroundColor = "#FFFFFF";
  },600);
  setTimeout(function(){
    elem.style.backgroundColor = origBg;
  },650);
}

function playbackPattern() {
  let i = 0;
  var replay = setInterval(function() {
    let id = pattern[i];
    console.log(id);
    activateButton(id)
    i++;
    if(i >= pattern.length){
      clearInterval(replay);
    }
  },200);
}

function playerTurn() {
  let level = 1;
  choices = [];
  locked = true;
  pattern.push(generatePattern(level));
  playbackPattern();
  locked = false;
  if(!locked){
    setTimeout(function() {
      if(!checkPatterns()) {
        const sound = document.querySelector(`[data-sound='lose']`);
        for(var i = 0; i < 3; i ++){
          sound.play();
        }
        console.log(pattern);
        console.log(choices);
      } else {
        level += 1;
        points += 1;
        document.getElementById("points").innerText = "Points: " + points;
        playbackPattern();
        playerTurn();
      }
    },level * delay);
  }
}

document.getElementById("start-button").addEventListener('click', () => {
  let pointDisplay = document.getElementById("points")
  pointDisplay.innerText = "Points: " + 0;
  pattern = [];
  playerTurn();
});

document.querySelectorAll(".game-button").forEach(elem => {
  elem.addEventListener('click', function(e) {
    if(!locked){
      choices.push(e.target.id);
      activateButton(e.target.id);
    }
  });
});
