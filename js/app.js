/*
 * Create a list that holds all of your cards
 */

let   openedCards = [],
      matchedCards = [];
      
    


const iconsList = ["fa fa-diamond", "fa fa-bolt",
    "fa fa-paper-plane-o", "fa fa-cube",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-leaf",
    "fa fa-cube", "fa fa-paper-plane-o",
    "fa fa-leaf", "fa fa-diamond",
    "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb",
];




const cardsContainer = document.querySelector(".deck");    


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


let isFirstClick= false;
// click card event
function click(card) {

    if(isFirstClick){
        
        startTimer();

        isFirstClick = false;
    }


    card.addEventListener('click', function() {

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
        isOver();

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
    moves++;


}





/*
* add Moves
*/

const movesContainer = document.querySelector(".moves");
movesContainer.innerHTML = 0;
let moves = 0;
function addMove (){
  moves++;
  movesContainer.innerHTML = moves;

  //set rating
  rating();
}



// Is game over ?
function isOver() {
    if (matchedCards.length === iconsList.length || moves >= 30) {
        // popup when you game over
        alert('Game Is Over, Try Again?');

        //stop the time
        resetGame();
    }
}

/*
* Rating
*/

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else if (moves < 25 ) {
        starsContainer.innerHTML = star;

    } else {

        isOver();

    }
        
}


/*
 * timer 
 */

const timerContainer = document.querySelector(".timer")
let liveTimer, 
    totalSeconds = 0;

timerContainer.innerHTML = totalSeconds;

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
    clearInterval(liveTimer);
}


/*
* restart button
*/

const restartBtn = document.querySelector (".restart");
restartBtn.addEventListener("click", function(){

    //delete all cards
    cardsContainer.innerHTML = "";

    //call init to create new cards
    init();

    //reset any related variables
    matchedCards = [];
    moves = 0 ;
    movesContainer.innerHTML = moves;


    //reset the game
    resetGame ();



})

function  resetGame(){

    matchedCards = [];
    moves=0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML =  star + star + star;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;
    


 }


init();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



