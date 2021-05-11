var gamePattern=[];
var userClickedPattern = [];
var buttonColors=["red","blue","green","yellow"];

var level =0;
var start =false;

$(document).keypress(function(){
  if(!start)
  {
    $("#level-title").text("Level"+level);
    nextSequence();
    start=true;

  }
});

function nextSequence()
{
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);
}

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userClickedPattern.length-1);

});
function playSound(name)
{
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function checkanswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
     console.log("Success");
     if(gamePattern.length === userClickedPattern.length)
     {
       setTimeout(function(){
         nextSequence();
       },1000);
     }
  }
  else
  {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    start =false;level=0;gamePattern=[];
  }
}
