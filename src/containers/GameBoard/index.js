import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  connect
} from 'react-redux';

import autoBind from 'class-autobind';

import './styles.css';

import BoardLayout from '../../components/BoardLayout';

import {
  ROWS,
  COLS,
  GAME_PHASE_PLAYING
} from '../../constants';

import PlayTiles from '../PlayTiles';

import PlayTile from '../../components/PlayTile';

import {
  sendMove
} from '../../actions/game-actions';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentDidMount() {

  }

  // TODO
  reset() {}

  componentWillReceiveProps(nextProps) {}

  onTileClick(position) {
    let moveData;

    let ship = this.getShipAtPosition(position);

    moveData = ship ? ship : position;

    moveData.hit = ship ? true : false;

    this.props.onSendMove(moveData);
  }

  getShipAtPosition(position) {
    let occupied = null;

    this.props.shipPositions.some(tilePosition => {
      if(position.y === tilePosition.y && position.x === tilePosition.x) {
        occupied = tilePosition;
        return occupied;
      }
      return occupied;
    })

    return occupied;
  }

  render() {
    let whoseMove = '';
    if(this.props.lastMove) {
      whoseMove = this.props.lastMove.player === 'local' ? 'Opponent\'s' : 'Your';
    } else {
      whoseMove = 'Your';
    }

    let tiles = [];
    let tileNum = 0;

    for(let rowNum = 0; rowNum < ROWS; rowNum++) {

      for(let colNum = 0; colNum < COLS; colNum++) {

        let boardPosition = {
          x: colNum,
          y: rowNum
        };

        let occupied = this.getShipAtPosition(boardPosition);

        let tile = <PlayTile 
          key={tileNum} 
          position={boardPosition} 
          occupied={occupied} 
          onTileClick={this.onTileClick} 
          lastMove={this.props.lastMove}
        />;

        tiles.push(tile);

        tileNum++;
      }
    }

    let view = this.props.gamePhase === GAME_PHASE_PLAYING ?
      <div>
        <BoardLayout />
        <PlayTiles>
          {tiles}
        </PlayTiles>
        <div className="move">{whoseMove} move.</div>
      </div> :
      ''

    return(
      <div>
        {view}
      </div>
    );
  }
}


GameBoard.propTypes = {
  shipPositions: PropTypes.array,
  onSendMove: PropTypes.func,
  gamePhase: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    onSendMove: (position) => dispatch(sendMove(position)),
    dispatch
  };
}

const mapStateToProps = (state) => {
  return {
    shipPositions: state.toJS().shipPositions.opponent,
    gamePhase: state.toJS().gamePhase,
    lastMove: state.toJS().lastMove
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);