/**
  utilityFunctions.js contains all the util functions that can be reused
  across the application
**/

//A global timer variable
var x;


/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!

Source :
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/
Math/random
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
  setTimer(minutes) : creates a timer for minutes given and starts
  counting down
  Parameters
  minutes : the time that counter to be set
  Example:
  setTimer(1): starts a timer displaying 1 minute 0 seconds and counts down
  to zero eventually after the minute
  Source: https://www.geeksforgeeks.org/create-countdown-timer-using-javascript/
*/
function setTimer(minutes) {
  //Clear the time if time already is set
  if(x != undefined) {
    clearInterval(x);
  }
  //Check if proper minutes value is passed
  if(minutes != undefined) {
    //If any exceptionoccurs during the setting of timer like minutes being
    //Nan and being used in calculations they will caught and logged!
    try {
      //Get the current time
      var currentTime = new Date().getTime();

      //Time after adding minutes as passed to the function
      var timeGiven = new Date(currentTime + minutes*60000).getTime();

      //Running a function every second to get the time change every second
      x =  setInterval(function(){
        //Get the time every time the function is iterated
        var time = new Date().getTime();

        //Calculate the time left
        var timeLeft = timeGiven - time;

        //If time left goes below zero then the time limit is exceeded
        if(timeLeft < 0){
          //Clear the timer
          clearInterval(x);
          //Take to game over scenario because of time
          gameOver('time');
        } else {
            //Calculate the minutes and seconds left to display
            var minutes = Math.floor((timeLeft %
                                      (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            //Update the timer container with the calculated time
            document.getElementById('timer').innerHTML =
                      headingsAndLabels.timeLeft + " " + minutes +
                      ":" + seconds;
        }
      },1000);
    } catch {
      //Log when some exception occurs
        console.log("Timer couldn't set because of an exception!!")
    }
  }
}

/*
  resetTimer(): reset the current timer after each level
  Called after completion of levels, game over scenarios or trversing in between
  of game to any other page
*/
function resetTimer() {
  //If timer is set clear it
  if(x != undefined){
    clearInterval(x);
  }
}
