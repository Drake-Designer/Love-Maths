'use strict';

/** Initializes the game when the DOM is fully loaded. */
document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'submit') {
        checkAnswer();
      } else {
        let gameType = this.getAttribute('data-type');
        runGame(gameType);
      }
    });
  }

  document.getElementById('answer-box').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  runGame('addition');
});

/** The main game "loop", called when the script is fully loaded
 * and after the user's answer ha been processed.
 */

function runGame(gameType) {
  document.getElementById('answer-box').focus();

  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === 'addition') {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === 'subtract') {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === 'multiply') {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === 'division') {
    displayDivisionQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/** Checks the user's answer and, if it is incorrect, shows the correct result. */

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);

  if (isNaN(userAnswer)) {
    alert('Please enter a valid number!');
    return;
  }

  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer;

  if (isCorrect) {
    alert('Correct! :D');
    incrementScore();
  } else {
    alert(`Incorrect Answer! The result is not ${userAnswer}. The correct answer is ${calculatedAnswer} :(`);
    incrementWrongAnswer();
  }

  let operator = document.getElementById('operator').textContent;
  let gameType;
  if (operator === '+') gameType = 'addition';
  else if (operator === '-') gameType = 'subtract';
  else if (operator === '*') gameType = 'multiply';
  else if (operator === '/') gameType = 'division';

  document.getElementById('answer-box').value = '';

  runGame(gameType);
}

/** Reads the operator ( + - * / ) and the numbers displayed on the screen
 * and returns the correct result. */

function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').textContent);
  let operand2 = parseInt(document.getElementById('operand2').textContent);
  let operator = document.getElementById('operator').textContent;

  if (operator === '+') {
    return operand1 + operand2;
  } else if (operator === '-') {
    return operand1 - operand2;
  } else if (operator === '*') {
    return operand1 * operand2;
  } else if (operator === '/') {
    if (operand2 === 0) {
      alert('Division by zero is not allowed!');
      throw 'Division by zero. Aborting';
    }
    return Math.floor(operand1 / operand2);
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting`;
  }
}

/** Increments the score when the user gives the correct answer. */
function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').textContent);
  document.getElementById('score').textContent = ++oldScore;
}

/** Increments the wrong answer score when the user gives an incorrect answer. */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById('incorrect').textContent);
  document.getElementById('incorrect').textContent = ++oldScore;
}

/** Displays an addition question with the given operands. */
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '+';
}

/** Displays a subtraction question with the given operands. */
function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '-';
  if (operand1 < operand2) {
    [operand1, operand2] = [operand2, operand1];
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
  }
}

/** Displays a multiplication question with the given operands. */
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '*';
}

/** Displays a division question with the given operands. */
function displayDivisionQuestion(operand1, operand2) {
  let dividend = operand1 * operand2;
  document.getElementById('operand1').textContent = dividend;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '/';
}
