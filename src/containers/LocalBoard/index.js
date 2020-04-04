import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  connect
} from 'react-redux';

import autoBind from 'class-autobind';

import {
  setLocalShipPositions
} from '../../actions/game-actions';

import {
  PEG_SIZE,
  ROWS,
  COLS,
  GAME_PHASE_START,
  GAME_PHASE_PLAYING,
  SHIP_DATA
} from '../../constants';

import './styles.css';

import PlayTiles from '../PlayTiles';

import PlayTile from '../../components/PlayTile';

import BoardLayout from '../../components/BoardLayout';
import Ship from '../../components/Ship';
import GameFooter from '../../components/GameFooter';

class LocalBoard extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  // TODO
  reset() {}

  shipOverlapTest(shipNum) {
    // if a ship was just dropped and it overlaps another ship, return false (the ship will go back where it started)

    let shipPositions = this.refs[`shipRef${shipNum}`].getPositions();

    let overlapping = false;

    let allOtherShipPositions = [];

    // find all the squares occupied by the other ships.
    SHIP_DATA.forEach((ship, i) => {

      // skip the ship we're checking against...
      if(i === shipNum) {
        return;
      }

      let shipPositions = this.refs[`shipRef${i}`].getPositions();

      shipPositions.forEach(position => {
        allOtherShipPositions.push(position);
      })
    })

    // check this ship's tiles against all the others to see if they're overlapping
    shipPositions.some(position => {
      allOtherShipPositions.some(otherPosition => {
        if(otherPosition.y === position.y && otherPosition.x === position.x) {
          overlapping = true;
          return overlapping;
        }
        return overlapping;
      })
      return overlapping;
    })

    return overlapping;
  }
  shipRotateTest(shipNum) {
    // if a ship was just rotated and it overlaps another piece or it goes off the game board, return false (the ship won't allow itself to rotate)

    let allowRotation = true;

    let shipPositions = this.refs[`shipRef${shipNum}`].getPositions();

    shipPositions.forEach(position => {
      if(position.x > ROWS - 1 || position.y > COLS - 1) {
        // you're trying to rotate off the edge of the board. Don't do that.
        allowRotation = false;
      }
    })

    return allowRotation;
  }
  getShipPositions() {
    let posArr = [];

    SHIP_DATA.forEach((ship, i) => {
      let shipPositions = this.refs[`shipRef${i}`].getPositions();

      shipPositions.forEach(position => {
        posArr.push(position);
      })
    })

    return posArr;
  }
  setShipPositions() {
    this.props.onSetLocalShipPositions(this.getShipPositions());
  }
  render() {
    let tiles = this.props.moves.map((move, i) => {
      return <PlayTile key={i} position={{x: move.x, y: move.y}} occupied={move.hit} visible={true} />
    })


    let ships = SHIP_DATA.map((ship, i) => {
      return <Ship 
        {...ship} 
        shipOverlapTest={this.shipOverlapTest}
        shipRotateTest={this.shipRotateTest}
        initialPosition={{x: 0, y:i * PEG_SIZE}} 
        key={i} 
        shipNum={i} 
        ref={`shipRef${i}`}
        disabled={this.props.gamePhase !== GAME_PHASE_START}
      />;
    });

    return(
      <div className="col-container">
        {
          this.props.gamePhase === GAME_PHASE_PLAYING ?

          <PlayTiles>
            {tiles}
          </PlayTiles>
          :
          ''
        }
        <div className="ships-container">
          {ships}
        </div>
        <BoardLayout />
        <GameFooter setShipPositions={this.setShipPositions} visible={this.props.gamePhase === GAME_PHASE_START} />
      </div>
    );
  }
}

LocalBoard.propTypes = {
  gamePhase: PropTypes.string,
  setLocalShipPositions: PropTypes.func,
  moves: PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    onSetLocalShipPositions: (positionsArr) => dispatch(setLocalShipPositions(positionsArr)),
    dispatch
  };
}

const mapStateToProps = (state) => {
  return {
    gamePhase: state.toJS().gamePhase,
    moves: state.toJS().moves.opponent
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalBoard);