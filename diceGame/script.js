'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--0');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.getElementById('rollBtn');
const btnHold = document.getElementById('holdBtn');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const modalCloseBtn = document.querySelector('.close');
// Initalizing the game
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

let activePlayer = 0; // active player is 0 and another player with 1
let currentScore = 0;
let scores = [0,0];

const switchPlayer = () =>{
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;
    activePlayer = activePlayer == 1 ? 0 : 1;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

// Dice functionality
btnRoll.addEventListener('click',()=>{
    // Generate random number
    const diceValue = Math.trunc(Math.random()*6)+1;
   
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;

    if(diceValue !== 1){
        currentScore +=diceValue;
        document.getElementById(`current--${activePlayer}`)
            .textContent = currentScore;
    }else{
        switchPlayer();
    }
});
// Hold functionality
btnHold.addEventListener('click',()=>{
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100){
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        dice.classList.add('hidden');
        btnRoll.disabled = true;
        btnHold.disabled = true;
        let playerName = activePlayer === 0 ? 'Player 1' : 'Player 2';
        document.querySelector('.message').textContent=`💥Hurray! ${playerName} won the game! 🎉`;
        document.querySelector('.modal').classList.remove('hidden');
        document.querySelector('.overlay').classList.remove('hidden');
    }else{
        switchPlayer();
    }
    
});
// Start new game
btnNew.addEventListener('click',()=>{
    currentScore = 0;
    scores = [0,0];
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer = 0;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    btnRoll.disabled = false;
    btnHold.disabled = false;
});
// Close the modal
modalCloseBtn.addEventListener('click',()=>{
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
});