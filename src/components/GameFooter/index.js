import React, {
  Component
} from 'react';
import './styles.css';

import {
  Button
} from 'react-bootstrap';

class GameFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: <div className="instructions">Drag and drop your ships to place them. <br/> Double-click a ship to rotate it.</div>,
      readyVisible: {
        display: 'inline-block'
      }
    }

    this.onReadyClick = this.onReadyClick.bind(this);
  }
  onReadyClick() {
    this.setState({
      text: <div className="instructions">Waiting for opponent.</div>,
      readyVisible: {
        display: 'none'
      }
    })

    this.props.setShipPositions();
  }
  render() {

    let visibility = {
      display: this.props.visible ? 'inline-block' : 'none'
    }
    return(
      <div className="game-footer" style={visibility}>
        {this.state.text}
        <Button bsStyle="primary" bsSize="large" onClick={this.onReadyClick} style={this.state.readyVisible}>Ready!</Button>
      </div>
    );
  }
}

export default GameFooter;