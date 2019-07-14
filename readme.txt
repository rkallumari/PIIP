          ------------------------------x Purpose x-------------------------------------

This doc gives a overview of the application

          ------------------------------x General Info x---------------------------------

Developer: Rajesh Kallumari
Contact: rkallumari@deakin.edu.au
App name : Place In Its Place (PIIP)
Overview:
Place In Its Place aka PIIP is a game that is targeted for educating kids of age group 5-12 years about various items present in the
house, their names in English language with proper spellings and finally enlighten them where those items are to be placed in the room.
The game also desires to get a motto of cleanliness and discipline in kids by growing their awareness on where to place things in the house.
To make it more captivating for kids the items and rooms included are all cartoons and also game comes with a cute teddy that will guide
the player through out the game.
With pleasing cartoons, teddy as the assistant I am confident game will turn out attractive and useful for kids.


          -------------------------------x Various Game Pages x--------------------------

The game is divided into six different screens
Landing page : The home page of game with options to traverse to learning pages or game pages.
Level selection page : This page occurs in between landing and game selection pages. It gives opportunity to select level user likes to play.
Game page: This is the playground where real game is up. Name the item, map it to the correct room will be the motto.
Room Selection Page: This page is part of learning screens an gives an option to select the room to be learnt about with pagination.
Items Display Page: This page displays the items related to the room selected in room selection page.
Attributions Page: This page displays the attribution as per authors request for images and sounds taken from external sources.


          ------------------------------x Major Features x-------------------------------

-> The instructions about the game play will be made available through teddy dialogue boxes.
-> As of now a total of 5 rooms with 10 items each has been collected for the game.
-> Game page will have a total of 4 rooms taken randomly from 5 rooms available in its left panel.
-> Based on rooms taken in above step, questions are formed by randomly choosing items available in rooms picked and displayed in right panel.
-> Each question expects the correct name of the item (case insensitive) and mapping of the item to correct room .
-> The time given for the answering the question decreases with the level.
-> Also, the number of questions in each level increases with the level.
-> As of now a total of 12 levels with each level increasing 3 items and decreasing the time given by 30 seconds is configured.
-> The number of levels, items per level and time per level are all configurable.
-> There is an option to traverse to study page across the application where desired room can be chosen and its items can be read.
-> The new items and rooms can be added and it gets dynamically incorporated both into game and study pages.
-> Two different music for normal game flow, game win/ level up flows are played as per the scenario.
-> A manual keyboard is given in the game pages with letters, space, backspace, clear and check options for typing the item name.
-> A separate button click sound is incorporated for the buttons in manual keyboard.
-> Speaker icon is given all across the application to toggle music.
-> A home icon is provided across the app to traverse to landing page.


          ------------------------------x Technical info for future developers x------------

  Data configuration:

  items.js : The new items are to be added to the global list variable 'items' initiated in this file. Every item will follow a item object
  structure as shown in the file.

  room.js : The new rooms are to be added to the global list variable 'room' written in this file. Every room will follow a room object
  structure as shown in the file. The ID of the item added is referenced in itemId attribute of room object.

  headings.js : All the page headings, buttons labels and texts displayed across the application is configured with each attribute explained.
  So new texts can be added to global variable headingsAndLabels written in this file. Editing the old ones will automatically reflect in app.

  messages.js : The various messages teddy dialogue holds based on the scenario is initiated into a global variable teddyDialogues in this file.
  Any new messages or editing old ones can be done here.

  config.js : The number of levels, items per level, time per level can be configured in this file. The file contains the attribute description
  for reference. But please be careful about the number of items currently present before configuring the increase in items per level.
  For instance if we are increasing items by 10 times and we have 6 levels then 6th level needs 60 items and if we have only 50 with us then
  level cannot be formed. However, the scenario is handled by proper teddy message but it is better to avoid it.

  Some useful functions:

  Game Logic:

  All the game logic is written in app.js
  Some functions you will want to have a look into

  gameOver(reason) :  Handles the level up, game over because of score/time and game win scenarios. Various values of reasons define the
  necessary action.

  handleGameProgress(correct) : Handles the scenarios of correct/wrong mapping of item to the room. The boolean flag correct is given according
  to answer is correct/wrong.

  validateTheEnteredName() : A onclick event handler for the check button in manual keyboard of game pages which validates the name typed by
  the player.

  addDropAttributes(element,room) : Adds ondrop and ondragover events on the left side panel containing the room images and enables the
  mapping of room and items.

  fetchRoomList() : Fetches 4 rooms randomly from the total rooms available.

  fetchMaxTime() : Fetches the items randomly based on rooms selected in above function and also based on maximum allowed as per the level

  The Game Components:

  All the game components which are reusable are written in gameElements.js
  Some functions that can be handy :

  Landing page content : createLandingPageContent()
  Level selection page content : CreateLevelSelectionPage()
  Room selection page : createRoomSelectionPage()
  Items display page : createItemsPage()
  Game page : createLeftPanel(), createRightPanel()
  Back button across the app : createBackButtonIcon(pagename)
  Learn button across the app : createLearnIcon()
  Home button across the app : createHomePageIcon()
  Speaker across the app : createSpeakerIcon()
