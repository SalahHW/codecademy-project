const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();
  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
    return userInput;
  } else {
    console.log('You have to choose either rock, paper or scissors!')
  }
}

const getComputerChoice = () => {
 const computerChoice = Math.floor(Math.random() * 3)
 if (computerChoice === 0){
   return 'rock';
 } else if (computerChoice === 1){
   return 'paper';
 } else if (computerChoice === 2){
   return 'scissors';
 } else {
   return 'error';
 }
}

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 'The game was a tie.';
  }
  if (userChoice === 'rock') {
    if(computerChoice === 'paper'){
      return 'The computer won...';
    } else {
      return 'You won !';
    }
  }
  if (userChoice === 'paper'){
    if(computerChoice === 'scissors'){
      return 'The computer won...';
    } else {
      return 'You won !';
    }
  }
  if (userChoice === 'scissors'){
    if(computerChoice === 'rock'){
      return 'The computer won...';
    } else {
      return 'You won !';
    }
  }
  if (userChoice === 'bomb'){
    return 'YOU WOOOOOON !!!';
  }
}

const playGame = () => {
  let userChoice = getUserChoice('bomb');
  let computerChoice = getComputerChoice();
  console.log(`You choose ${userChoice} and the computer choosed ${computerChoice}`)
  console.log(determineWinner(userChoice, computerChoice))
}

playGame();