var userChosenColour = []
var buttonColours = ["red", "blue", "green", "yellow"];
var currentState = [];

function nextSquence(){
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}


function buttonFadeInAndOut(gamePattern){
  $("."+gamePattern).fadeOut(100).fadeIn(100);
}

function makeSound(gamePattern){
  var sound = new Audio("./sounds/"+gamePattern+".mp3");
  sound.play();
}


function animatePress(clickedButton){
  var button = $("." + clickedButton);
  button.addClass("pressed");
  setTimeout(function(){button.removeClass("pressed")},100)
}



$(this).on("keydown",function(event){
  var randomChosenColour = buttonColours[nextSquence()];
  var gamePattern = randomChosenColour;
  currentState.push(randomChosenColour);

  userChosenColour = [];

  setTimeout(function(){
    buttonFadeInAndOut(gamePattern);
    makeSound(gamePattern);
  },500);


});


$(".btn").click(function(){
  var clickedButton = this.classList[1];
  userChosenColour.push(clickedButton);
  animatePress(clickedButton);
  makeSound(clickedButton);
  console.log(userChosenColour);
});
