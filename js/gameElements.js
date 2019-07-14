/**

  gameElements.js : This fie contains all the reusable game elements.
  Different functions from app.js based on game logic call the functions in
  this file to create and content to be displayed.
  Author: Rajesh Kallumari
  Email: rkallumari@deakin.edu.au

**/


/*
  createLandingPageContent(): Creates the landing page
  returns the element that contains title, play now button, learn now button
  and a friendly message from teddy
  Called whenever landing page needs to be created
  return element format:
  <div class="mainContainer">
    <div class="landingPageHeader">
      <div class="mainTitle">P I I P</div>
      <div id="speaker"><img alt="Image Not Found"
        src="images/speaker_off.svg" class="headerIcon">
      </div>
    </div>
    <div class="levelOneTitleContainer">
      <button>I will first learn</button><br>
      <button>I am ready to play</button>
    </div>
    <div class="teddyLandingPageContainer">
      <img alt="image not found" src="images/teddy.svg"
        class="teddyLandingPage">
      <div class="dialogue-box landing-dialogue-box">
        <div class="tdialogue-box-text">Welcome to Place
          In Its Place!What do you wanna do?
        </div>
        <div class="triangle-with-shadow">
        </div>
      </div>
    </div>
  </div>
*/
function createLandingPageContent(){
  toggleFixedHeight(true); //fixing body height to avoid fluctuations

  //the main container for the page
  var landingPageDiv = createDiv();
  landingPageDiv.classList.add('mainContainer');

  //Creating the header section for landing page
  var landingPageHeader = createDiv();
  landingPageHeader.classList.add('landingPageHeader');
  var title = createDiv(headingsAndLabels.mainTitle);//adding main title
  title.classList.add('mainTitle');
  landingPageHeader.appendChild(title);
  landingPageHeader.appendChild(createCopyRightsIcon());
  landingPageHeader.appendChild(createSpeakerIcon()); //adding speaker icon
  landingPageDiv.appendChild(landingPageHeader);

  //Creating left part of landing page
  var titleAndButtonsDiv = createDiv();
  var learnFirstButton = createButton(headingsAndLabels.learnFirstButtonLabel);
  //Event handler to fetch room selection page for learn button
  learnFirstButton.onclick = loadRoomSelectionPage;
  titleAndButtonsDiv.appendChild(learnFirstButton);
  titleAndButtonsDiv.appendChild(createBreakLine());
  var playNowButton = createButton(headingsAndLabels.readyToPlayButtonLabel);
  //Event handler to fetch level selection page for play now button
  playNowButton.onclick = loadLevelSelectionPage;
  titleAndButtonsDiv.appendChild(playNowButton);
  titleAndButtonsDiv.classList.add('levelOneTitleContainer');

  //Creating teddy element for the landing page
  var teddyElement = createDiv();
  var teddyImage = createImage('image not found','images/teddy.svg');
  teddyImage.classList.add('teddyLandingPage');
  teddyElement.classList.add('teddyLandingPageContainer');
  teddyElement.appendChild(teddyImage);
  //Create dialogue box specific to landing page
  teddyElement.appendChild(createDialogueBox(teddyDialogues.landingPage,
  'landing'));

  //Adding the elements formed to main container
  landingPageDiv.appendChild(titleAndButtonsDiv);
  landingPageDiv.appendChild(teddyElement);

  return landingPageDiv;
}

/*
  CreateLevelSelectionPage() : creates the level selection page
  returns element that has 'lets play' title, learn button, back button,
  different level buttons to select from and a teddy with information.
  Called whenever level selection page needs to dispalyed
  return element format:
  <div class="mainContainer">
    <div class="levelSelectionHeader">
      <div class="backContainer">
        <img alt="Image Not Found" src="images/back.svg" class="headerIcon">
      </div>
      <div class="homePageContainer">
        <img alt="Image Not Found" src="images/home_icon.svg"
          class="headerIcon">
      </div>
      <div class="levelSelectionHeading">Lets Play</div>
      <div class="learnContainer">
        <img alt="Image Not Found" src="images/study.svg"
          class="headerIcon"></div><div id="speaker">
        <img alt="Image Not Found" src="images/speaker_off.svg"
          class="headerIcon">
      </div>
    </div>
    <div class="levelSelectionSection">
      <div class="levelSelectionSubSection">
        <button>Level 1</button>
        <button>Level 2</button>
        <button>Level 3</button>
        <button>Level 4</button>
        <button>Level 5</button>
        <button>Level 6</button>
      </div>
      <div class="levelSelectionSubSection">
        <button>Level 7</button>
        <button>Level 8</button>
        <button>Level 9</button>
        <button>Level 10</button>
        <button>Level 11</button>
        <button>Level 12</button>
      </div>
    </div>
    <div class="teddyLevelSelectionPageContainer">
      <img alt="image not found" src="images/teddy.svg"
        class="teddyLevelSelectionPage">
      <div class="dialogue-box level-dialogue-box">
        <div class="tdialogue-box-text">
          Choose carefully between the levels.The items increases and
          time decrease with level. You can always learn and come back!
        </div>
        <div class="triangle-with-shadow"></div>
      </div>
    </div>
  </div>
*/
function createLevelSelectionPage() {
  toggleFixedHeight(true); //Fixing body height to avoid fluctuations

  //The main container for the page
  var levelSelectionDiv = createDiv();
  levelSelectionDiv.classList.add('mainContainer');

  //Creating the header section for level selection page
  var levelSelectionHeader = createDiv();
  levelSelectionHeader.classList.add('levelSelectionHeader');
  //Create back button to landing page
  levelSelectionHeader.appendChild(createBackButtonIcon('levelSelectionPage'));
  //Create home button to landing page
  levelSelectionHeader.appendChild(createHomePageIcon());
  //Add main title
  var levelSelectionHeading = createDiv(headingsAndLabels.levelSelectionTitle);
  levelSelectionHeading.classList.add('levelSelectionHeading');
  levelSelectionHeader.appendChild(levelSelectionHeading);
  //Add learn icon
  levelSelectionHeader.appendChild(createLearnIcon());
  //Add speaker icon
  levelSelectionHeader.appendChild(createSpeakerIcon());

  //Create the left part of page with level selection buttons
  var levelSelectionSection = createDiv();
  levelSelectionSection.classList.add('levelSelectionSection');
  //One section contains 6 level buttons
  var levelSelectionSubSectionOne = createDiv();
  levelSelectionSubSectionOne.classList.add('levelSelectionSubSection');
  //Create level buttons until 6th level
  for(var i=1; i<=Math.ceil(config.numberOfLevels/2); i++) {
    var levelButton = createButton('Level '+i);
    //Event handler to take to respective level
    addLevelEventHandler(i,levelButton);
    levelSelectionSubSectionOne.appendChild(levelButton);
  }
  var levelSelectionSubSectionTwo = createDiv();
  levelSelectionSubSectionTwo.classList.add('levelSelectionSubSection');
  //Create level buttons until from 7th to 12th level
  for(var i=(Math.ceil(config.numberOfLevels/2)+1); i<=config.numberOfLevels;
      i++) {
    var levelButton = createButton('Level '+i);
    //Event handler to take to respective level
    addLevelEventHandler(i,levelButton);
    levelSelectionSubSectionTwo.appendChild(levelButton);
  }
  levelSelectionSection.appendChild(levelSelectionSubSectionOne);
  levelSelectionSection.appendChild(levelSelectionSubSectionTwo);

  //Create teddy section for level selection page
  var levelSelectionTeddy = createDiv();
  teddyImage = createImage('image not found','images/teddy.svg');
  teddyImage.classList.add('teddyLevelSelectionPage');
  levelSelectionTeddy.appendChild(teddyImage);
  //Adding helping text specific to level selection page
  levelSelectionTeddy.appendChild(
  createDialogueBox(teddyDialogues.levelSelectionPage,'level'));
  levelSelectionTeddy.classList.add('teddyLevelSelectionPageContainer');

  //Adding elements to the main container
  levelSelectionDiv.appendChild(levelSelectionHeader);
  levelSelectionDiv.appendChild(levelSelectionSection);
  levelSelectionDiv.appendChild(levelSelectionTeddy);
  return levelSelectionDiv;
}

/*
  createGameLevelHeader() : creates the header for the game post level selection
  page
  returns a element with header having level name, back button and learn button
  return element format:
  <div class="levelHeader">
    <div class="backContainer">
      <img alt="Image Not Found" src="images/back.svg"
        class="headerIcon"></div><div class="homePageContainer">
      <img alt="Image Not Found" src="images/home_icon.svg"
        class="headerIcon">
    </div>
    <div class="levelHeading">Level 1</div>
    <div class="learnContainer">
      <img alt="Image Not Found" src="images/study.svg"
        class="headerIcon">
    </div>
    <div id="speaker">
      <img alt="Image Not Found" src="images/speaker_off.svg"
        class="headerIcon">
    </div>
  </div>
*/
function createGameLevelHeader(level) {
  //The main container for the header
  var levelHeader = createDiv();
  levelHeader.classList.add('levelHeader');

  //Create the back button landing to level selection page
  levelHeader.appendChild(createBackButtonIcon('gameLevelPage'));

  //Create the home page icon that traverses to landing page
  levelHeader.appendChild(createHomePageIcon());

  //Create the heading of the level like level 1, level 2 and so on
  var levelHeading = createDiv('Level '+level);
  levelHeading.classList.add('levelHeading');
  //Append the title to main header container
  levelHeader.appendChild(levelHeading);

  //Create learn icon that leads to room selection page and append it
  levelHeader.appendChild(createLearnIcon());

  //Create the speaker icon that toggled the music and append it
  levelHeader.appendChild(createSpeakerIcon());

  //Return the main header conatiner to which all the elments were appended.
  return levelHeader;
}

/*
  createLeftPanel() : Creates the left panel in the game page post level
  selection page. Utilises the current room list and creates left side panel
  containing the rooms.
  return a element with four rooms and its respective images
  return element format:
  <div class="leftPanelContainer">
    <div class="leftPanelRoomsContainer hide">
      <div id="room_5" class="leftPanelImageElement"
        style="background-color: rgb(216, 189, 109);">
        <img alt="Image not found" src="images/garden.svg">
        <label>Garden</label>
      </div>
      <div id="room_3" class="leftPanelImageElement"
        style="background-color: rgb(173, 174, 209);">
        <img alt="Image not found" src="images/living_room.svg">
        <label>Living Room</label>
      </div>
      <div id="room_1" class="leftPanelImageElement"
        style="background-color: rgb(255, 232, 203);">
        <img alt="Image not found" src="images/kitchen.svg">
        <label>Kitchen</label>
      </div>
      <div id="room_2" class="leftPanelImageElement"
        style="background-color: rgb(255, 249, 232);">
        <img alt="Image not found" src="images/bedroom.svg">
        <label>Bedroom</label>
      </div>
    </div>
    <div class="keyBoardContainer">
      <div>
        <button>Q</button><button>W</button><button>E</button><button>R</button>
        <button>T</button><button>Y</button><button>U</button><button>I</button>
        <button>O</button><button>P</button></div><div><button>A</button>
        <button>S</button><button>D</button><button>F</button><button>G</button>
        <button>H</button><button>J</button><button>K</button><button>L</button>
      </div>
      <div>
        <button>Z</button><button>X</button><button>C</button><button>V</button>
        <button>B</button><button>N</button><button>M</button>
      </div><div class="lastRow">
        <button>Space</button><button>Backspace</button><button>Clear</button>
        <button>Check</button>
      </div>
    </div>
  </div>
*/
function createLeftPanel(level){
  //Get the four rooms to be displayed in the left panel
  currentRoomList = fetchRoomList();

  //The main container for the left side part of the game page
  var leftPanelContainer = createDiv();
  leftPanelContainer.classList.add('leftPanelContainer');

  //The container for the rooms to be displayed in the left side of game page
  var leftPanelRoomsContainer = createDiv();
  leftPanelRoomsContainer.classList.add('leftPanelRoomsContainer');

  //Background colours for the four rooms displayed in the left side of game
  color = ['rgb(216, 189, 109)','rgb(173, 174, 209)','rgb(255, 232, 203)',
          'rgb(255, 249, 232)']

  //Iterating through the room list to add the rooms to left panel
  for(var i=0; i<currentRoomList.length; i++){
    //Div to hold each room
    var divElement = createDiv();
    //Id formed using room_roomId to retrieve when necessary
    divElement.setAttribute('id','room_'+currentRoomList[i].roomId);
    //Add the room image
    var imageElement = createImage('Image not found',
                          currentRoomList[i].imageUrl);
    //Adding the room name along with the room image
    var label = createLabel(currentRoomList[i].roomName);
    divElement.classList.add('leftPanelImageElement');
    divElement.style.backgroundColor = color[i];
    //Appending the room and room name to room element
    divElement.appendChild(imageElement);
    divElement.appendChild(label);
    //Handling the portrait and landscape design for the game page
    if(window.innerWidth > window.innerHeight){
      //Allow drop in the landscape mode
      addDropAttributes(divElement,currentRoomList[i]);
    } else {
      //Allow click functionality in portrait mode
      addClickValidator(divElement,currentRoomList[i]);
    }
    //Append the room to the main room container
    leftPanelRoomsContainer.appendChild(divElement);
  }

  //Add the room container to the left panel
  leftPanelContainer.appendChild(leftPanelRoomsContainer);
  leftPanelRoomsContainer.classList.add('hide');

  //Add a manual keyboard to type the name of the item displayed
  leftPanelContainer.appendChild(createAndDisplayOnScreenKeyboard());

  //Return the main container that holds all the rooms and left panel
  return leftPanelContainer;
}


/*
  createRightPanel() : Creates the right panel in the game page post level
  selection page utilises the current item list and creates right side panel
  containing an question item
  returns a element with an image of an item, input box to feed the name and
  teddy for information
  return element format:
  <div class="rightPanelContainer">
    <div class="questionElement">
      <div>
        <span id="score">Score 0</span>
        <span id="timer">Time Left 4:32</span>
        <span id="itemsRemaining">Items Remaining 3</span>
      </div>
      <img alt="Image not found" src="images/toilet_paper.svg" id="item_16"
        draggable="false">
      <input type="text" id="answerInputElement" readonly="true">
    </div>
    <div class="gameTeddyElement">
      <img alt="Image not found" src="images/teddy.svg"
        class="gameTeddyImage">
      <div class="dialogue-box game-dialogue-box">
        <div class="tdialogue-box-text">Give the correct name of the item
          dispalyed in the input box!Use the keypad on the left side!
        </div>
        <div class="triangle-with-shadow">
        </div>
      </div>
    </div>
  </div>
*/
function createRightPanel(level){
  //Randomly fetches the items for a given level
  currentItemList = fetchItemList(level);

  //The level needs more items so return undefined to handle the message
  if(currentItemList == undefined) {
    return undefined;
  }

  //Create the main container for the right panel of the game
  var rightPanelContainer = createDiv();
  rightPanelContainer.classList.add('rightPanelContainer');

  //Create the question element which contains score, timer, items remaining,
  //item image and a input box for the item name
  var questionElement = createDiv();
  questionElement.classList.add('questionElement');

  //Create and append the score, timer, items remaining, item image and
  //input box for item
  createQuestion(questionElement);

  //Add the teddy element for the game instructions
  var teddyElement = createDiv();
  teddyElement.classList.add('gameTeddyElement');
  var teddyImage = createImage('Image not found','images/teddy.svg');
  teddyImage.classList.add('gameTeddyImage');
  teddyElement.appendChild(teddyImage);

  //Change the text in dialogue of teddy based on landscape and portrait mode
  if(window.innerWidth > window.innerHeight) {
    teddyElement.appendChild(
                createDialogueBox(teddyDialogues.gameLandingHelpNormal,'game'));
  } else {
    teddyElement.appendChild(
              createDialogueBox(teddyDialogues.gameLandingHelpPotrait,'game'));
  }

  //Add the question and teddy element to main container
  rightPanelContainer.appendChild(questionElement);
  rightPanelContainer.appendChild(teddyElement);

  //Return the element with the question and teddy elements
  return rightPanelContainer;
}

/*
  createQuestion(questionElement): Updates the question element in
  right panel with score, timer, items remaining, item image and
  input box for the item name
  questionElement : The main question HTML element div to which the the above
                    mentioned items are appended
  function call example:
    var div = createDiv();
    questionElement.classList.add('questionElement');
    createQuestion(div);
  A updated question element div that is the result of the function call:
  <div class="questionElement" style="opacity: 0.5;">
    <div>
      <span id="score">Score 0</span>
      <span id="timer">Time Left 0:0</span>
      <span id="itemsRemaining">Items Remaining 3</span>
    </div>
    <img alt="Image not found" src="images/toilet_paper.svg"
      id="item_16" draggable="false">
    <input type="text" id="answerInputElement" readonly="true" disabled="true">
  </div>
*/
function createQuestion(questionElement){
  //Get a random number within the list the
  var random = getRandomInt(0,currentItemList.length-1);

  //Get an item randomly from the list filtered as per rooms chosen for level
  currentItem = currentItemList[random];

  //Remove the item taken  to display as we dont want to appear again in level
  currentItemList.splice(random,1);

  //Creating the header element for the question
  var questionHeaderElement = createDiv();
  //Creating score to be displayed in the header
  var score_element = createSpan(headingsAndLabels.gameScore + " " + score);
  score_element.setAttribute('id','score');
  //Appending the score to the header
  questionHeaderElement.appendChild(score_element);
  //Creating a timer to be displayed in the header
  var timer_element = createSpan();
  timer_element.setAttribute('id','timer');
  questionHeaderElement.appendChild(timer_element);
  //Create the element to display the items remaining for the level in header
  var items_remaining_element = createSpan(headingsAndLabels.itemsRemaining +
                                ' ' +  (fetchMaxItems() - itemCorrect));
  items_remaining_element.setAttribute('id','itemsRemaining');
  questionHeaderElement.appendChild(items_remaining_element);

  //Adding the header to the main question element
  questionElement.appendChild(questionHeaderElement);

  //Adding the image of the item
  var imageElement = createImage('Image not found',currentItem.imageUrl);
  imageElement.setAttribute('id','item_'+currentItem.itemId);

  //By default make the image non-draggable
  imageElement.setAttribute('draggable','false');

  //Apply the grag feature to only the landscape features
  if(window.innerWidth > window.innerHeight) {
    //Add ondragstart event to the item image
    imageElement.ondragstart = function(event) {
      event.dataTransfer.setData('itemId',currentItem.itemId);
    }
    //Add touch start, touch move and touch events for mobile devices
    addTouchStartEvent(imageElement,currentItem.itemId);
    addTouchMoveEvent(imageElement);
    addTouchEndEvent(imageElement,currentItem.itemId);
  }

  //Add input text box for item name
  var inputElement = createTextInput();
  inputElement.setAttribute('id','answerInputElement');
  inputElement.setAttribute('readonly','true');

  //Scroll to keyboard on click of the input box
  //Useful in portrait model
  inputElement.onclick = scrollKeyBoardIntoView;

  //Add the item image and input box to question element
  questionElement.appendChild(imageElement);
  questionElement.appendChild(inputElement);

  //Set timer indicating max time per item that varies per level
  setTimer(fetchMaxTime());
}

/*
  addLevelEventHandler(level,button) : Create an event handler for level
  selection buttons
  Parameters:
  level: the level the button denotes
  button: the button element
  Example:
  addLevelEventHandler(1,levelButton) creates a event handler for
  levelButton with input to event handler loadgamepage as 1
*/
function addLevelEventHandler(level,button) {
  button.onclick = function() {
    loadGamePage(level);
  }
}

/*
  createDialogueBox() : creates the dialogue box with text to show upon the
  teddy image
  Parameters:
  content: The content to show in the teddy dialogue box
  location: The page where the teddy is tobe displayed.
  returns the teddy element with styles as per the page
  return element format:
  <div class="dialogue-box level-dialogue-box">
    <div class="tdialogue-box-text">
      content
    </div>
    <div class="triangle-with-shadow">
    </div>
  </div>
*/
function createDialogueBox(content,location) {
  //Create the main dialogue box
  var dialogueBox = createDiv();
  dialogueBox.classList.add('dialogue-box');

  //Add location specific dialogue box class
  dialogueBox.classList.add(location+'-dialogue-box');

  //The content to be shown in the dialogue
  var teddyDialogue = createDiv(content);
  teddyDialogue.classList.add('tdialogue-box-text');

  //Giving a comment kind of styling
  var dialogueTraingle = createDiv();
  dialogueTraingle.classList.add('triangle-with-shadow');

  //Appending the dialogue text and comment kind styling to main element.
  dialogueBox.appendChild(teddyDialogue);
  dialogueBox.appendChild(dialogueTraingle);

  //Returning the main dialogue element
  return dialogueBox;
}

/*
  createRoomSelectionPage() : create the room selection pagein learning screens.
  returns an element with set of rooms to be selected from.
  returns an element of the format:
  <div class="mainContainer">
    <div class="roomSelectionHeader">
      <div class="backContainer">
        <img alt="Image Not Found" src="images/back.svg" class="headerIcon">
      </div>
      <div class="homePageContainer">
        <img alt="Image Not Found" src="images/home_icon.svg"
        class="headerIcon">
      </div>
      <div id="speaker">
        <img alt="Image Not Found" src="images/speaker_off.svg"
        class="headerIcon">
      </div>
    </div>
    <div class="roomCarouselContainer">
      <div class="prevElement">
        <a onclick="changeRoom(-1)">❮</a></div><div class="roomContainer">
        <div class="roomTitle">Bedroom</div>
        <img alt="Image Not Found" src="images/bedroom.svg">
      </div>
      <div class="nextElement">
        <a onclick="changeRoom(1)">❯</a>
      </div>
    </div>
  </div>
*/
function createRoomSelectionPage() {
  //Set a fixed height for the page
  toggleFixedHeight(true);
  //Create a main container for room selection page
  var mainContainer = createDiv();
  mainContainer.classList.add('mainContainer');

  //Header for the room selection page
  var roomSelectiocHeader = createDiv();
  roomSelectiocHeader.classList.add('roomSelectionHeader');
  //Adding back button to level selection page
  roomSelectiocHeader.appendChild(createBackButtonIcon('roomSelectionPage'));
  //Adding home page icon to landing page
  roomSelectiocHeader.appendChild(createHomePageIcon());
  //Adding speaker icon to the header
  roomSelectiocHeader.appendChild(createSpeakerIcon());
  //Adding header to main container
  mainContainer.appendChild(roomSelectiocHeader);

  //The room carousel ontainer that contains the pagination and room images
  var roomCarouselContainer = createDiv();
  roomCarouselContainer.classList.add('roomCarouselContainer');

  //Show the center room by default
  currentRoomIndex = Math.floor(room.length/2) - 1;

  //Fetch the middle room to be displayed
  var roomInBox = room[currentRoomIndex];

  //Create and add pagination elements
  //The pagination prev element container
  var prevElementContainer = createDiv();
  //The previous element to traverse to previous room.
  var prevElement = createHyperLink('changeRoom(-1)','&#10094;');
  prevElementContainer.classList.add("prevElement");
  prevElementContainer.appendChild(prevElement);
  //The pagination next element container
  var nextElementContainer = createDiv();
  //The next element to traverse to next room.
  var nextElement = createHyperLink('changeRoom(1)','&#10095;');
  nextElementContainer.classList.add("nextElement");
  nextElementContainer.appendChild(nextElement);
  //Append the next and prev elements to the room carousel container
  roomCarouselContainer.appendChild(prevElementContainer);
  roomCarouselContainer.appendChild(createRoomInTheBox(roomInBox.roomId));
  roomCarouselContainer.appendChild(nextElementContainer);
  mainContainer.appendChild(roomCarouselContainer);

  //Returns element with rooms to select with pagination
  return mainContainer;
}

/*
  createRoomInTheBox(roomId) : Creates a room container with room image and
  returns it.
  Parameter:
  roomId : The Id of the room to be created.
  Example:
  createRoomInTheBox(2) : retrieves room info for room id 2 and creates the
  room and retruns it.
  return element format:
  <div class="roomContainer">
    <div class="roomTitle">Bedroom</div>
    <img alt="Image Not Found" src="images/bedroom.svg">
  </div>
*/
function createRoomInTheBox(roomId){
  var roomToFocus;
  //Iterating through the rooms list to fetch the room matching with id passed.
  for(var i=0; i < room.length; i++){
    if(room[i].roomId === roomId){
      roomToFocus = room[i];
      break;
    }
  }

  //Form the main room container
  var roomContainer = createDiv();
  roomContainer.classList.add('roomContainer');
  //Create the room and append it to room container
  createRoom(roomToFocus, roomContainer);

  //Returns the main room container with room image
  return roomContainer;
}

/*
  createRoom(roomToFocus, roomContainer) : Creates room with its image and name
  and appends it to the main container passed.
  Parameters:
  roomToFocus: the room to be displayed
  roomContainer: the main container for the room.
  Example:
    var roomContainer = createDiv();
    var roomToFocus = room[1]
    createRoom(roomToFocus, roomContainer) will update roomContainer with the
    roomToFocus room.
  The element updated to roomContainer:
    <div class="roomTitle">Bedroom</div>
    <img alt="Image Not Found" src="images/bedroom.svg">
*/
function createRoom(roomToFocus, roomContainer) {
  //The room name
  var roomTitle = createDiv(roomToFocus.roomName);
  roomTitle.classList.add('roomTitle');
  roomContainer.appendChild(roomTitle);
  //The room image
  var roomImage = createImage("Image Not Found",roomToFocus.imageUrl);
  //Add event handler to the contaoner to get the items of room on click
  roomContainer.onclick = function() {
    fetchItems(roomToFocus.roomId);
  };
  //Append the room name and room image to room contaier passed to function
  roomContainer.appendChild(roomTitle);
  roomContainer.appendChild(roomImage);
}

/*
  createItemsPage(finalItemsList) : creates the item page based on list passed.
  Parameters:
  finalItemsList: The items list based on room select.
  return an element with all the item names and images based on room selected.
  Example:
  var finalItemsList = [item1, item2]
  createItemsPage(finalItemsList)
  returns a page of items in the finalItemsList page
  returns element format:
  <div class="mainContainer">
    <div class="itemsPageHeader">
      <div class="backContainer">
        <img alt="Image Not Found" src="images/back.svg" class="headerIcon">
      </div>
      <div class="homePageContainer">
        <img alt="Image Not Found" src="images/home_icon.svg"
        class="headerIcon">
      </div>
      <div id="speaker">
        <img alt="Image Not Found" src="images/speaker_off.svg"
        class="headerIcon">
      </div>
    </div>
    <div class="itemsContainer"><div class="itemImageContainer">
      <img alt="Image Not Found" src="images/bed.svg">
      <span>Bed</span>
    </div>
    <div class="itemImageContainer">
      <img alt="Image Not Found" src="images/wardrobe.svg">
      <span>Wardrobe</span>
    </div>
    <div class="itemImageContainer">
      <img alt="Image Not Found" src="images/dresser.svg">
      <span>Dresser</span>
    </div>
    <div class="itemImageContainer">
      <img alt="Image Not Found" src="images/bunkbed.svg">
      <span>Bunk bed</span>
    </div>
  </div>
*/
function createItemsPage(finalItemsList){
  //Allow scroll in overflow y as items will be spreaded vertically
  toggleFixedHeight(false);

  //The main container for hoding the items
  var mainContainer = createDiv();
  mainContainer.classList.add('mainContainer');

  //The header part of the items page
  //Creating the header container
  var itemsPageHeader = createDiv();
  itemsPageHeader.classList.add('itemsPageHeader');
  //Appending the back button to room selection page to the header
  itemsPageHeader.appendChild(createBackButtonIcon('itemViewPage'));
  //Appending the home page icon leading to landing page to the header
  itemsPageHeader.appendChild(createHomePageIcon());
  //Appending the speaker icon for toggling music to the header
  itemsPageHeader.appendChild(createSpeakerIcon());
  //Appending the header created to the main container
  mainContainer.appendChild(itemsPageHeader);

  //Create the items conatiner to hold all the items
  var itemsContainer = createDiv();
  itemsContainer.classList.add('itemsContainer');

  //Iterate towards the items to create item and add them to the container
  for(var i=0; i<finalItemsList.length; i++) {
    //Container for the individual item
    var itemImageContainer = createDiv();
    itemImageContainer.classList.add('itemImageContainer');
    //Image of the the individual item
    var itemImage = createImage("Image Not Found",finalItemsList[i].imageUrl);
    //Appending the individual item image to individual item container
    itemImageContainer.appendChild(itemImage);
    //Appending the name of the item to individual item container
    itemImageContainer.appendChild(createSpan(finalItemsList[i].itemName));
    //Appending the individual item container to the main item container
    itemsContainer.appendChild(itemImageContainer);
  }

  //Appending the items cotainer to the main container
  mainContainer.appendChild(itemsContainer);

  //An element containing all the items is returned
  return mainContainer;
}

/*
  createSpeakerIcon() : This function creates the speaker icon displayed in
  every page that helps in toggling the music across application.
  returns a HTML element with speaker content.
  return element format:
  <div id="speaker">
    <img alt="Image Not Found" src="images/speaker_off.svg" class="headerIcon">
  </div>
*/
function createSpeakerIcon() {
  //Creates a container to hold the speaker
  var speakerDiv = createDiv();

  //Setting an ID for easy toggling of image on music change
  speakerDiv.setAttribute('id','speaker');

  //Adding the speaker image as per the music is on or off currently
  var speakerImg = createImage('Image Not Found','images/'+speakerImage+'.svg');
  speakerImg.classList.add('headerIcon');

  //Adding event handler to toggle music when clicking on the speaker icon
  speakerImg.onclick = toggleMusic;

  //Appending the speaker image to the speaker container
  speakerDiv.appendChild(speakerImg);

  //returning the element with speaker content
  return speakerDiv;
}

/*
*/
function createCopyRightsIcon() {
  //Creates a container to hold the cc icon
  var ccDiv = createDiv();
  ccDiv.classList.add('ccContainer');
  //Adding the speaker image as per the music is on or off currently
  var ccImg = createImage('Image Not Found','images/cc.svg');
  ccImg.classList.add('headerIcon');

  //Adding event handler to toggle music when clicking on the speaker icon
  ccImg.onclick = showAttributions;

  //Appending the speaker image to the speaker container
  ccDiv.appendChild(ccImg);

  //returning the element with speaker content
  return ccDiv;
}

/*
  createHomePageIcon() : This function creates the home page icon displayed in
  every page except landing page that helps in navigating to landing page.
  returns a HTML element with home page icon content.
  return element format:
  <div class="homePageContainer">
    <img alt="Image Not Found" src="images/home_icon.svg" class="headerIcon">
  </div>
*/
function createHomePageIcon() {
  //The container to hold the home page icon
  var homePageContainer = createDiv();
  homePageContainer.classList.add('homePageContainer');

  //Create the home page icon image
  var homePageIcon = createImage('Image Not Found','images/home_icon.svg');
  homePageIcon.classList.add('headerIcon');

  //Add the eveent handler to the icon to redirect to the landing page.
  homePageIcon.onclick = loadLandingPage;
  homePageContainer.appendChild(homePageIcon);

  //returns the element with the home page icon content
  return homePageContainer;
}

/*
  createHomePageIcon(page) : This function creates the back icon displayed in
  every page except landing page that helps in navigating to previous page.
  Parameters:
  page: This attribute takes in the page where the back button is needed so
  that it can decide on previous page to be redirected to on click of it.
  Example:
  createBackButtonIcon('levelSelectionPage')
  returns a back button icon that redirects to landing page
  return element format:
  <div class="backContainer">
    <img alt="Image Not Found" src="images/back.svg" class="headerIcon">
  </div>
*/
function createBackButtonIcon(page) {
  //The container to hold the back button
  var backContainer = createDiv();
  backContainer.classList.add('backContainer');

  //Creating the back icon image
  var backImg = createImage('Image Not Found','images/back.svg');
  backImg.classList.add('headerIcon');

  //Adding a switch case to decide on the page to redirect based on page where
  //back icon is to be displayed
  switch(page){
      case 'levelSelectionPage':
        backImg.onclick = loadLandingPage;
        break;
      case 'gameLevelPage':
        backImg.onclick = loadLevelSelectionPage;
        break;
      case 'roomSelectionPage':
        backImg.onclick = loadLandingPage;
        break;
      case 'itemViewPage':
        backImg.onclick = loadRoomSelectionPage;
        break;
  }
  //Append the back icon image to the container
  backContainer.appendChild(backImg);

  //Return the element containing the back button
  return backContainer;
}

/*
  createLearnIcon() : This function creates the learn icon displayed in
  every page except landing page that helps in navigating to room selection
  page.
  returns an element containing the learn icon.
  return element format:
  <div class="learnContainer">
    <img alt="Image Not Found" src="images/study.svg" class="headerIcon">
  </div>
*/
function createLearnIcon() {
  //The container that holds the learn icon
  var learnDivContainer = createDiv();
  learnDivContainer.classList.add('learnContainer');

  //Create the learn icon image
  var learnImg = createImage('Image Not Found', 'images/study.svg');
  learnImg.classList.add('headerIcon');

  //Add the event handler to redirect to room selection page on click of
  //learn icon
  learnImg.onclick = loadRoomSelectionPage;

  //Append the image to the learn icon container
  learnDivContainer.appendChild(learnImg);

  //return element containing the learn icon
  return learnDivContainer;
}

/*
  createAndDisplayOnScreenKeyboard() : Creates the manual keybard.
  Returns the element with the manual key board element.
  return element format:
  <div class="keyBoardContainer">
    <div>
      <button>Q</button><button>W</button><button>E</button>
      <button>R</button><button>T</button><button>Y</button><button>U</button>
      <button>I</button><button>O</button><button>P</button>
    </div>
    <div>
      <button>A</button><button>S</button><button>D</button><button>F</button>
      <button>G</button><button>H</button><button>J</button><button>K</button>
      <button>L</button></div><div><button>Z</button><button>X</button>
      <button>C</button><button>V</button><button>B</button><button>N</button>
      <button>M</button>
    </div>
    <div class="lastRow">
      <button>Space</button><button>Backspace</button><button>Clear</button>
      <button>Check</button>
    </div>
  </div>
*/
function createAndDisplayOnScreenKeyboard() {
  //Various rows in the keyboard
  var rows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"],
  ['Space', 'Backspace', 'Clear', 'Check']
  ];

  //The main keyboard container
  var keyBoardContainer = createDiv();
  keyBoardContainer.classList.add('keyBoardContainer');

  //Iterating through the rows to form and add rows to keyBoardContainer
  for (var rowIndex in rows) {
    //Fetching each row
    var row = rows[rowIndex];
    //Creating a container for entir row
    var rowDiv = createDiv();
    //Iterate towards the letters present in each row and create buttons
    for (var index in row) {
      //Retrieve the character from array
      var key = row[index];
      //Creating the button for the character
      var button = createButton(key);
      //Adding event handler for the button click that adds the character to
      //the input element for item name
      addEventHandlerEachKey(button, key);
      //If the element is last row add style class lastRow
      if(key === 'Space'){
        rowDiv.classList.add('lastRow');
      }
      //Add the button to the row div
      rowDiv.appendChild(button);
    } //End of the for loop for the each row
    keyBoardContainer.appendChild(rowDiv);
  } //End of for loop for all the rows

  //returns a manual keyboard element containing all the keys.
  return keyBoardContainer;
}

/*
  addTypedCharacterToItemName(character) : This function checks the character
  typed on the manual keyboard and adds it to the item name input field
  accordingy.
  Parameters:
  character : This attribute holds the character typed by user currently
  Example:
  addTypedCharacterToItemName('D') : Adds the character to the item name input
  field.
*/
function addTypedCharacterToItemName(character) {
  //If the entered character is check proceed to validate the charcters typed
  //so far
  //Check if the character entered is space and add space to input box
  //content if the it is space
  //Check if the character entered is backspace and if there is content in
  //the item input field then remove the last character in the content.
  //Check if the character entered is clear and clear the content in item
  //input box accordingly.
  if(character.toLowerCase() != 'check') {
    //Get the item name input element to fecth the value typed so far.
    var inputElement = document.getElementById('answerInputElement');

    if(character.toLowerCase() === 'space') {
      inputElement.value += " ";
    } else if(character.toLowerCase() === 'backspace' &&
              inputElement.value.length > 0) {
      inputElement.value = inputElement.value.substring(0,
                            inputElement.value.length - 1);
    } else if(character.toLowerCase() === 'clear'){
      inputElement.value = "";
    } else if(character.toLowerCase() !== 'clear' &&
              character.toLowerCase() !== 'backspace'){
      inputElement.value += character;
    }

  } else {
    //Validate the content of item input box as user clicked on check
    validateTheEnteredName();
  }

  //Play the button click sound if the speaker is on.
  if(speakerImage === 'speaker_on') {
    sounds.buttonClick.play();
  }
}

/*
  addEventHandlerEachKey(button, character) :  Add on click event handler to
  the button element passed to function.
  parameters:
  button: Each and every button in the manual keyboard.
  character: The character the button represents
  Example:
  var button = createButton('D')
  addEventHandlerEachKey(button, 'D') : Adds an event handler that sends the
  character typed to be added to the item name input field.
*/
function addEventHandlerEachKey(button, character) {
  //Add the event handler to send the character typed to be to be added to the
  //item name input field.
  button.onclick = function() {
    addTypedCharacterToItemName(character);
  };
}

/*
  toggleFixedHeight(required): Adds/removes a overflow-y hidden/scroll style
  on the body based on the boolean flag required passed.
  Parameters:
  required: A boolean flag to tell if the fixed height class needs to be
  added to body or to be removed
  Example:
  toggleFixedHeight(true) : Adds the style fixedheight to the main body
*/
function toggleFixedHeight(required) {
  //Get the main body element
  var body = document.getElementsByTagName('body')[0];
  //Add/remove the fixedHeight class based on flag required
  if(required) {
    body.classList.add('fixedHeight');
  } else {
    body.classList.remove('fixedHeight');
  }
}

/*
  scrollKeyBoardIntoView(): This function brings the manual keyboard into the
  view when clicked on the item name input field.
  It is especially useful in portrait mode as it is required o scroll down for
  keyboard in the game page.
*/
function scrollKeyBoardIntoView() {
  //Fetch keyboard element using its classname
  var keyboard = document.getElementsByClassName('keyBoardContainer')[0];
  //Scroll the view to this keyboard element.
  keyboard.scrollIntoView();
}

/*
  scrollRightPanelContainer(): This function helps to scroll to the question
  element from the manual keyboard/room choosing section of left panel after
  user press check / selects the room the item needs to be mapped to.
  This is especially useful in portrait mode as the user has to scroll
  up to see the next question/ result after clicking on check on the keyboard
  post giving the name of the item or selecting the room the item is to be
  mapped.
*/
function scrollRightPanelContainer() {
  //Fetch the right panel element
  var ele = document.getElementsByClassName('rightPanelContainer')[0];
  //Scroll the view to the rightpanel element.
  ele.scrollIntoView();
}

/*
  createAttributionContent() : This function creates the attribution content
  that can be appended to the landing page.

*/
function createAttributionContent() {
  //Make sure the content is scrollable
  toggleFixedHeight(false);

  //The main container for the attributons
  var attributionContainer = createDiv();
  attributionContainer.classList.add('mainContainer');

  //Creating the header section for Attributions
  var attributionHeader = createDiv();
  attributionHeader.classList.add('AttributionHeader');

  //Create back button to landing page
  attributionHeader.appendChild(createBackButtonIcon('levelSelectionPage'));

  //Add main title
  var attributionHeading = createDiv(headingsAndLabels.attributions);
  attributionHeading.classList.add('attributionHeading');
  attributionHeader.appendChild(attributionHeading);
  attributionContainer.appendChild(attributionHeader);

  //Attribute sections containing all attributes
  var attributionSection = createDiv();
  attributionSection.classList.add('attributionSection');

  //Iterate through the attributes to fetch and display the attributions
  for(i = 0; i < attributions.length; i++) {
    var attributionElement = createDiv();
    attributionElement.classList.add('attributionText');
    var attributionTitle = createLabel(attributions[i].attributionFor + ": ");
    var attributionContent = createSpan(attributions[i].attributionContent);
    attributionElement.appendChild(attributionTitle);
    attributionElement.appendChild(attributionContent);
    attributionSection.appendChild(attributionElement);
  }
  attributionContainer.appendChild(attributionSection);

  //return page with all the attributions
  return attributionContainer;
}
