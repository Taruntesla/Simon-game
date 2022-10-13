
var gamePattern = [];
var userClickedPattern=[];
const buttonColours = ["red","blue","green","yellow"];
var started = false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var   userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){ // if user has enteredthe whole pattern correctly
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
  }

}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}

function nextSequence() {
  level++;
  $("#level-title").text("Level "+level); //changing level displayed
  userClickedPattern=[];  //resetting it to zero length
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
