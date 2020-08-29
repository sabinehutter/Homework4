// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId = $("#time");

// variables to reference DOM elements
var questionsEl = $("#questions");
var timerEl = $("#time");
var choicesEl = $("#choices");
var submitBtn = $("#submit");
var startBtn = $("#start");
var initialsEl = $("#initials");
var feedbackEl = $("#feedback");

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

function startQuiz() {
  // hide start screen
  startScreen.hide();
  // un-hide questions section
  questionScreen.removeClass("hide")
  // start timer
  // var counter = setInterval(timer, 1000);

var timer = setInterval(function(){

  clockTick()
},1000);

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  for (eachQuestion in questions ){
  // update title with current question
    questionTitle.text((questions[eachQuestion].title))
  // clear out any old question choices
    questionChoices.text("")
  // loop over choices
  for (choices in (questions[eachQuestion].choices)){
        // create new button for each choice
    var choiceButton = $("<button>" + questions[eachQuestion].choices[choices] + "</button>")
          // attach click event listener to each choice
  choiceButton.on("click", questionClick)

  // display on the page
  questionChoices.append(choiceButton)
  }
  
  }
}

function questionClick(choiceClicked) {
  // check if user guessed wrong
  var userAnswer = $(this).text()
  var questionTitle2 = questionTitle.text()

for (question in questions)  {
  if (questions[question].title === questionTitle2){

  
if (questions[question].answer === userAnswer){
  // else 
    // play "right" sound effect
    var audio = new Audio('assets/sfx/correct.wav');
      audio.play()
      feedbackEl.append("Correct")
      feedbackEl.removeClass("hide")
      flashCorrect()

}
else{
      // penalize time
      time = time - 10
      // display new time on page
      timerId.text(time);
          // play "wrong" sound effect
      var audio = new Audio('assets/sfx/incorrect.wav');
      audio.play()
      flashWrong()

}
}
}

  // move to next question

  // check if we've run out of questions
    // quizEnd
  // else 
    // getQuestion
}

function quizEnd() {
  // stop timer

  // show end screen

  // show final score

  // hide questions section
}

function clockTick() {
  // update time
if (time == -1){
  clearTimeout()
}
else {
  timerId.text(time);
  time--
}

  // check if user ran out of time
}

function saveHighscore() {
  // get value of input box

  // make sure value wasn't empty
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user

    // save to localstorage

    // redirect to next page
}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
}

  


// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.on("click", startQuiz);

initialsEl.onkeyup = checkForEnter;
