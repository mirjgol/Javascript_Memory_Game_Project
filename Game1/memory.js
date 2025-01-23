import cards from "./cards.js";


// Selectors

const gridContainer = document.querySelector(".grid-container-cards");

const congratsScreen = document.querySelector(".concrats-screen");

const congratsScreenContent = document.querySelector("p");

const congratsScreenButton = document.querySelector ("button");



let flippedCards = [];

let matchedCards= [];




const startGame = () => {
  // 8 random card fronts holen
  const fronts = cards.sort(()=> 0.5 - Math.ramdom()).SLICE(0, 8);

  // verdopple die Karten, mischle und add to grid container

  gridContainer.innerHTML = [...fronts, ...fronts].map(({name, image}) =>{
    const card = document.createElement("div");
    card.className = "card flipped";
    card.dataset.name = name;
    card.innerHTML = ` <img src="assets/memory-back.svg" class="back" alt="Cover of Memory Deck showing a speech bubble  ">
      <img src="${image}" alt="${name}" class="front">`;

      return card.outerHTML;
  })
  .sort(()=> 0.5 - Math.ramdom())
  .join("");


};

const flipCard = (card) => {
  const isCardFlipped = card.classList.contains("flipped");

  // check if current card is not flipped and there are less than two flipped cards

  if(!isCardFlipped && flippedCards.length < 2) {
 //add current card to flipped cards
 card.classList.add("flipped");
 flippedCards.push(card);

 // wenn 2 flipped cards mach vergleich : is there a match?

 if(flippedCards.length === 2) {
  //add 5s delay for flip transition to finish
  setTimeout(checkMatch, 500);
 }
  }
}

const checkMatch = () => {
  ///*************************ab HIER weitermachen bei 12.45!!!!!!!!!!*************** */
}




const initMemoryApp= () => {
  startGame();

  // Event Listener

gridContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  card && flipCard(card);
});

};






// initialize Game

initMemoryApp();


