import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore
} from 'redux';

import game from './reducers/game';

import App from './App';

import {
  Provider
} from 'react-redux';

let store = createStore(game);

it('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});