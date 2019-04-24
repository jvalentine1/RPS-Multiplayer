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
var playerCount = 0;
var pl1Wins = 0;
var pl1Losses = 0;
var pl2Wins = 0;
var pl2Losses = 0;

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
//creates a div with player choice info and allows it to be removed once chosen
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
    b2.append(button2)

    $(".comp-messages").append(chooseAlert);
    $(".comp-messages").append(b1);
    $(".comp-messages").append(b2);
}

setTimeout(chooseMessage, 2000);

// on click player 1 logic
$(document).on("click", "#choice-1", function(e) {
    e.preventDefault();
    $(".remove-1").html("");

    var p1Rock = "p1-rock";
    var p1Paper = "p1-paper";
    var p1Scissors = "p1-scissors";

    database.ref().push({
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

$(".p1-rock").on("click", function() {
    console.log("player 1 chose rock");
})

//on click player 2 logic
$(document).on("click", "#choice-2", function(e) {
    e.preventDefault();
    $(".remove-2").html("");

});

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
    console.log(childSnapshot.val());

    var p = $("<p>");
    p.addClass("text-left");
    var newMessage = childSnapshot.val().message;
    p.html(newMessage);
    $(".message-host").append(p);

});

//reset game logic
$(".reset-game").on("click", function() {
    console.log("reset");
});

