/**
  app.js: The main js file that contains all the game related logic.
  All the appending of content to the main page is done from here.
  Author: Rajesh Kallumari
  Email: rkallumari@deakin.edu.au
**/

/*
  Local variables for use within the file
*/

var level  = 0; //local variable that holds the current level value
var itemCorrect = 0; //Number of items per level that were correct

/*
  Global variables declared on window for use across the files
*/

//Stores the current room list for given level
window.currentRoomList = [];
//Store the current item list for given level
window.currentItemList = [];
//Contains the element shown in question currently
window.currentItem;
//Contains score information
window.score = 0;
//Tracks speaker on/off across app
window.speakerImage = 'speaker_off';
//Tracks room being shown for pagination in room selection page
window.currentRoomIndex = 0;

//Function called on load of the game
window.onload = loadGame;

/*
  Functions that handles the game logic
*/

/*
  fetchRoomList() : Fetches the rooms list randomly from global rooms list
  returns a list of rooms object
*/
function fetchRoomList() {
  var roomsList = [];
  var randomNum = [];
  //Extracting 4 rooms randomly from 5 rooms present (configurable)
  while(roomsList.length < room.length-1) {
    //Generating random number within range of number of rooms available
    var random = getRandomInt(0,room.length-1);
    //Make sure that rooms do not repeat
    if(!randomNum.includes(random)){
      //Take out the room randomly
      roomsList.push(room[random]);
      //Store the random number to check that same number is not taken again
      randomNum.push(random);
    }
  }//End of while loop that extracts four rooms out of five rooms
  //Returns the list of four rooms taken from 5 rooms present currently
  return roomsList;
}

/*
  fetchItemList() : Fetches the items list based on current room list
  and maximum allowed as per the level
  returns a list of items object
*/
function fetchItemList() {
  //Variable to hold final item objects list that will be returned
  var itemsList = [];
  //Variable to hold all the id of items usable based on current rooms displayed
  var itemsUsable = [];
  //Variable to hold the ids of items taken out randomly based on the level
  var itemsForLevel = [];
  //A random number containing all the numbers produced to check for repition.
  var randomNum = [];

  //Maximum items allowed per level
  var max = fetchMaxItems(level);

  //Fetch all items that can be used based on current rooms
  for(var i = 0; i < currentRoomList.length; i++) {
    var r = currentRoomList[i];
    for(var j = 0; j < r.itemId.length; j++){
      //Populating the itemsUsable list with ids of items as per rooms dispalyed
      itemsUsable.push(r.itemId[j])
    } //End of for loop for fetching items in a room
  } //End of for loop for fetching items from all rooms displayed currently

  if(itemsUsable.length >= max) {
    //Taking out the items id randomly from itemsUsable to be used in the level
    while(itemsForLevel.length < max) {
      //Generate a ranom integer within the length of itemsUsable
      var random = getRandomInt(0,itemsUsable.length-1);
      //Make sure same random number is not used again so that items wont repeat
      if(!randomNum.includes(random)){
        //Push the item at random index to itemsForLevel
        itemsForLevel.push(itemsUsable[random]);
        //Push the current random number used to randomNum for repetition check
        randomNum.push(random);
      }
    } //End of while loop for populating itemsForLevel
  } else {
    return undefined;
  }

  //Preparing the item list based on the item id extracted
  for(var i = 0; i < itemsForLevel.length;i++){
    for(var j = 0; j < items.length; j++){
      if(items[j].itemId == itemsForLevel[i]) {
        itemsList.push(items[j]);
      }
    }//End of for loop for taking out item for an id from items list
  }//End of for loop for iterating towards all possible item ids for the level

  //Returns the items specific to level and rooms displayed
  return itemsList;
}

/*
  fetchMaxItems(): Fetches the maximum items allowed as per the level
  Maximum items will be increased by 3  every level
  (configured in config.itemDifferencePerLevel)
  level 1: 3 items
  level 2: 6 items
  and so on..
  If the game level exceeds (in which case this function itself wont be called
  as of present logic), it redirects to game over scenario
  returns the number of items allowed in the level
*/
function fetchMaxItems() {
  //Checking if the maximum level is exceeded
  if(level <= config.numberOfLevels){
    //Return the number of items allowed for the level
    return config.itemDifferencePerLevel * level;
  } else {
    //game over scenario is envoked if maximum level is exceeded
    gameOver();
  }
}

/*
  fetchMaxTime(): Fetches the maximum time per question as per the current level
  Every level decreases by 30 seconds
  (configured in config.timeDiffPerLevel)
  For example
  level1: 5 minutes,
  level2: 4 min 30 seconds
  level3: 4 min
  and so on
  If the game level exceeds (in which case this function itself wont be called
  as of present logic), it redirects to game over scenario
  returns the time allowed per item in every level in minutes
*/
function fetchMaxTime(){
  //Checking if the maximum level is exceeded
  if(level <= config.numberOfLevels){
    //Decrease the time by timeDiffPerLevel as each level increases
    return ((config.numberOfLevels*config.timeDiffPerLevel +
            config.timeDiffPerLevel) - level*config.timeDiffPerLevel)/60;
  } else {
    //game over scenario is envoked if maximum level is exceeded
    gameOver();
  }
}

/*
  validateTheEnteredName(): validates the entered name as per current item name
  Updates the teddy dialogue box with text stating whether the answer is correct
  or wrong and also makes the item image draggable if the name is correct
*/
function validateTheEnteredName(){

  //Scrolls to the question element.Useful in portrait mode.
  scrollRightPanelContainer();

  //Fetch the user entered name
  var enteredName = document.getElementById('answerInputElement').value;

  //Check if the user entered an item name and the name is equal to current item
  if(enteredName != "undefined" && (currentItem.itemName.toLowerCase() ===
    enteredName.toLowerCase())){

    //Make the image draggable
    document.getElementById('item_'+currentItem.itemId).setAttribute('draggable'
                                                                      ,'true');

    //Change the dialogue box to tell the answer is correct and text displayed
    //id chosen based on portrait or landscape mode
    if(window.innerWidth > window.innerHeight){
      document.getElementsByClassName('tdialogue-box-text')[0].innerHTML =
                                                teddyDialogues.gameCorrectItem;
    } else {
      document.getElementsByClassName('tdialogue-box-text')[0].innerHTML =
                                          teddyDialogues.gameCorrectItemPotrait;
    }

    //Recreate the rooms on left side for the next question
    resetLeftPanel();

  } else {
    //Change the dialogue box to tell that answer is wrong
    document.getElementsByClassName('tdialogue-box-text')[0].innerHTML =
                                              teddyDialogues.gameIncorrectItem;
  }
}


/*
  Functions that loads various pages
*/

/*
  loadLandingPage(): Loads the static landing page
  Called on initial load of the game and also on pressing on home button in
  winning pop up or on home icon anywhere across the app.
*/
function loadLandingPage() {
  //Clearing the content on the page
  document.body.innerHTML = "";

  //Adding the static content in the landing page
  document.body.appendChild(createLandingPageContent());

  //Manage the music when the speaker is on
  if(speakerImage === 'speaker_on'){
    //If arrived from game over page, sounds may already be initaited
    //Stop the levelUp sound and start game sound in this case
    if(sounds.levelUp != undefined){
      //Stop levelup music
      sounds.levelUp.pause();
      sounds.levelUp.currentTime = 0.0;
    }
    if(sounds.game != undefined){
      //Start game music
      sounds.game.loop = true;
      sounds.game.play();
    }
  }
  //Resetting the score to zero
  score = 0;

  //Resetting the timer
  resetTimer();
}

/*
  loadLevelSelectionPage(): Loads the static level selection page
  called on pressing 'i want to play now' button in landing page and also
  in the back button flow from the game page
*/
function loadLevelSelectionPage(){
  //Clearing the content on the page
  document.body.innerHTML = "";

  //Adding the level selction page statuc content
  document.body.appendChild(createLevelSelectionPage());

  //Making score to zero in back flow to level selection page
  score=0;

  //Resetting the timer
  resetTimer();
}

/*
  loadGame() : The onload function that loads the game
  it loads the sounds and the landing page
*/
function loadGame() {
  //Load all sounds and create JS object to reuse across app
  loadSounds();
  //Load the landing page
  loadLandingPage();
}

/*
  loadGamePage(lvl): The function that updates the level and loads the level
  Parameters:
  lvl: Level as choosen on the UI by user
  Called on press of level buttons in level selection pages or
  On clicking resume game button in time out or score less than zero pop ups
  Example:
  loadGamePage(1):loads the game page with items and rooms as per the game
  config for level 1.
*/
function loadGamePage(lvl) {

  //Update the level number in global variable
  level = lvl;

  //The level is going to start now so initialise the correct items to zero
  itemCorrect = 0;

  //Create the game content
  var gameContent = createGamePage();

  //If game content is not created the display level not ready message
  if(gameContent === undefined) {
    updateTeddyDialogueMessage(teddyDialogues.gameLevelNotExists);
    level = 0;
    return;
  } else {
    //Clear the page
    document.body.innerHTML = "";
    //Append the game page to the main page
    document.body.appendChild(gameContent);
  }
}

/*
  loadRoomSelectionPage(): The function that loads the room selection page
  displaying all the rooms availble with pagination
  Called on press of 'I want to first learn' button in landing page or on
  clicking the learn icon across the app.
*/
function loadRoomSelectionPage() {
  //Clear the current content
  document.body.innerHTML = "";

  //Append the static content of room selection page
  document.body.appendChild(createRoomSelectionPage());

  //Reset the timer in case the flow comes from game pages
  resetTimer();
}

/*
  loadSounds(): loads the sounds used in the game
  stored it global variable 'sounds'
  game : For all the pages of the game
  levelUp : Only during display of popups on level completion, game completion,
  timeout/score down
  buttonClick : The sound on click of button in the manual keyboard
*/
function loadSounds() {
  //Loading the music into global variable sounds
  window.sounds = {
    "game": new Audio("sounds/landing_page.mp3"),
    "levelUp": new Audio("sounds/level_up.mp3"),
    "buttonClick": new Audio("sounds/button_click.mp3")
  }

  //The speaker image to be shown when speaker is on
  window.musicOn = createImage('Image Not Found','images/speaker_on.svg');
  //Event handler to toggle music on click of the icon
  musicOn.onclick = toggleMusic;

  //The speaker image to be shown when speaker is off
  window.musicOff = createImage('Image Not Found','images/speaker_off.svg');
  //Event handler to toggle music on click of the icon
  musicOff.onclick = toggleMusic;
}

/*
  createGamePage() : Game page creating function
  Creates the game page based on level
  returns a element with game header, left panel and right panel
*/
function createGamePage(){
  //The main container for the game
  var levelDiv = createDiv();
  levelDiv.classList.add('mainContainer');

  //Adding the game header with home, back, learn and speaker icon
  levelDiv.appendChild(createGameLevelHeader(level));

  //Making sure the body is fit to fixed height
  toggleFixedHeight(true);

  //Create left and right panels of the game
  var leftElement = createLeftPanel(level);
  var rightElement = createRightPanel(level);

  if(rightElement ==undefined) {
    return undefined;
  }

  //Based on portrait and landscape mode append the panels so that in
  //portrait the question elements followed by keyboard is shown
  if(window.innerWidth > window.innerHeight) {
    levelDiv.appendChild(leftElement);
    levelDiv.appendChild(rightElement);
  } else {
    levelDiv.appendChild(rightElement);
    levelDiv.appendChild(leftElement);
  }

  //Returns the game page with game header, left and right panels
  return levelDiv;
}

/*
  resetRightPanel(): creates a new item in the right hand panel
  after the previous one is correct
*/
function resetRightPanel() {
  //Get the question container
  var element = document.getElementsByClassName('questionElement');

  //Reset the dialog box with content suggesting to name the item displayed
  //correctly
  document.getElementsByClassName('tdialogue-box-text')[0].innerHTML =
      'Give the correct name of the item dispalyed in the input box! Use the' +
      'keypad on left side!';

  //Clear the previous item
  element[0].innerHTML = "";

  //Creating a question with new item
  createQuestion(element[0]);
}

/*
Functions that add event handlers
*/

/*
  addDropAttributes(element,room): add ondrop and ondragover events on the
  left side panel containing the room images
  Parameters:
  element : The div element holding the current room image to which the event
  handler will be assigned
  room : The room object on which the event is being assigned
  Called when creating the right panel in each level
  Example:
  var element = createDiv() // room
  var room = room[1]
  addDropAttributes(element, room) : Adds the dragover and ondrop events on the
  element and check if element is dropped on correct room passed to function
*/
function addDropAttributes(element, room){

  //Adding dragover event
  element.ondragover = function(event) {
    //Stopping the default action during the drag
    event.preventDefault();
    //Add the class focus to the element to highlight the room
    element.classList.add('focus');
  }

  //Adding dragleave event
  element.ondragleave = function(event) {
    //Stopping the default action after drag
    event.preventDefault();
    //Add the class focus to the element to highlight the room
    element.classList.remove('focus');
  }

  //Checking for the correctness in mapping of item with the room
  element.ondrop = function(event) {
    //Get the item id passed during ondragstart event
    var itemId = event.dataTransfer.getData('itemId');
    //Fetch the list of items valid for rooms passed
    var itemInRoom = room.itemId;
      //Stopping the default action on drop
    event.preventDefault();
    //Removing focus on room as thr drop action is done
    element.classList.remove('focus');
    //Check if the item dropped is in rooms item list
    if(itemInRoom.includes(Number(itemId))){
      //Progress the game in correct mapping flow taking to next question
      handleGameProgress(true)
    } else {
      //Progress the game in incorrect mapping flow remaining in same question
      handleGameProgress(false);
    }
  }
}

/*
  addClickValidator(element, room): Adds click event handler for rooms to
  check the room selection for the item displayed.
  Parameters:
  element : The div element holding the current room image to which the event
  handler will be assigned
  room : The room object on which the event is being assigned
  Called especially in portrait mode for enabling selction of room instead of
  drag and drop feature in game page.
  Example:
  var element = createDiv() //room
  var room = room[1]
  addDropAttributes(element, room) : Adds the click event handler on the
  element and check if element is dropped on correct room passed to function
*/
function addClickValidator(element, room) {
  //Add the event handlers for touch start and touch end to show the focus
  //when clicked on the room
  element.addEventListener('touchstart', listener);
  element.addEventListener('touchend', listener);
  var listener = function() {
    element.classList.toggle('focus');
  }

  //Adding the onclick event handler to check if user clicked on correct room
  element.onclick = function() {
    //Scroll to right panel as the outcome of the mapping is shown in teddy
    //dialogue which is in right panel
    scrollRightPanelContainer();
    //Check if the current item id is part of room chosen
    if(room.itemId.includes(currentItem.itemId)) {
      //Progress the game in correct mapping flow taking to next question
      handleGameProgress(true);
    } else {
      //Progress the game in incorrect mapping flow remaining in same question
      handleGameProgress(false);
    }
  }
}

/*
  updateTeddyDialogueMessage(message) : This function updates the dialogue box
  of the teddy with the message passed to the function.
  Parameters:
  message: The message to be displayed in the teddy dialogue box
  Example:
  updateTeddyDialogueMessage('Congratulations!You won!');
  This will update the message 'Congratulations!You won!' in teddy dialogue box
*/
function updateTeddyDialogueMessage(message) {
  //Fetch the teddy dialogue box element using its class name
  var element = document.getElementsByClassName('tdialogue-box-text')[0];

  //Clear the teddy dialogue content
  element.innerHTML = '';

  //Add the message passed to the teddy dialogue box
  var text = document.createTextNode(message);

  //Append the message to the dialogue
  element.appendChild(text);
}

/*
  updateItemsRemaining() : This function updates the items remaining to complete
  a particular level based on items already correctly mapped in that level.
  Called after dragging the item to correct room
*/
function updateItemsRemaining() {
  //Get the item remaining container element based on the id
  var items_remaining_element = document.getElementById('itemsRemaining');

  //Update the items remaining by using maximum items to be completed in the
  //in the level and number of items already mapped correctly
  items_remaining_element.innerHTML = headingsAndLabels.itemsRemaining + " " +
                                    (fetchMaxItems() - itemCorrect).toString();
}

/*
  gameOver(reason) : the function handles various winning and losing scenarios
  in the game
  Prameters:
  reason: 'time' denotes the time given in the level for mapping an item is up
          A time up message will be shown in this case
  reason: 'score' denotes the score went below zero as the mapping is done wrongly
          by the user. A score invalid message comes up
  reason: 'levelUp' denotes that the number of items to be answered in a level
          is met and so a level completion message is displayed
  reason: 'won' denotes that all the levels are completed and so the user has
          won the game
  Example:
  gameOver('won'): Makes the teddy come to center of screen with dialogue box
  saying congratulations for winning game and gives options to traverse to home
  page or learning page
*/
function gameOver(reason){
  //Disavle all the other icons other than on ein teddy dialogue box
  disableOtherElement();

  //Reset timer as question is done
  resetTimer();

  //Add class moved to teddy to get animation
  document.getElementsByClassName('game-dialogue-box')[0].classList.add(
                                                                      'moved');
  //Get the dialogue box to update the teddy dialogue
  var element = document.getElementsByClassName('tdialogue-box-text')[0];

  //Clear the current dialogue
  element.innerHTML = '';

  //The main div for the teddy content
  var reset_div = createDiv();
  reset_div.classList.add('resetContainer');

  //Div holding the text be dispalyed in teddy dialogue box
  var text_div;

  //Button to redirect to room selection page
  var learnButton = createButton('I will learn first');
  learnButton.onclick = loadRoomSelectionPage;

  //Button to continue to next level
  var playButton = createButton('Resume playing');
  //Event handler to take to next level on click
  playButton.onclick = resumeGame;

  //Game over, tackle the game based on reason
  if(reason == 'time'){
    //Show text as game over because of time up
    text_div = createDiv(teddyDialogues.gameLostTime);
  } else if(reason == 'score') {
    //Show text as game over because of score going negative
    text_div = createDiv(teddyDialogues.gameLostScore);
  } else if(reason == 'levelUp') {
    //Show text saying the level is up
    text_div = createDiv(teddyDialogues.levelUp);
    //Increase the level
    level += 1;
    //Play level up music if the music is on
    if(speakerImage === 'speaker_on'){
      sounds.game.pause();
      sounds.game.currentTime = 0.0;
      sounds.levelUp.loop = true;
      sounds.levelUp.play();
    }
  } else if(reason == 'won') {
    //Display the game win message
    text_div = createDiv(teddyDialogues.gameWon);

    //Button to redirect to  home page
    var playButton = createButton('Home');

    //Play the level up music if music is on
    if(speakerImage === 'speaker_on'){
      sounds.game.pause();
      sounds.game.currentTime = 0.0;
      sounds.levelUp.loop = true;
      sounds.levelUp.play();
    }

    //Reset the level to 0 as all levels has been crossed
    level =0;

    //Redirect to landing page on click of home button
    playButton.onclick = loadLandingPage;
  }
  //Add the dialogue and buttons to teddy dialogue
  text_div.classList.add('resultDescription');
  reset_div.appendChild(text_div);
  reset_div.appendChild(learnButton);
  reset_div.appendChild(playButton);
  element.appendChild(reset_div);

  //Add classes to adjust teddy sizes when it moves to center f page
  document.getElementsByClassName('gameTeddyElement')[0].classList.add(
                                                                    'timeOver');
  document.getElementsByClassName('gameTeddyImage')[0].classList.add(
                                                                  'teddySize');
}

/*
  resumeGame() : This helps in resuming the game from the level at which
  user lost the game
  It is an event handler for onclick event of resume game button
  in pop up that appears when user looses a game
  It resets the sound back to game from levelUp
*/
function resumeGame() {
  //Handle th emusic if the music is on
  if(speakerImage === 'speaker_on'){
    sounds.levelUp.pause();
    sounds.levelUp.currentTime = 0.0;
    sounds.game.loop = true;
    sounds.game.play();
  }

  //Load next level
  loadGamePage(level);
}

/*
  disableOtherElement() :  Disables all other operations during the levelup,
  win all levels, lost because of time, lost because of score scenarios
  makes the buttons in game header 'back' and 'i will learn' disabled
  makes the input field to enter the name of current item disabled
  reduces the opacity of the right and left panel to appear faded
*/
function disableOtherElement() {
  //Back, home page, learn and speaker icons are disabled
  document.getElementsByClassName('backContainer')[0].setAttribute('disabled',
                                                                        'true');
  document.getElementsByClassName('homePageContainer')[0].setAttribute(
                                                            'disabled','true');
  document.getElementsByClassName('learnContainer')[0].setAttribute('disabled',
                                                                        'true');
  document.getElementById('speaker').setAttribute('disabled','true');

  //Decrease the opacity of header elements
  document.getElementsByClassName('levelHeader')[0].style.opacity = 0.5;
  var images = document.getElementsByClassName(
                                  'levelHeader')[0].getElementsByTagName('img');

  //Also remove the pointer for header icons
  for(var i=0;i<images.length;i++) {
    images[i].style.cursor = 'default';
  }

  //Deacrease opacity for all elements
  document.getElementsByClassName('leftPanelContainer')[0].style.opacity = 0.5;
  document.getElementsByClassName('questionElement')[0].style.opacity = 0.5;
  document.getElementById('answerInputElement').setAttribute('disabled','true');
  document.getElementById('item_'+currentItem.itemId).setAttribute('draggable',
                                                                      'false');
}

/*
  toggleMusic() : turns on the game music
  Acts as an event handler on click of the 'turn on music' button
  Plays game music in a loop
*/
function toggleMusic(){
  //If speaker is of condition then on click make it on and start music
  if(speakerImage === 'speaker_off'){
    //Change speakerImage to speaker_on
    speakerImage = 'speaker_on';

    //Start the game music in loop
    sounds.game.loop = true;
    sounds.game.play();

    //Empty the speaker div
    document.getElementById('speaker').innerHTML = '';

    //Append music on icon
    document.getElementById('speaker').appendChild(musicOn);
  } else {
    //Change speakerImage to speaker_off
    speakerImage = 'speaker_off';
    //If music is turned on stop it
    //Turn off level up music if its on
    if(sounds.levelUp != undefined){
      sounds.levelUp.pause();
      sounds.levelUp.currentTime = 0.0;
    }
    //Turn off game music if its on
    if(sounds.game != undefined){
      sounds.game.pause();
      sounds.game.currentTime = 0.0;
    }
    //Clear the content in speaker container
    document.getElementById('speaker').innerHTML = '';

    //Append music off icon
    document.getElementById('speaker').appendChild(musicOff);
  }

}

/*
  removeCurrentItem() : removes the current item from the current item list
  to avoid repeating same item in a given level
*/
function removeCurrentItem() {
  //Iterate towards the current item list to find and remove the current item
  for(var i=0; i<currentItemList.length; i++){
    if(currentItem.itemId == currentItemList[i].itemId){
      //Delete the current item in the current item list
      currentItemList.splice(i,i+1);
      break;
    }
  }
}

/*
  fetchItems(roomId) : fetches items of particular room as per the roomId passed
  Parameter:
  roomId: The id of the room for which items needs to fetched
  Example:
  fetchItems(1) : returns all the items of the room of id 1
*/
function fetchItems(roomId) {
  //List to hold item ids in a given room
  var itemsInRoom = [];

  //List to hold the item objects of a given room
  var finalItemsList = [];

  //Iterate through rooms to identify the room based on roomId passed
  for(var i=0; i< room.length; i++){
    //Get the room matching the roomId
    if(room[i].roomId === roomId){
      //item ids in the room selected
      itemsInRoom = room[i].itemId;
    }
  }

  //Iterate through items to fetch the item objects based on item ids
  for(var i=0; i< items.length; i++){
    //Get the item based on itemids
    if(itemsInRoom.includes(items[i].itemId)) {
      //Item object added to final item list
      finalItemsList.push(items[i]);
    }
  };

  //Clear the content
  document.body.innerHTML = "";

  //Create the items page for the given room
  document.body.appendChild(createItemsPage(finalItemsList));
}

/*
  changeRoom(indexAdder): This function displays the next/previous room
  Parameter:
  indexAdder: This gives index to fetch the room
  Called on pressing next/prev buttons
  Example:
  changeRoom(1): Fetches the room at index 0 of rooms available
*/
function changeRoom(indexAdder) {
  //Incremented the currentRoomIndex
  currentRoomIndex += indexAdder;

  //Add previous and next element
  var prevElement = document.getElementsByClassName('prevElement')[0];
  var nextElement = document.getElementsByClassName('nextElement')[0];

  //If the currentRoomIndex is going below 0 then previous element is removed
  if(currentRoomIndex-1 < 0){
    if(prevElement != undefined){
      prevElement.innerHTML = "";
    }
  } else {
    //Create the previous element with event handler to take to previous room
    if(prevElement != undefined && prevElement.innerHTML === ""){
      prevElement.appendChild(createHyperLink('changeRoom(-1)','&#10094;'));
    }
  }

  //If the currentRoomIndex is going beyond length then next element
  //is removed
  if(currentRoomIndex + 1 > room.length - 1){
    if(nextElement != undefined){
      nextElement.innerHTML = "";
    }
  } else {
    //Create the next element with event handler to take to next room
    if(nextElement != undefined && nextElement.innerHTML === ""){
      nextElement.appendChild(createHyperLink('changeRoom(1)','&#10095;'));
    }
  }

  //Clear the current room and add the new room prev or next one
  var roomContainer = document.getElementsByClassName('roomContainer')[0];
  roomContainer.innerHTML = "";
  createRoom(room[currentRoomIndex], roomContainer);
}

/*
  addTouchStartEvent(element, itemId) : Event handler to handle touch start
  Parameters:
  element: The item element
  itemId: The itemId of the item
  Example:
  var ele = createDiv() // item
  addTouchStartEvent(ele, 1): adds touchstart event to the element
*/
function addTouchStartEvent(element, itemId) {
  //Adding event handler for ontouch start event
  element.addEventListener('touchstart', function(event){
    //Proceed only when item is draggable
    if(element.getAttribute('draggable') == 'true') {
      //Change the style of the element to get the draggable effect
      element.style.width = 'auto';
      element.style.position = 'absolute';

      //Check the target room container position
      var roomElement = document.getElementById("room_"+getRoomId(itemId));
      var roomLoc = roomElement.getBoundingClientRect();

      //Make the width of item beong dragged equal to width of room to be
      //dropped on
      element.style.width = roomLoc.width;

      //Scroll to left panel in case of portrait mode
      if(window.innerWidth < window.innerHeight){
        document.getElementsByClassName(
                                'leftPanelRoomsContainer')[0].scrollIntoView();
      }
    }
  });
}

/*
  addTouchMoveEvent(element): function to handle touch move event on item to
  handle the moment of the item
  Parameter:
  element: item element to which the touch move needs to be handled for
  Example:
  var ele = createDiv()// item
  addTouchMoveEvent(ele) : adds the touch move event to the ele
*/
function addTouchMoveEvent(element) {
    //Adding event handler for touchmove start event
  element.addEventListener('touchmove', function(event){
    //Proceed only when item is draggable
    if(element.getAttribute('draggable') == 'true') {
      //Fetch the element which is being touched
      var eleLocation = event.targetTouches[0];
      //Move the item as per the finger moment
      element.style.left = eleLocation.pageX +'px';
      element.style.top = eleLocation.pageY +'px';
    }

    //Focus the room when the item is brought on the room
    focusTheRoom(parseInt(element.style.left),parseInt(element.style.top));

    //Portrait mode we try to manually scroll the left panel to the view
    if(window.innerWidth < window.innerHeight){
      document.getElementsByClassName(
                                'leftPanelRoomsContainer')[0].scrollIntoView();
    }
  });
};

/*
  addTouchEndEvent(element, itemId): function to handle touch end event on item
  to handle the moment of the item
  Parameter:
  element: item element to which the touch end event needs to be handled for
  itemId: The item id of the item for which the event handler needs to be
  handled
  var ele = createDiv()// item
  addTouchMoveEvent(ele,1) : adds the touch move event to the ele
*/
function addTouchEndEvent(element, itemId) {
  //Start focus on the room
  focusTheRoom(0,0);
  //Touchend event handler added to the element
  element.addEventListener('touchend', function(event){
    if(element.getAttribute('draggable') == 'true') {
      event.preventDefault();
      //target room
      var roomElement = document.getElementById("room_"+getRoomId(itemId));
      //get the position of the target room
      var roomLoc = roomElement.getBoundingClientRect();
      element.style.width = roomLoc.width;
      //get the location of item being dragged
      var x = parseInt(element.style.left);
      var y = parseInt(element.style.top);
      //Check if the item is being dragged to correct room
      if (y>roomLoc.top && y<roomLoc.bottom && x> roomLoc.left &&
          x < roomLoc.right) {
        //Proceed to next question
        handleGameProgress(true);
      } else {
        //Send the item back to initial position
        element.style.width = '';
        element.style.position = '';
        handleGameProgress(false);
      }
    }
  });
};

/*
  getRoomId(itemId) : Gives room id of the room that contains the given item id
  Parameters:
  itemId : the id of the item for which room needs to be traced
  returns the id of the room whoch contains the given item id
  Example:
  getRoomId(1):returns the id of room containing the item id 1
*/
function getRoomId(itemId) {
  for(var i=0; i<room.length; i++) {
    if(room[i].itemId.includes(itemId)){
      return room[i].roomId;
    }
  }
}

/*
  resetLeftPanel : Toggles between keyboard and rooms
  Toggles to keyboard once mapping of item to room is done
  Toggles to rooms once correct name is given in the item name text field
*/
function resetLeftPanel(){
  //get keyboard and rooms conatiner
  var keyBoardContainer = document.getElementsByClassName(
                                                        'keyBoardContainer')[0];
  var leftPanelRoomsContainer = document.getElementsByClassName(
                                                  'leftPanelRoomsContainer')[0];

  //toggle between the containers
  keyBoardContainer.classList.toggle('hide');
  leftPanelRoomsContainer.classList.toggle('hide');
}

/*
  focusTheRoom(x, y) : Focuses the room on which we drop the item
  Useful in the mobile devices landscape mode
  Parameters:
  x: The x position of the room being dragged
  y: The y position of the item being dragged
*/
function focusTheRoom(x, y) {
  for(var i=0; i<currentRoomList.length; i++) {
    var roomElement = document.getElementById("room_"+currentRoomList[i].roomId);
    if(roomElement != undefined){
      roomElement.classList.remove('focus');
      var roomLoc = roomElement.getBoundingClientRect();
      if(y>roomLoc.top && y<roomLoc.bottom && x> roomLoc.left &&
        x< roomLoc.right) {
          roomElement.classList.add('focus');
      }
    }
  }
}

/*
  handleGameProgress(correct): Called after giving correct answer/ correct
  mapping
  Parameter:
  correct: states if the answer given was correct or not.
  Based on correct flag it calls gameOver function with specific reason or
  moves to next question.
  Example:
  handleGameProgress(true): Increses score by 10 and itemcorrect by one and
  finally takes you next question if maximum item for current level
  is not met else takes to next level if maximum level is not yet else takes to
  game win scenario
*/

function handleGameProgress(correct) {
  //If answer is correct
  if(correct) {
    //Increse score by 10
    score += 10;
    //Increse item correct by one
    itemCorrect += 1;
    //If the max items for level is reached
    if(itemCorrect == fetchMaxItems()){
      //If level is equal to nuber of levels configured
      if(level == config.numberOfLevels){
        //Take to game win scenario
        gameOver('won');
        //Reset score to 0
        score = 0;
      } else {
        //Level is coompleted scenario
        updateItemsRemaining();
        gameOver('levelUp');
      }
    } else {
      //Next question in same level scenario
      removeCurrentItem();
      resetRightPanel();
      resetLeftPanel();
      updateTeddyDialogueMessage(teddyDialogues.gameCorrectMapping);
    }
  } else {
    //Reduce the score by 5 if score is not zero else game over
    if(score > 0){
      //score reduced by 5
      score -= 5;
      //fetch score element by id and upadte the reduced score
      var score_ele = document.getElementById('score');
      score_ele.innerHTML = "Score "+score;
      updateTeddyDialogueMessage(teddyDialogues.gameIncorrectMapping);
    } else {
      //game over as score went below zero
      gameOver('score');
    }
  }
}

/*
  showAttributions() : Function that takes to attributions page
  returns attributions page
  return element format:

*/
function showAttributions() {
  document.body.innerHTML = '';
  document.body.appendChild(createAttributionContent());
}
