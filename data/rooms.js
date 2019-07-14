
/*
  rooms.js: Creates global variable 'room' that Contains
  list of different javascript item objects

  room : List of javascript objects

  room object:
  roomId: unique to a particular room
  roomName: Name to be displayed for the room
  itemId: List of itemId of items that refers to itemId in item.js
  imageUrl: url for the image to be displayed for the room
*/

window.room = [
      {
        roomId: 1,
        roomName: "Kitchen",
        itemId: [1,2,3,4,5,26,27,28,29,30],
        imageUrl: "images/kitchen.svg"
      },
      {
        roomId: 2,
        roomName: "Bedroom",
        itemId: [6,7,8,9,10,31,32,33,34,35],
        imageUrl: "images/bedroom.svg"
      },
      {
        roomId: 3,
        roomName: "Living Room",
        itemId: [11,12,13,14,15,36,37,38,39,40],
        imageUrl: "images/living_room.svg"
      },
      {
        roomId: 4,
        roomName: "Bathroom",
        itemId: [16,17,18,19,20,41,42,43,44,45],
        imageUrl: "images/bathroom.svg"
      },
      {
        roomId: 5,
        roomName: "Garden",
        itemId: [21,22,23,24,25,46,47,48,49,50],
        imageUrl: "images/garden.svg"
      }
]
