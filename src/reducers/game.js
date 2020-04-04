import {
  SET_LOCAL_SHIP_POSITIONS,
  SET_ENEMY_SHIP_POSITIONS,
  GAME_PHASE_START,
  GAME_PHASE_OVER,
  SEND_MOVE,
  SET_GAME_PHASE,
  RESTART_GAME,
  SHIP_DATA,
  RECEIVE_MOVE,
  GIVE_FIRST_TURN,
  SEND_CHAT_COMMENT,
  RECEIVE_CHAT_COMMENT

} from '../constants';

import {
  fromJS
} from 'immutable';

import _ from 'lodash';

import uuidv4 from 'uuid/v4';

import socket from '../io';

// generate a random user ID and store it so we can ignore our own socket messages.
// TODO there's probably a better way to do this
let playerId = uuidv4();

const initialState = fromJS({
  playerId: playerId,
  gamePhase: GAME_PHASE_START,
  shipPositions: {
    local: [],
    opponent: []
  },
  moves: {
    local: [],
    opponent: []
  },
  lastMove: null,
  localPlayerReady: false,
  opponentReady: false,
  chatComments: []
});

export default(state = initialState, action) => {
  // the socket will just emit every action the game takes. 
  // When receiving socket calls, relevant state changes can happen as needed.
  socket.emit('action', {
    action: action,
    playerId: playerId
  });

  switch(action.type) {


    case GIVE_FIRST_TURN:
      // mocks an initial 'last move' so only the opponent can move
      return state.set('lastMove', {
        player: 'local',
        initial: true
      })


    case SET_GAME_PHASE:
      return state.set('gamePhase', action.phase)


    case SET_LOCAL_SHIP_POSITIONS:
      return state.setIn(['shipPositions', 'local'], action.positions)
        .set('localPlayerReady', true)


    case SET_ENEMY_SHIP_POSITIONS:
      return state.setIn(['shipPositions', 'opponent'], action.positions)
        .set('opponentReady', true)


    case SEND_MOVE:
      action.move.player = 'local';
      if(action.move.hit) {
        action.move.sunk = checkShips(action.move, state.toJS().moves.local);

        if(checkGameOver(state.toJS().moves.local)) {
          return state.set('lastMove', action.move)
            .updateIn(['moves', 'local'], arr => arr.push(action.move))
            .set('gamePhase', GAME_PHASE_OVER)
        }
      }
      return state.set('lastMove', action.move)
        .updateIn(['moves', 'local'], arr => arr.push(action.move))


    case RECEIVE_MOVE:
      action.move.player = 'opponent';
      if(action.move.hit) {
        action.move.sunk = checkShips(action.move, state.toJS().moves.opponent);

        if(checkGameOver(state.toJS().moves.opponent)) {
          return state.set('lastMove', action.move)
            .updateIn(['moves', 'opponent'], arr => arr.push(action.move))
            .set('gamePhase', GAME_PHASE_OVER)
        }
      }
      return state.set('lastMove', action.move)
        .updateIn(['moves', 'opponent'], arr => arr.push(action.move))


    case SEND_CHAT_COMMENT:
      return state.update('chatComments', arr => arr.push(action))


    case RECEIVE_CHAT_COMMENT:
      return state.update('chatComments', arr => arr.push(action))


    case RESTART_GAME:
      return state.set('gamePhase', GAME_PHASE_START)
        .set('localPlayerReady', false)
        .set('opponentReady', false)
        .setIn(['shipPositions', 'local'], [])
        .setIn(['shipPositions', 'opponent'], [])
        .set('moves', {})


    default:
      return state
  }
}

// check all ship hits with this type to see if this one was sunk
const checkShips = (hit, allMoves) => {
  let hitsOnThisShip = _.filter(allMoves, (move) => {
    if(move.type && move.type === hit.type) {
      return move
    }
  }).length

  let shipInfo = _.find(SHIP_DATA, (ship) => {
    return ship.type === hit.type;
  })

  // -1 because it was just hit again
  if(hitsOnThisShip === shipInfo.size - 1) {
    return true;
  }
  return false;
}

// check all hits to see if there's enough to trigger game over.
const checkGameOver = (moves) => {
  let totalHitsNecessary = _.sumBy(SHIP_DATA, 'size');

  let numHits = _.filter(moves, {
    hit: true
  }).length;

  if(numHits === totalHitsNecessary - 1) {
    return true;
  }

  return false;
}