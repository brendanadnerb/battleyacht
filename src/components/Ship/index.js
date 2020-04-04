import React, {
  Component
} from 'react';
import './styles.css';
import Draggable from 'react-draggable';
import autoBind from 'class-autobind';

import TweenMax from 'gsap';

import {
  PEG_SIZE
} from '../../constants';

class Ship extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: '0px',
      height: '0px',
      horizontal: true
    }

    autoBind(this);
  }
  componentDidMount() {
    this.setState({
      width: this.props.size * PEG_SIZE + 'px',
      height: PEG_SIZE + 'px',
      lastPosition: this.props.initialPosition,
      position: this.props.initialPosition
    })
  }
  dragStart() {}
  dragging(event) {}
  dragStop(event) {
    let thisPosition = {
      x: this.refs.draggable.state.x,
      y: this.refs.draggable.state.y
    };

    if(this.props.shipOverlapTest(this.props.shipNum)) {
      this.flash();
      // overlapping, return to last spot
      this.setState({
        position: this.state.lastPosition
      })
    } else {
      // not overlapping anybody, let it stay
      this.setState({
        position: thisPosition,
        lastPosition: thisPosition
      })
    }


  }
  onDoubleClick() {
    if(this.props.disabled) {
      return;
    }

    // Rotate the ship, checking first if we are allowed to. The easiest way to do this is to put it in the new position
    // and then put it back if the check fails.

    // passing a callback so we can wait til the state is updated to do the check
    this.rotate(() => {

      // I rotated... am I off the game board or overlapping anyone?
      if(!this.props.shipRotateTest(this.props.shipNum) || this.props.shipOverlapTest(this.props.shipNum)) {
        // rotation not allowed! Get back there
        this.flash();
        this.rotate();
      }

    });
  }

  flash() {
    TweenMax.from(this.refs.ship, 1, {
      backgroundColor: 'rgba(255, 0, 0, .85)'
    });
  }

  rotate(cb) {
    this.setState({
      width: this.state.height,
      height: this.state.width,
      horizontal: !this.state.horizontal
    }, cb);
  }
  getPositions() {
    // return an array of the spaces the ship covers. (This is for board state, we don't need 'actual' x/y positions - so divide by PEG_SIZE)

    let positions = [];

    let startX = this.refs.draggable.state.x / PEG_SIZE;
    let startY = this.refs.draggable.state.y / PEG_SIZE;

    for(var i = 0; i < this.props.size; i++) {
      let pos;
      if(this.state.horizontal) {
        pos = {
          x: startX + i,
          y: startY
        }
      } else {
        pos = {
          x: startX,
          y: startY + i
        }
      }

      pos.type = this.props.type;

      positions.push(pos);
    }

    return positions;
  }

  render() {
    return(
      <Draggable
        position={this.state.position}
        grid={[50, 50]}
        onStart={this.dragStart}
        onDrag={this.dragging}
        onStop={this.dragStop}
        bounds={'parent'}
        ref="draggable"
        disabled={this.props.disabled}
      >

        <div className="ship" style={{width: this.state.width, height: this.state.height}} onDoubleClick={this.onDoubleClick} ref="ship"></div>

      </Draggable>
    );
  }
}

export default Ship;