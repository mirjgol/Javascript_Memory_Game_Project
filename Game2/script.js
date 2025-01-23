

// Selektoren :

const cards = document.querySelectorAll(".memory-card");
const scoreText = document.querySelector(".score");
const failsText = document.querySelector(".fails");
const looseMessage = document.querySelector(".loose-container");
const winMessage = document.querySelector(".win-container");
const buttonLoose = document.querySelector(".retry");
const buttonWin = document.querySelector(".again");
const scoreLoose = document.querySelector(".score-loose");
const timerContent= document.querySelector(".timer"); 
const scoreTimeLoose= document.querySelector(".score-time-loose");
const scoreTimeWin= document.querySelector(".score-time-win");
const rulesWindow = document.querySelector(".rules-container");
const buttonRules = document.querySelector(".rules-button");
const closeRules = document.querySelector(".close-button");

//rules






let hasFlippedCard = false; // for matching
let lockBoard = false; // damit nicht mehr als 2 karten aufgedeckt werden können
let firstCard, secondCard; // for matching, Wert später zuweisen
 let score = 0;
 let fails = 0;


 //timer variablen

 let timerInterval;
 let timePassed = 0; // verstrichene Zeit
 let isTimerRunning = false; // damit er nur 1x startet

// start timer
function startTimer(){
if (isTimerRunning) return;
isTimerRunning = true;
timePassed = 0; // reset passed time
timerInterval = setInterval(() => {
  timePassed++;
  timerContent.innerText = `Time: ${timePassed}s`;
},1000);
}


//stop timer funktion

function stopTimer(){
  clearInterval(timerInterval); // stops timer
  isTimerRunning = false;
  }

  //function reset timer

  function resetTimer(){
    stopTimer();
    timePassed=0;
    timerContent.innerText = `Time: ${timePassed}s`;
  }

// wenn clicked, class "flip" will be added to element (this --> geklickte Karte)
function flipCard(){
  if (!isTimerRunning){
    startTimer(); // bei der ersten umgedrehten karte
  }
if (lockBoard) return;

if (this === firstCard) return; // verhindert, dass eine Karte bei 2x anklikken einen Match ergibt und event listener entfernt wird

  this.classList.add("flip");
// finds if first card is flipped
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return; // return: ends function ausführung
  }

secondCard = this;


checkForMatch();
gameOver();









}
//check for match , compare cards function
function checkForMatch() {
  if (firstCard.dataset.background === secondCard.dataset.background 
  // if its a heart
&& firstCard.dataset.background != "heart"){

 
  
  
    
    disableCards();
    score += 1;
     scoreText.innerText = `Score:${score}`;
    // updateScore();
    // changeScore():
   

  

  if(score === 6){
    stopTimer();
    winMessage.classList.add("visible");
    scoreTimeWin.innerText = `${timePassed}s`;
  }

  // return;// not needed?


//if no match: 
}else {
  unflipCards();
  displayError();
} 
}

function displayError(){

if (firstCard.dataset.background === "heart") {
  fails += 1;
  failsText.innerText = `Hearts:${fails}`;
  // toggle message : "Bad luck, you found a heart"
  
}
if (secondCard.dataset.background === "heart") {
  fails += 1;
  failsText.innerText = `Hearts:${fails}`;
  // toggle message : "Bad luck, you found a heart"
 
}


}


//game over message:

function gameOver(){
  if (fails >= 5){
    stopTimer();
    looseMessage.classList.add("visible");
    scoreLoose.innerText = `${fails}`;
    scoreTimeLoose.innerText = `${timePassed}s`;
   

  }
}






// restart game funktion:

function restartGame(){
  resetTimer();
  
  score = 0;
  fails = 0;
  hasFlippedCard = false;
  lockBoard = false;


  //visible class entfernen, Scores zurücksetzen:

  scoreText.innerText = `Cat Pairs:${score}`;
  failsText.innerText = `Hearts:${fails}`;
  looseMessage.classList.remove("visible");
  winMessage.classList.remove("visible");

  cards.forEach(card=>{
    card.classList.remove("flip");
    // warum nochmals eventlistener???
    card.addEventListener("click",flipCard);
  });

  shuffle();


}











// entferne flip(eventListener)bei gefundenen paaren

function disableCards() {

  firstCard.removeEventListener("click",flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

}



// nich passende Karten , wieder umdrehen entferne "flip" class mit einem Timeout dazwischen
function unflipCards () {
  lockBoard = true;
  setTimeout (()=> {
firstCard.classList.remove("flip");
secondCard.classList.remove("flip");
// lockBoard = false;
resetBoard();
  }, 1500);

}

//reset the Board 

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false,false];
  [firstCard, secondCard] = [null, null];
}

// shuffle the cards:

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}) ();


// add event listener to restart button:

buttonWin.addEventListener("click",restartGame);
buttonLoose.addEventListener("click",restartGame);

//rules

buttonRules.addEventListener("click", (event) => {
 rulesWindow.classList.add("visible");
});

closeRules.addEventListener("click", (event) => {
 rulesWindow.classList.remove("visible");
});



// add EventListener to all cards:

cards.forEach(card => card.addEventListener("click", flipCard));

// squares in the background
let squares = []

class Square {

constructor(){ // blueprint der properties
  this.x = Math.floor (Math.random()*window.innerWidth);
  this.y = Math.floor (Math.random()*window.innerHeight);
  this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  this.size = Math.floor(Math.random()*14)
}

show () { // funktion die die squares zeichnen soll
  const element = document.createElement("div");
  element.classList.add("square");
  element.style.left = `${this.x}px`;
  element.style.top = `${this.y}px`;
  element.style.backgroundColor = this.color;
  element.style.width = `${this.size}px`;
  element.style.height = `${this.size}px`;

  document.querySelector(".field").append(element)


}

}




for ( let i = 0; i<100; i++) {
  squares.push(new Square());
  squares[i].show();

}




