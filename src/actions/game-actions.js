import {
  SET_LOCAL_SHIP_POSITIONS,
  SET_ENEMY_SHIP_POSITIONS,
  SEND_MOVE,
  SET_GAME_PHASE,
  RESTART_GAME,
  RECEIVE_MOVE,
  GIVE_FIRST_TURN,
  SEND_CHAT_COMMENT,
  RECEIVE_CHAT_COMMENT
} from '../constants';

export function setLocalShipPositions(positions) {
  return {
    type: SET_LOCAL_SHIP_POSITIONS,
    positions
  };
}

export function setEnemyShipPositions(positions) {
  return {
    type: SET_ENEMY_SHIP_POSITIONS,
    positions
  };
}

export function sendMove(move) {
  return {
    type: SEND_MOVE,
    move
  };
}

export function receiveMove(move) {
  return {
    type: RECEIVE_MOVE,
    move
  };
}

export function setGamePhase(phase) {
  return {
    type: SET_GAME_PHASE,
    phase
  }
}

export function restartGame() {
  return {
    type: RESTART_GAME
  }
}

export function giveFirstTurn() {
  return {
    type: GIVE_FIRST_TURN
  }
}

export function sendChatComment(comment) {
  return {
    type: SEND_CHAT_COMMENT,
    player: 'local',
    comment
  }
}

export function receiveChatComment(comment) {
  return {
    type: RECEIVE_CHAT_COMMENT,
    player: 'opponent',
    comment
  }
}