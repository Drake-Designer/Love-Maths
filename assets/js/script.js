document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'submit') {
        alert('You clicked the submit button!');
      } else {
        let gameType = this.getAttribute('data-type');
        alert(`You clicked a button of type: ${gameType}`);
      }
    });
  }
});
// function runGame() {};

// function checkAnswer() {};

// function calculateCorrectAnswer() {};

// function incrementScore() {};

// function incrementWrongAnswer() {};

// function displayAdditionQuestion() {};

// function displaySubtractQuestion() {};

// function displayMultiplyQuestion() {}
