import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainReducer } from './main/mainReducer';
import { mainInitialState } from './main/mainInitialState';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  main: mainReducer,
});

const initialState = {
  main: mainInitialState,
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(
  rootReducer, initialState, enhancer,
);
