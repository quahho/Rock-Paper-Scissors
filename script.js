const resetLink = document.querySelector('#reset');

resetLink.addEventListener('click', () => {
    window.location.reload();
});

const buttons = document.querySelectorAll('.choice');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playRound(button.id, computerPlay());
    });
});

function toggleEnlarge() {
    const buttons = document.querySelectorAll('.choice');
    buttons.forEach((button) => {
        button.classList.toggle('enlarge');
    });
}

function highlightPlayerChoice(selection) {
    let buttonId = `#${selection}`;
    const button = document.querySelector(buttonId);
    button.style.backgroundColor = 'darkgrey'; 
}

function highlightComputerChoice(selection) {
    let buttonId = `#c${selection}`;
    const button = document.querySelector(buttonId);
    button.style.backgroundColor = 'darkgrey'; 
}

function clearHighlight() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
        button.style.backgroundColor = 'beige';
    });
}

function getPlayerCurrentPoint() {
    const currentScore = document.querySelector('#ppoint');
    return +(currentScore.textContent);
}

function getComputerCurrentPoint() {
    const currentScore = document.querySelector('#cpoint');
    return +(currentScore.textContent);
}

function setPoint(winner) {
    if (winner === 'player') {
        const currentScore = document.querySelector('#ppoint');
        newScore = +(currentScore.textContent) + 1;
        currentScore.textContent = newScore;
    }
    else if (winner === 'computer') {
        const currentScore = document.querySelector('#cpoint');
        newScore = +(currentScore.textContent) + 1;
        currentScore.textContent = newScore;
    }
}

function setCurrentTie() {
    let playerScore = getPlayerCurrentPoint();
    let computerScore = getComputerCurrentPoint();
    let status;

    if (playerScore > computerScore) {
        status = 'You are currently ahead.';
    }
    else if (playerScore < computerScore) {
        status = 'You are trailing behind.';
    }
    else {
        status = 'All square right now.';
    }

    const button = document.querySelector('#progress-button');
    button.id = 'message';
    button.textContent = status;
}

function setCurrentMessage() {
    const label = document.querySelector('#result');
    label.textContent = 'The battle continues...';
}

function setResult(result) {
    const label = document.querySelector('#result');
    label.textContent = result;
}

function setOverallResult(endResult) {
    const button = document.querySelector('#progress-button');
    button.id = 'overall-result';
    button.textContent = endResult;
}

function refreshRound() {
    if (!newRound) {
        clearHighlight();
        toggleEnlarge();
        setCurrentMessage();
        setCurrentTie();
        newRound = true;
    }
}

function setNextRoundButton() {
    const button = document.querySelector('#message');
    button.id = 'progress-button';
    button.textContent = 'Next Round';
    button.addEventListener('click', refreshRound);
}

function clearNextRoundButton() {
    const button = document.querySelector('#progress-button');
    button.removeEventListener('click', refreshRound);
}

function checkEndGame() {
    let playerScore = getPlayerCurrentPoint();
    let computerScore = getComputerCurrentPoint();
    let endResult;

    if (playerScore === 5) {
        clearNextRoundButton();
        endResult = "GAME OVER : You are the winner.";
        setOverallResult(endResult);
        gameEnded = true;
    }
    else if (computerScore === 5) {
        clearNextRoundButton();
        endResult = "GAME OVER : You are the loser.";
        setOverallResult(endResult);
        gameEnded = true;
    }
    else {
        return;
    }
}

function computerPlay() {
    const choices = ["rock", "paper", "scissors"]
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

let newRound = true;

function playRound(playerSelection, computerSelection) {
    if (!newRound) {
        return;
    }

    newRound = false;
    toggleEnlarge();

    highlightPlayerChoice(playerSelection);
    highlightComputerChoice(computerSelection);

    let result;
    let winner;
    let playerChoice = playerSelection.slice(1);

    if (playerChoice === "rock") {
        switch (computerSelection) {
            case "paper":
                result = "You Lose! Paper beats Rock.";
                winner = "computer";
                break;
            case "scissors":
                result = "You Win! Rock beats Scissors.";
                winner = "player";
                break;
            default:
                result = "It's a Draw! Rock with Rock.";
                break;
        }
    }
    else if (playerChoice === "paper") {
        switch (computerSelection) {
            case "scissors":
                result = "You Lose! Scissors beats Paper.";
                winner = "computer";
                break;
            case "rock":
                result = "You Win! Paper beats Rock.";
                winner = "player";
                break;
            default:
                result = "It's a Draw! Paper with Paper.";
                break;
        }
    }
    else if (playerChoice === "scissors") {
        switch (computerSelection) {
            case "rock":
                result = "You Lose! Rock beats Scissors.";
                winner = "computer";
                break;
            case "paper":
                result = "You Win! Scissors beats Paper.";
                winner = "player";
                break;
            default:
                result = "It's a Draw! Scissors with Scissors.";
                break;
        }
    }

    setPoint(winner);
    setResult(result);
    setNextRoundButton();
    checkEndGame();
}
