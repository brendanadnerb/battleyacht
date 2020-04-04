import React, {
  Component
} from 'react';

import autoBind from 'class-autobind';

import './styles.css';

import {
  PEG_SIZE
} from '../../constants';

const TILE_STYLES = {
  'default': {
    background: 'none'
  },
  'hit': {
    background: 'red'
  },
  'miss': {
    background: 'blue'
  }
};

class PlayTile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      tileType: 'default'
    }
  }
  componentDidMount() {
    // on the local player's board, we're just looping through all the shots that have been fired and rendering them:
    // they are already visible.
    if(this.props.visible) {
      this.setState({
        clicked: true
      });
      this.setOccupiedStyle();
    }
  }
  setOccupiedStyle() {
    if(this.props.occupied) {
      this.setState({
        tileType: 'hit'
      });
    } else {
      this.setState({
        tileType: 'miss'
      });
    }
  }
  onTileClick() {
    // ignore if it's not my turn
    if(this.props.lastMove && this.props.lastMove.player === 'local') {
      return;
    }

    // ignore multiple clicks
    if(this.state.clicked) {
      return;
    }
    // on the opponent's board, we're using each tile to test how it should appear when clicked.
    this.setState({
      clicked: true
    });
    this.setOccupiedStyle();

    this.props.onTileClick(this.props.position);
  }
  render() {
    let tileStyle = {
      width: `${PEG_SIZE}px`,
      height: `${PEG_SIZE}px`,
      left: `${this.props.position.x * PEG_SIZE}px`,
      top: `${this.props.position.y * PEG_SIZE}px`
    }

    Object.assign(tileStyle, TILE_STYLES[this.state.tileType]);

    return(
      <div style={tileStyle} className="play-tile" onClick={this.onTileClick}>
      </div>
    );
  }
}

export default PlayTile;