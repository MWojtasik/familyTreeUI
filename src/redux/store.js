import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {mainReducer} from './main/mainReducer.js';
import {mainInitialState} from './main/mainInitialState.js';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  main: mainReducer
});

export const store = createStore(
  rootReducer,
  {
    main: mainInitialState
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
