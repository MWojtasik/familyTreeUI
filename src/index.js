import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './redux/store.ts';
import {Provider} from 'react-redux';
import {App} from './components/App.tsx';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
