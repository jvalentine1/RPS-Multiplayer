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

