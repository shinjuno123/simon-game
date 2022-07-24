var levelTitle = $("#level-title");
var body = $("body");
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour =''
var currentState = [];
var userChosenColour = []
var isGameStarted = false;

function chooseRandomColor(){
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}


function buttonFadeInAndOut(randomChosenColour){
  $("."+randomChosenColour).fadeOut(100).fadeIn(100);
}

function makeButtonSound(randomChosenColour){
  var sound = new Audio("./sounds/"+randomChosenColour+".mp3");
  sound.play();
}


function animatePress(clickedButton){
  var button = $("." + clickedButton);
  button.addClass("pressed");
  setTimeout(function(){button.removeClass("pressed")},100)
}

function changeLevelHeading(randomChosenColour){
  levelTitle.text("Level " + currentState.length);
}


function isSameColor(){
  if(userChosenColour[userChosenColour.length - 1] === currentState[userChosenColour.length - 1]){
    return true
  }else{
    return false
  }
}


function goToNextLevel(){
  randomChosenColour = buttonColours[chooseRandomColor()];
  currentState.push(randomChosenColour);
  changeLevelHeading(randomChosenColour);

  userChosenColour = [];

  setTimeout(function(){
    buttonFadeInAndOut(randomChosenColour);
    makeButtonSound(randomChosenColour);
  },500);
}


function startOver(){
  randomChosenColour = buttonColours[chooseRandomColor()];
  currentState.push(randomChosenColour);
  changeLevelHeading(randomChosenColour);

  userChosenColour = [];

  setTimeout(function(){
    buttonFadeInAndOut(randomChosenColour);
    makeButtonSound(randomChosenColour);
  },500);
}


function gameOver(){
  levelTitle.text("Game Over, Press Any Key to Restart");
  body.addClass('game-over');
  setTimeout(function(){body.removeClass('game-over');},200);

  // play a sound that happens when the user's color is wrong in sequence.
  var wrong = new Audio("./sounds/wrong.mp3");
  wrong.play();
}

// initialize a game when games over.
function initialize(){
  userChosenColour = [];
  currentState = [];

  isGameStarted = false;
}




$(document).on("keydown click",function(event){
  if(isGameStarted === false){
    startOver();
    isGameStarted = true;
  }
});


$(".btn").click(function(){
  var clickedButton = this.classList[1];
  userChosenColour.push(clickedButton);
  animatePress(clickedButton);
  makeButtonSound(clickedButton);
  if(isSameColor()){
    // if all the colors user chose was correct then go to next level.
    if(userChosenColour.length === currentState.length){
      goToNextLevel();
    }

  }else{
    gameOver();
    initialize();
  }
});
