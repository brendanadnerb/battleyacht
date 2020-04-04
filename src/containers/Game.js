import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  connect
} from 'react-redux';

import socket from '../io';

import {
  PageHeader,
  Col
} from 'react-bootstrap';

import './styles.css';

import LocalBoard from '../containers/LocalBoard';
import GameBoard from '../containers/GameBoard';
import Chat from '../containers/Chat';

import autoBind from 'class-autobind';

import {
  GAME_PHASE_START,
  GAME_PHASE_PLAYING,
  SET_LOCAL_SHIP_POSITIONS,
  SEND_MOVE,
  RESTART_GAME,
  SEND_CHAT_COMMENT
} from '../constants';

import {
  setEnemyShipPositions,
  sendMove,
  receiveMove,
  setGamePhase,
  giveFirstTurn,
  receiveChatComment
} from '../actions/game-actions';

class Game extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentDidMount() {
    socket.on('action', (action) => {
      // ignore all of my own socket calls
      if(action.playerId === this.props.playerId) {
        return;
      }

      // since the reducer dispatches every action to the socket, we can deal with them here.
      // TODO 'action.action' is because it's nested so the player id can be in there....
      switch(action.action.type) {
        case SET_LOCAL_SHIP_POSITIONS:
          // opponent just set his local ship positions: set them now as opponent positions.
          // Then if we're both ready, start playing.
          {
            this.props.onSetEnemyShipPositions(action.action.positions);

            if(this.props.localPlayerReady && this.props.opponentReady) {
              this.props.onSetGamePhase(GAME_PHASE_PLAYING);
            }

            break;
          }

        case SEND_MOVE:
          {
            // Opponent just sent a move, receive it so we can set our state accordingly.
            this.props.onReceiveMove(action.action.move);
            break;
          }
        case RESTART_GAME:
          {
            // TODO
            break;
          }
        case SEND_CHAT_COMMENT:
          {
            // Opponent just sent a comment, receive it so we can render it.
            this.props.onReceiveChatComment(action.action.comment);
            break;
          }
        default:
          // console.log('Socket listener: ignoring', action);
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.localPlayerReady && nextProps.opponentReady) {

      if(!this.state.localPlayerReady) {
        // in the last state, I wasn't ready..... now I am.
        // when both players ships are ready (but mine were ready last), 
        // this will create a blank local move so that only they can move.
        // TODO manage 'turns init' better...
        this.props.onGiveFirstTurn();
        this.props.onSetGamePhase(GAME_PHASE_PLAYING);
      }
    }

    this.setState({
      localPlayerReady: nextProps.localPlayerReady,
      opponentReady: nextProps.opponentReady
    });
  }
  reset() {
    this.setState({
      localPlayerReady: false,
      opponentReady: false
    });
    this.props.onSetGamePhase(GAME_PHASE_START);
  }
  render() {
    return(
      <div className="game-container">
        <PageHeader>
        Battle Yacht <br/>
        <div className="header-link"><a href="http://www.brendancrich.com" rel="noopener noreferrer" target="_blank">B.Crich</a></div>
        </PageHeader>
        <Col xs={6} md={4}>
          <LocalBoard />
        </Col>
        <Col xs={6} md={4}>
          <GameBoard />
        </Col>
        <Col xs={6} md={4}>
          <Chat />
        </Col>
      </div>
    );
  }
}

Game.propTypes = {
  setEnemyShipPositions: PropTypes.func,
  sendMove: PropTypes.func,
  receiveMove: PropTypes.func,
  setGamePhase: PropTypes.func,
  playerId: PropTypes.string,
  localPlayerReady: PropTypes.bool,
  opponentReady: PropTypes.bool,
  giveFirstTurn: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return {
    onSetEnemyShipPositions: (positionsArr) => dispatch(setEnemyShipPositions(positionsArr)),
    onSendMove: (position) => dispatch(sendMove(position)),
    onReceiveMove: (move) => dispatch(receiveMove(move)),
    onSetGamePhase: (phase) => dispatch(setGamePhase(phase)),
    onGiveFirstTurn: () => dispatch(giveFirstTurn()),
    onReceiveChatComment: (comment) => dispatch(receiveChatComment(comment)),
    dispatch
  };
}

const mapStateToProps = (state) => {
  return {
    gamePhase: state.toJS().gamePhase,
    playerId: state.toJS().playerId,
    localPlayerReady: state.toJS().localPlayerReady,
    opponentReady: state.toJS().opponentReady
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);