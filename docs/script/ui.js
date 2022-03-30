let choices = Array();
let points = 0;

function generatePattern() {

}

function playerTurn() {

}

document.getElementById("start-button").addEventListener('click', () => {
  let pointDisplay = document.getElementById("points")
  pointDisplay.innerText = "Points: " + points;
});

document.querySelectorAll(".game-button").forEach(elem => {
  elem.addEventListener('click', () => {
    choices.push(elem.innerText);
  });
});
