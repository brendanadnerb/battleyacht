import reducer from './game';
import {
  fromJS
} from 'immutable';
import _ from 'lodash';

import shipsStub from './ships-stub';

import {
  SET_LOCAL_SHIP_POSITIONS,
  SET_ENEMY_SHIP_POSITIONS,
  GAME_PHASE_START,
  GAME_PHASE_PLAYING,
  GAME_PHASE_OVER,
  SEND_MOVE,
  SET_GAME_PHASE,
  RESTART_GAME,
  SHIP_DATA,
  RECEIVE_MOVE,
  GIVE_FIRST_TURN,
  RECEIVE_CHAT_COMMENT
} from '../constants';


const initialState = fromJS({
  playerId: 'test_player',
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



describe('Game Reducer', () => {
  test('returns game state', () => {
    const result = reducer(undefined, {
      type: 'ANYTHING'
    })
    expect(result).toBeDefined();
  })

  test('gives first turn to opponent', () => {
    let action = {
      type: GIVE_FIRST_TURN
    }
    let result = reducer(initialState, action).toJS();
    expect(result.lastMove.player).toEqual('local');
  })

  test('sets local ship positions', () => {
    let action = {
      type: SET_LOCAL_SHIP_POSITIONS,
      positions: shipsStub
    }
    let result = reducer(initialState, action).toJS();
    expect(result.shipPositions.local).toHaveLength(_.sumBy(SHIP_DATA, 'size'));
  })

  test('sets enemy ship positions', () => {
    let action = {
      type: SET_ENEMY_SHIP_POSITIONS,
      positions: shipsStub
    }
    let result = reducer(initialState, action).toJS();
    expect(result.shipPositions.opponent).toHaveLength(_.sumBy(SHIP_DATA, 'size'));
  })

  test('sends a move', () => {
    let move = {
      type: 'Battleship',
      x: 1,
      y: 1,
      hit: true,
      sunk: true
    }
    let action = {
      type: SEND_MOVE,
      move: move
    }
    let result = reducer(initialState, action).toJS();
    expect(result.lastMove.x).toEqual(move.x);
    expect(result.lastMove.y).toEqual(move.y);
    expect(result.moves.local).toHaveLength(1);
  })

  test('receives a move', () => {
    let move = {
      type: 'Battleship',
      x: 1,
      y: 1,
      hit: true,
      sunk: true
    }
    let action = {
      type: RECEIVE_MOVE,
      move: move
    }
    let result = reducer(initialState, action).toJS();

    expect(result.lastMove.x).toEqual(move.x);
    expect(result.lastMove.y).toEqual(move.y);
    expect(result.moves.opponent).toHaveLength(1);
  })

  test('receives a chat comment', () => {
    let action = {
      type: RECEIVE_CHAT_COMMENT,
      comment: 'Test comment'
    }
    let result = reducer(initialState, action).toJS();

    expect(result.chatComments).toContain(action);
  })
})