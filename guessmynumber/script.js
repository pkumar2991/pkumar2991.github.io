'use strict';

const generateSecretNumber = () => {
    return Number(Math.trunc(Math.random()*20) + 1);
};

let score = 20;
let highScore = 0;
let secretNumber = generateSecretNumber();
const displayMessage = (message) =>{
    document.querySelector('.message').textContent = message;
}
const displayNumber = (number) => {
    document.querySelector('.number').textContent = number;
}
const startGame = () =>{
    const guess = Number(document.querySelector('.guess').value);
    // disable check button if user has lost the game
    if(!guess){
        displayMessage('⛔ No Number!');
    }
    else if(guess == secretNumber){
        document.querySelector('body').style.backgroundColor='#60b347';
        document.querySelector('.number').style.width='30rem';
        displayNumber(guess);
        displayMessage('🎉 Correct Number!');
        if(score > highScore){
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }else if(score > 0){
        displayMessage( guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        if(score === 0){
            displayMessage('💥 You lost the game!');
        }
        score--;
        document.querySelector('.score').textContent = score;
    }
}
const resetGame = () =>{
    score = 20;
    secretNumber = generateSecretNumber();
    document.querySelector('.score').textContent = score;
    displayMessage('Start guessing...');
    document.querySelector('.guess').value='';
    document.querySelector('body').style.backgroundColor='#222';
    document.querySelector('.number').style.width='15rem';
    displayNumber('?');
}
document.querySelector('.check').addEventListener('click', function(){
   startGame();
})
document.querySelector('.again').addEventListener('click',function(){
    resetGame();
});