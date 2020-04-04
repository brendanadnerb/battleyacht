/*
Actions
 */
export const PLAYER_CONNECTED = 'Constants.PLAYER_CONNECTED';
export const SET_LOCAL_SHIP_POSITIONS = 'Constants.SET_LOCAL_SHIP_POSITIONS';
export const SET_ENEMY_SHIP_POSITIONS = 'Constants.SET_ENEMY_SHIP_POSITIONS';

export const GIVE_FIRST_TURN = 'Constants.GIVE_FIRST_TURN';

export const SEND_MOVE = 'Constants.SEND_MOVE';
export const RECEIVE_MOVE = 'Constants.RECEIVE_MOVE';

export const SHIP_SUNK = 'Constants.SHIP_SUNK';

export const SET_GAME_PHASE = 'Constants.SET_GAME_PHASE';

export const GAME_PHASE_START = 'Constants.GAME_PHASE_START';
export const GAME_PHASE_PLAYING = 'Constants.GAME_PHASE_PLAYING';
export const GAME_PHASE_OVER = 'Constants.GAME_PHASE_OVER';

export const RESTART_GAME = 'Constants.RESTART_GAME';

export const SEND_CHAT_COMMENT = 'Constants.SEND_CHAT_COMMENT';
export const RECEIVE_CHAT_COMMENT = 'Constants.RECEIVE_CHAT_COMMENT';

/*
Game constants
 */

export const PEG_SIZE = 50;
export const ROWS = 8;
export const COLS = 8;
export const COL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROW_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const SHIP_DATA = [{
  type: 'Carrier',
  size: 5
}, {
  type: 'Battleship',
  size: 4
}, {
  type: 'Cruiser',
  size: 3
}, {
  type: 'Submarine',
  size: 3
}, {
  type: 'Destroyer',
  size: 2
}];