import React, {} from 'react';
import './styles.css';

import {
  PEG_SIZE
} from '../../constants';

export default(props) => {
  let pegStyle = {
    width: `${PEG_SIZE}px`,
    height: `${PEG_SIZE}px`,
    left: `${props.position.x * PEG_SIZE}px`,
    top: `${props.position.y * PEG_SIZE}px`
  }

  return(
    <div className="peg-container" style={pegStyle}>
        <div className="peg"></div>
      </div>
  );

}