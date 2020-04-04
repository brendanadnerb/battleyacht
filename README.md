2 player Battleship with real-time chat over a websocket connection.

To run this:

npm install && npm run build && npm run serve

this will build and run at localhost:3000. Point two browser windows there and you should be good.



I used:
create-react-app for boilerplate / scaffold / dev environment
react-bootstrap for quick layouts and styles (didn't end up using it much)
class-autobind for some convenience
greensock (TweenMax) for animation (there's only one animation right now - when a ship is being moved somewhere it shouldn't be)
react-draggable for ship placement while snapping to grid/confining
immutable.js for app state
lodash for lodash-ness
react
express 
socket.io to communicate real-time
some other helper libs



things I could/would improve:

This is very much a WIP.

Check for player disconnection. Error handling in general.

make the chat history a <ul> so comments can be styled and whatnot

better-built styles (responsive styles, css modules, specificity, consistency etc.)

do "new game" to start over at the end. Pretty sure the state logic is almost set up for that.

better dev environment: eject from the react-scripts stuff and wrap the express app/sockets for easy dev.

comprehensive unit tests: the only thing I did was tests on the reducer. Everything should have tests on it.

end to end tests.

animations, sound effects, music, actual graphics...