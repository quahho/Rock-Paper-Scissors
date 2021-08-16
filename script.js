function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"]
    var index = Math.floor(Math.random() * choices.length);
    return choices[index].toUpperCase();
}

function playRound(playerSelection, computerSelection) {
    let result;

    if (playerSelection === "ROCK") {
        switch (computerSelection) {
            case "PAPER":
                result = "You Lose! Paper beats Rock";
                break;
            case "SCISSORS":
                result = "You Win! Rock beats Scissors";
                break;
            default:
                result = "It's a Draw! Rock with Rock";
                break;
        }
    }
    else if (playerSelection === "PAPER") {
        switch (computerSelection) {
            case "SCISSORS":
                result = "You Lose! Scissors beats Paper";
                break;
            case "ROCK":
                result = "You Win! Paper beats Rock";
                break;
            default:
                result = "It's a Draw! Paper with Paper";
                break;
        }
    }
    else {
        switch (computerSelection) {
            case "ROCK":
                result = "You Lose! Rock beats Scissors";
                break;
            case "PAPER":
                result = "You Win! Scissors beats Paper";
                break;
            default:
                result = "It's a Draw! Scissors with Scissors";
                break;
        }
    }

    return result;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let x = 0; x < 5; x++) {
        let userInput = prompt("Rock, Paper or Scissors?");
        let playerSelection = userInput.toUpperCase();

        while (playerSelection !== "ROCK" && playerSelection !== "PAPER" && playerSelection !== "SCISSORS") {
            userInput = prompt("Invalid option. Try again. Rock, Paper or Scissors?");
            playerSelection = userInput.toUpperCase();
        }

        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        console.log(result);

        if (result.includes("Win")) {
            playerScore++;
        }
        else if (result.includes("Lose")) {
            computerScore++;
        }
    }

    switch (true) {
        case playerScore > computerScore:
            console.log(`You are the winner. Overall score ${playerScore}:${computerScore}`);
            break;
        case playerScore < computerScore:
            console.log(`You are the loser. Overall score ${playerScore}:${computerScore}`);
            break;
        default:
            console.log(`It's a stalemate. Overall score ${playerScore}:${computerScore}`);
            break;
    }
}

game();