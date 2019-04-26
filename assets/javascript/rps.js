//Global Variables

//Firebase config
var config = {
    apiKey: "AIzaSyDijAfYQ7qp3el0n6kHlazaiNKruZ09fMo",
    authDomain: "jake-rps-homework.firebaseapp.com",
    databaseURL: "https://jake-rps-homework.firebaseio.com",
    projectId: "jake-rps-homework",
    storageBucket: "jake-rps-homework.appspot.com",
    messagingSenderId: "69107032140"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//title populate variables
var title = "Rock, Paper, Scissors";
var titleElement = $("<h1>");
var titleCount = 0;

//Game logic variables
// var count = 0;
// var pl1Wins = 0;
// var pl1Losses = 0;
// var pl2Wins = 0;
// var pl2Losses = 0;
// var ties = 0;


//title populate function
function openPage() {

    setInterval(titleRender, 50);
}

function titleRender() {

    titleElement.append(title[titleCount]);
    $(".title-text").append(titleElement);
    titleCount++;
    if (titleCount === 20) {
        clearInterval(titleRender);
    }
}

openPage();

//Fade in function
setTimeout(fadeIn, 700);

function fadeIn() {
    $(".fader").removeClass("fade-none")
    $(".fader").addClass("fade-in");
}

//Main Logic

//Choose a player logic

//Choose a player center message render
function chooseMessage() {
    var chooseAlert = $("<h3>");
    chooseAlert.addClass("fade-in");
    chooseAlert.text("Select A Player To Begin");
//creates a div with player choice info and allows it to be removed once chosen, creates button divs and assigns them classes to be referenced
    var b1 = $("<div>");
    b1.addClass("remove-1")
    var button1 = $("<button>");
    button1.addClass("fade-in");
    button1.attr("id", "choice-1");
    button1.text("Player 1");
    b1.append(button1);

    var b2 = $("<div>");
    b2.addClass("remove-2")
    var button2 = $("<button>");
    button2.addClass("fade-in");
    button2.attr("id", "choice-2");
    button2.text("Player 2");
    b2.append(button2);

    $(".comp-messages").html(chooseAlert);
    $(".comp-messages").append(b1);
    $(".comp-messages").append(b2);
}

setTimeout(chooseMessage, 2000);


database.ref().on("value", function(childSnapshot) {
    count = childSnapshot.val().playerCounter;

    if (count === 2) {
        var startDiv = $("<h3>");
        startDiv.text("Player 1 Go");
        var then = $("<h3>");
        then.text("Then");
        var newDiv = $("<h3>");
        newDiv.text("Player 2 Go");
        $(".comp-messages").html(startDiv);
        $(".comp-messages").append(then);
        $(".comp-messages").append(newDiv);
    }
})

// on click player 1 logic
$(document).on("click", "#choice-1", function(e) {
    e.preventDefault();
    $(".startClick-p1").html("YOU P1");
    $(".startClick-p2").html("Opponent");

    count++
    database.ref().set({
        playerCounter: count
    });

    var removeP1Btn = "";
    var p1Rock = "p1-rock";
    var p1Paper = "p1-paper";
    var p1Scissors = "p1-scissors";

    $(".remove-2").html("");

    database.ref().push({
        removeP1Btn: removeP1Btn,
        p1Rock: p1Rock,
        p1Paper: p1Paper,
        p1Scissors: p1Scissors
    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().p1Rock);
        console.log(childSnapshot.val().p1Paper);
        console.log(childSnapshot.val().p1Scissors);
        
        $("#rock-1").addClass(childSnapshot.val().p1Rock);
        $("#paper-1").addClass(childSnapshot.val().p1Paper);
        $("#scissors-1").addClass(childSnapshot.val().p1Scissors);
    });
});

database.ref().on("child_added", function(childSnapshot) {
    $(".remove-1").html(childSnapshot.val().removeP1Btn);
});



//on click player 2 logic
$(document).on("click", "#choice-2", function(e) {
    e.preventDefault();
    $(".startClick-p2").html("YOU P2");
    $(".startClick-p1").html("Opponent");

    var removeP2Btn = "";
    var p2Rock = "p2-rock";
    var p2Paper = "p2-paper";
    var p2Scissors = "p2-scissors";

    $(".remove-1").html("");

    count++
    database.ref().set({
        playerCounter: count
    });

    database.ref().push({
        removeP2Btn: removeP2Btn,
        p2Rock: p2Rock,
        p2Paper: p2Paper,
        p2Scissors: p2Scissors
    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().p2Rock);
        console.log(childSnapshot.val().p2Paper);
        console.log(childSnapshot.val().p2Scissors);

        
        $("#rock-2").addClass(childSnapshot.val().p2Rock);
        $("#paper-2").addClass(childSnapshot.val().p2Paper);
        $("#scissors-2").addClass(childSnapshot.val().p2Scissors);
    });
});

database.ref().on("child_added", function(childSnapshot) {
    $(".remove-2").html(childSnapshot.val().removeP2Btn);
});



// Play Game logic
var pHand1 = [""];
var pHand2 = [""];

//player 1 chose rock
$(document).on("click", ".p1-rock", function() {
    database.ref().push({
        p1Choice: "rock"
    });
});

//player 2 chose rock
$(document).on("click", ".p2-rock", function() {
    database.ref().push({
        p2Choice: "rock"
    });
});

//player 1 chose paper
$(document).on("click", ".p1-paper", function() {
    database.ref().push({
        p1Choice: "paper"
    });
});

//player 2 chose paper
$(document).on("click", ".p2-paper", function() {
    console.log("p2paper");
    database.ref().push({
        p2Choice: "paper"
    });
});

//player 1 chose scissors
$(document).on("click", ".p1-scissors", function() {
    database.ref().push({
        p1Choice: "scissors"
    });
});

//player 2 chose scissors
$(document).on("click", ".p2-scissors", function() {
    database.ref().push({
        p2Choice: "scissors"
    });
});

//pushes player 2 choice to array
database.ref().on("child_added", function(childSnapshot) {
    hand2 = childSnapshot.val().p2Choice;
    pHand2.unshift(hand2);
    console.log(pHand2[0]);
    checkScore();
});

//pushes player 1 choice to an array
database.ref().on("child_added", function(childSnapshot) {
    hand1 = childSnapshot.val().p1Choice;
    pHand1.unshift(hand1); 
    console.log(pHand1[0]);
    checkScore();
});


//Checks score by refrencing player choice array
function checkScore(){
    if (pHand2[0] === "rock" && pHand1[0] === "rock") {
        console.log("tie");
        playerTie();
    }
    else if (pHand2[0] === "paper" && pHand1[0] === "paper") {
        console.log("tie");
    }
    else if (pHand2[0] === "scissors" && pHand1[0] === "scissors") {
        console.log("tie");
    }
    else if (pHand2[0] === "rock" && pHand1[0] === "paper") {
        console.log("p1 wins");
    }
    else if (pHand2[0] === "paper" && pHand1[0] === "scissors") {
        console.log("p1 wins");
    }
    else if (pHand2[0] === "scissors" && pHand1[0] === "rock") {
        console.log("p1 wins");
    }
    else if (pHand2[0] === "rock" && pHand1[0] === "scissors") {
        console.log("p2 wins");
    }
    else if (pHand2[0] === "paper" && pHand1[0] === "rock") {
        console.log("p2 wins");
    }
    else if (pHand2[0] === "scissors" && pHand1[0] === "paper") {
        console.log("p2 wins");
    }
};

//tie function 
function playerTie() {
    console.log("function run")
    var tie = $("<h2>");
        database.ref().push({
            ties: "Tie"
        });
        database.ref().on("child_added", function(childSnapshot) {
            tie.text(childSnapshot.val().ties);
        });
        $(".stats-2").html(tie);
        $(".stats-2").html(tie);
}


//User messages logic 
 $(".submit-message").on("click", function(e) {
    e.preventDefault();
    console.log("submit btn");

    var message = $(".message-input").val().trim();
    console.log(message);

    database.ref().push({
        message: message
    });

    $(".message-input").val("");
 });

 database.ref().on("child_added", function(childSnapshot) {

    var p = $("<p>");
    p.addClass("text-left");
    var newMessage = childSnapshot.val().message;
    p.html(newMessage);
    $(".message-host").append(p);

});

//reset game logic
$(".reset-game").on("click", function() {
    console.log("reset");
    database.ref().set({
        playerCounter: 0
    });

    chooseMessage();
});

