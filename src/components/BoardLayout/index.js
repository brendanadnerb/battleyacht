import React from 'react';

import {
  ROWS,
  COLS,
  COL_LABELS,
  ROW_LABELS
} from '../../constants';

import './styles.css';
import Peg from '../Peg';


export default(props) => {
  let pegNum = 0;

  let pegs = [];

  // build the board (a grid of of Peg components)
  for(let rowNum = 0; rowNum < ROWS; rowNum++) {

    for(let colNum = 0; colNum < COLS; colNum++) {

      let boardPosition = {
        x: colNum,
        y: rowNum
      };

      let peg = <Peg key={pegNum} position={boardPosition} />;

      pegs.push(peg);

      pegNum++;
    }
  }

  return(
    <div className="game-board-container">
      <div className="row-label-container">
        {
          ROW_LABELS.map((label, i) => {
            return <div className="row-label" key={i}>{label}</div>
          })
        }
      </div>
      <div className="col-label-container">
      {
        COL_LABELS.map((label, i) => {
          return <div className="col-label" key={i}>{label}</div>
        })
      }
      </div>
      <div className="game-board">
        {pegs}
      </div>
    </div>
  );
}