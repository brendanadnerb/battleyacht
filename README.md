# Battleyacht

## 2 player Battleship with real-time chat over a websocket connection.

To run:

`npm install && npm run build && npm run serve`

this will build and run at `localhost:3000`. Point two browser windows there and you should be good.

I used:

- **create-react-app** for boilerplate / scaffold / dev environment -**react-bootstrap** for quick layouts and styles (didn't end up using it much)

- **class-autobind** for some convenience

- **greensock (TweenMax)** for animation (there's only one animation right now - when a ship is being moved somewhere it shouldn't be)

- **react-draggable** for ship placement while snapping to grid/confining

- **immutable.js** for app state

- **express, socket.io** to communicate real-time

### **TODO**:

This is very much a WIP.

Check for player disconnection. Error handling in general.

style the chat history

better-built styles (responsive styles, css modules, specificity, consistency etc.)

do "new game" to start over at the end. The state logic is almost set up for that.

better dev environment: eject from `react-scripts` and wrap the express app/sockets for easy dev. Set up for local debugging via VSCode

comprehensive tests: the only thing I did was unit tests on the reducer.

animations, sound effects, music, actual graphics...
