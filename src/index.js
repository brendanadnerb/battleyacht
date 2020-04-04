import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {
  Provider
} from 'react-redux';
import {
  createStore
} from 'redux';
import game from './reducers/game';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(game, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();