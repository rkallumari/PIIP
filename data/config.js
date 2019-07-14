/**
    config.js : This file contains all the game configurations.
    It includes details like number of levels targetted in the game.
    time gap between levels, number of item targetted in each level.
    However please make sure you have enough data before modifying the
    number of items per level.
    Also make sure the buttons display in the level selection page is
    aligned as it is designed for maximum of 12 levels currently.

    Author: Rajesh Kallumari
    Email Id: rkallumari@deakin.edu.au
**/

/*
  config is saved as a global variable to be used across the app.

  numberOfLevels : The total number of levels post which game won pop up comes.

  timeDiffPerLevel: The time targetted to be decreased per level (in seconds).
  Also, this value will be taken as the default time given in highest level.

  itemDifferencePerLevel: The items to be incresed per level. Also, this value
  will be taken as default item count for first level.
*/

window.config =
{
  numberOfLevels: 12,
  timeDiffPerLevel: 30,
  itemDifferencePerLevel: 3
}
