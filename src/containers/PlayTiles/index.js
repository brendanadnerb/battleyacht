import React, {} from 'react';

import './styles.css';

export default(props) => {
  return(
    <div className="tiles-container">
      {props.children}
    </div>
  );
}