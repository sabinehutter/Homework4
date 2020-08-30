// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var score = 0;

// variables to reference DOM elements
var questionsEl = $("#questions");
var timerEl = $("#time");
var choicesEl = $("#choices");
var submitBtn = $("#submit");
var startBtn = $("#start");
var initialsEl = $("#initials");
var feedbackEl = $("#feedback");
var finalScore = $("#final-score")

// variables for screen
var startScreen = $("#start-screen");
var questionScreen = $("#questions");
var endScreen = $("#end-screen")

// question screen variables
var questionTitle = $("#question-title")
var questionChoices = $("#choices")
// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

// scoring
var scoresDictionary = {}


function startQuiz() {
  // hide start screen
  startScreen.hide();
  // un-hide questions section
  questionScreen.removeClass("hide")
  // start timer
  // var counter = setInterval(timer, 1000);

  timerId = setInterval(function () {

    clockTick()
  }, 1000);

  getQuestion();
}

function getQuestion() {
  // get current question object from array

  // update title with current question
  questionTitle.text((questions[currentQuestionIndex].title))
  // clear out any old question choices
  questionChoices.text("")
  // loop over choices
  for (choices in (questions[currentQuestionIndex].choices)) {
    // create new button for each choice
    var choiceButton = $("<button>" + questions[currentQuestionIndex].choices[choices] + "</button>")
    // attach click event listener to each choice
    choiceButton.on("click", questionClick)

    // display on the page
    questionChoices.append(choiceButton)
  }


}

function questionClick() {
  // check if user guessed wrong
  var userAnswer = $(this).text()


  if (questions[currentQuestionIndex].answer === userAnswer) {
    // else 
    // play "right" sound effect
    sfxRight.play()
    feedbackEl.text("Correct")
    feedbackEl.removeClass("hide")
    setTimeout(function () {
      feedbackEl.addClass("hide")
    }, 500);
    // move to next question
    currentQuestionIndex++
    score++

  } else {
    // penalize time
    time = time - 10
    // display new time on page
    timerEl.text(time);
    // play "wrong" sound effect
    sfxWrong.play()
    feedbackEl.text("Incorrect")
    feedbackEl.removeClass("hide")
    setTimeout(function () {
      feedbackEl.addClass("hide")
    }, 500);
    // move to next question
    currentQuestionIndex++

  }
  // check if we've run out of questions

  if (currentQuestionIndex === questions.length) {
    // quizEnd
    quizEnd()
  }
  // else 
  else {
    getQuestion()

  }

}

function quizEnd() {
  // stop timer
  clearInterval(timerId)

  // show end screen
  endScreen.removeClass("hide")

  // show final score
  finalScore.text(score);

  // hide questions section
  questionScreen.addClass("hide")
}

function clockTick() {
  // update time
  time--
  timerEl.text(time);
  // check if user ran out of time
  if (time === 0) {
    quizEnd()
  }
}

var scoresDictionary = {}

function saveHighscore() {
  // get value of input box
  var userInitials = initialsEl.val()

  // make sure value wasn't empty
  if (initialsEl.val() === "") {
    alert("Please Enter Initials in Entry Box")
  }
  // get saved scores from localstorage, or if not any, set to empty array
  var scores = JSON.parse(localStorage.getItem("scores"));

  if (scores === "") {
    localStorage.setItem("scores", {});
  }
  scoresDictionary[userInitials] = finalScore.text()



  var new_array = Object.assign({}, scores,scoresDictionary)

  localStorage.setItem("scores", JSON.stringify(new_array));


  // redirect to next page
  window.location.replace("highscores.html")
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
}




// user clicks button to submit initials
submitBtn.on("click", saveHighscore);

// user clicks button to start quiz
startBtn.on("click", startQuiz);

initialsEl.onkeyup = checkForEnter;