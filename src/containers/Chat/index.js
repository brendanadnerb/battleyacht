import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  connect
} from 'react-redux';

import {
  FormControl
} from 'react-bootstrap';

import './styles.css';

import autoBind from 'class-autobind';

import {
  sendChatComment
} from '../../actions/game-actions';

import {
  COL_LABELS,
  ROW_LABELS,
  GAME_PHASE_OVER
} from '../../constants';

class Chat extends Component {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = {
      textVal: '',
      lastMoveText: ''
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.refs.history.scrollTop = this.refs.history.scrollHeight;

    // are we getting a new move?
    if(nextProps.lastMove && !nextProps.lastMove.initial) {

      let status = nextProps.lastMove.hit ? 'hit!' : 'miss.';
      status = nextProps.lastMove.sunk ? `${nextProps.lastMove.type} sunk!!` : status;


      let person = nextProps.lastMove.player === 'local' ? 'You' : 'Opponent';

      this.setState({
        lastMoveText: `${person} fired at ${COL_LABELS[nextProps.lastMove.x]}${ROW_LABELS[nextProps.lastMove.y]} - ${status}`
      })
    }

    if(nextProps.gamePhase && nextProps.gamePhase === GAME_PHASE_OVER) {
      this.addComment(`Game over, ${nextProps.lastMove.player} wins.`);
    }
  }
  handleChange(event) {
    this.setState({
      textVal: event.target.value
    })
  }
  handleKeyPress(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      this.props.onSendChatComment(event.target.value);
      this.setState({
        textVal: ''
      })
    }
  }
  render() {
    let comments = '';

    this.props.chatComments.forEach((commentObj) => {
      let prepend = commentObj.player === 'local' ? 'You: ' : 'Opponent: ';
      let prependedComment = prepend + commentObj.comment + '\n';

      comments += prependedComment;
    });
    return(
      <div className="chat-container">
        <form>
          <textarea ref="history" value={comments} className="chat-history" readOnly/>
          <FormControl
            type="text"
            placeholder="Type here and hit 'enter' to comment."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.textVal}
          />
        </form>
        <h2>{this.state.lastMoveText}</h2>
      </div>
    );
  }
}

Chat.propTypes = {
  lastMove: PropTypes.object,
  currentPlayer: PropTypes.string,
  gamePhase: PropTypes.string,
  chatComments: PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    onSendChatComment: (comment) => dispatch(sendChatComment(comment)),
    dispatch
  };
}

const mapStateToProps = (state) => {
  return {
    lastMove: state.toJS().lastMove,
    currentPlayer: state.toJS().currentPlayer,
    gamePhase: state.toJS().gamePhase,
    chatComments: state.toJS().chatComments
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);