var gamePattern = [];
var userClickPattern =[];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level =0;
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    // console.log(userClickPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1)
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        // console.log("success");
        if(userClickPattern.length===gamePattern.length){
            setTimeout( function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").html("Game Over, Press any key to Restart")
        startOver();
    }
} 
function nextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor((Math.random()*4));
    var randormChosenColour = buttonColours[randomNumber];
    gamePattern.push(randormChosenColour);

    $("#"+randormChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randormChosenColour);
}

function startOver(){
    level =0;
    gamePattern =[];
    started = false;
}
// console.log(randormChosenColour);
// console.log(gamePattern);
// var audio = new Audio("sounds/"+randormChosenColour+".mp3");
// audio.play();

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

