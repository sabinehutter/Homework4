var clearScoreButton = $("#clear")
var highScoreSection = $("#highscores")

function printHighscores() {
  // either get scores from localstorage or set to empty array
  var scores = JSON.parse(localStorage.getItem("scores"));

  // (optional) sort highscores by score property in descending order

  // for each score
  for (score in scores){
        // create li tag for each high score
            // display on page
    highScoreSection.append($("<li>"+ score + " - " + scores[score] + "</li>"))


  }
}

function clearHighscores() {
    // (and reload)
  location.reload();
  window.localStorage.clear()

}

// attache clear event to clear score button
clearScoreButton.on("click", clearHighscores)
// run printhighscore when page loads
$( document ).ready(function() {
  printHighscores()
});