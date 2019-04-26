# RPS-Multiplayer
So in this assignment there were definitely a few changes and compromises that had to be made during the development process. 
Such as instead of incrementing a score counter for each player (which was th original goal) the game simply populates the html with either a win, or tie message based off of the result of the player's choices. 
Also, there was quite a bit more JavaScript written than originally intended.
But despite that the game is fully functional for two players on seperate devices using firebase. 

The first thing I had to tackle was to assign each player somehow, so the html gives players the option to choose with two buttons. Once a button is clicked both buttons disappear from there view, and only their selected button disappears from the other players view. Ensuring that each user will only be able to choose one player.
Then on the click of that button unique class names are pushed to the database and assigned to that players rock, paper, or scissors buttons. Making it so that a user can only access their specific buttons
After that when a player chooses a hand it pushes and then retrieves that choice from firebase and sends it through a series of conditionals to determine the status of each game.
* player one has to go first, that was one of the difficulties i faced during the development process. 
once the user choices pass through the conditionals a series of functions may be called. 
These functions populate the appropriate html fields to determine the winner or if there was a tie. 
The message counter is fully operational and the reset button clears the database, re assigns the player counter, and clears the wins ties fields. 
