/*
* Create a list that holds all of your cards
*/
     
const cardsContainer = document.querySelector(".deck");
let   openedCards = [],
     matchedCards = [];
const restartBtn = document.querySelector (".restart");
let moves = 0;
rateHTML = '';
   

const movesContainer = document.querySelector(".moves");
movesContainer.innerHTML = 0;
const timerContainer = document.querySelector(".timer")
let liveTimer, totalSeconds = 0;
timerContainer.innerHTML = totalSeconds;
let isFirstClick= true;
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
rateContainer = document.querySelector('#total_rate');


const iconsList = ["fa fa-diamond", "fa fa-bolt",
   "fa fa-paper-plane-o", "fa fa-cube",
   "fa fa-anchor", "fa fa-anchor",
   "fa fa-bolt", "fa fa-leaf",
   "fa fa-cube", "fa fa-paper-plane-o",
   "fa fa-leaf", "fa fa-diamond",
   "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb",
];

// create the cards
function init() {


       const icons = shuffle(iconsList);
   

       for (let i = 0; i < icons.length; i++) {

       const card = document.createElement("li");
       card.classList.add("card");
       card.innerHTML = "<i class=" + "'fa " + icons[i] + "'></i>";
       cardsContainer.appendChild(card);
       click(card);

}


}

function shuffle(array) {
   var currentIndex = array.length,
       temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}


// click card event
function click(card) {

card.addEventListener('click', function() {
           if(isFirstClick){
               
               startTimer();

               isFirstClick = false;
           }
     const currentCard = this;
     const previousCard = openedCards[0];

       // we have existing opened cards
       if (openedCards.length === 1) {

           card.classList.add("open", "show", "disable");
           openedCards.push(this);

           //we should compare our two cards
           compare(currentCard, previousCard);
           
       } else {  
           // we don't have any opened cards
           card.classList.add("open", "show", "disable");
           openedCards.push(this);
       }

   });

}

/*
* compare
*/

function compare(currentCard, previousCard) {

    //matcher
   if (currentCard.innerHTML === previousCard.innerHTML) {

       // matched cards
       currentCard.classList.add("match");
       previousCard.classList.add("match");

       matchedCards.push(currentCard, previousCard);

       openedCards = [];

       //check if the game is over!

   } else {
       //NOT matched cards

       // wait 500ms then do this!
       setTimeout(function() {
           currentCard.classList.remove("open", "show", "disable");
           previousCard.classList.remove("open", "show", "disable");
          

       }, 500);

       openedCards = [];
   }

   //add new moves
   addMove();
   isOver();
   wonTheGame();
}

/*
* add Moves
*/


function addMove (){
 moves++;
 movesContainer.innerHTML = moves;

 //set rating
 rating();
}


// Check if game is over
function isOver() {
    if (iconsList.length === matchedCards.length) {
      wonTheGame();
    }
  }


    // Display Modal if player won!.
    
    function modal() {
        const modal = document.getElementById('modal');
        modal.classList.add('show');
        
    }



// Display message when game is over
function wonTheGame() {

    stopTimer();
  
    // Display the message
    message.style.top = '0';
  
    // Add moves to message
    const totalMoves = document.querySelector('#total_moves');
    totalMoves.innerHTML = moves + 1; // + 1 is a workaround because somehow moves returns the count -1
  
    // Add rating
    rateContainer.innerHTML = rateHTML;
  
    // Add time to message
    // const totalHours = document.querySelector('#totalHours');
    const totalMinutes = document.querySelector('#total_minutes');
    const totalSeconds = document.querySelector('#total_seconds');
    // totalHours.innerHTML = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;

    reset();
    init();

  
  }




/*
* Rating
*/


function rating() {

   if( moves < 10) {
       starsContainer.innerHTML = star + star + star;
   } else if( moves < 20) {
       starsContainer.innerHTML = star + star;
   } else if (moves < 30 ) {
       starsContainer.innerHTML = star;

   } else {

       isOver();

   }
       
}


/*
* timer 
*/

function startTimer() {

   // Start Incrementer
   incrementer = setInterval(function() {

       // Add totalTime by 1
       totalSeconds += 1;

       // Convert Total Time 
      timerContainer.innerHTML = totalSeconds;
   

       // Change the current time values
       

   }, 1000);
  
}

function calculateTime(totalSeconds) {
   hours   = Math.floor( totalSeconds / 60 / 60);
   minutes = Math.floor( (totalTime / 60) % 60);
   seconds = totalTime % 60;
}

function stopTimer() {
   clearInterval(incrementer);
}



/*
* restart button
*/


restartBtn.addEventListener("click", function(){
   resetGame ();
   init();

})

function  resetGame(){
   openedCards = []
   matchedCards = [];
   moves=0;
   movesContainer.innerHTML = moves;
   starsContainer.innerHTML =  star + star + star;
   totalSeconds = 0;
   timerContainer.innerHTML = totalSeconds;
   cardsContainer.innerHTML = '';
   firstClick = true;
   stopTimer();

}

init();