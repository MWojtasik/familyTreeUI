import { Edge, Elements } from 'react-flow-renderer';
import {
  ADD_EDGE,
  CLOSE_EDIT_DIALOG,
  MainActionTypes,
  OPEN_EDIT_DIALOG,
  REMOVE_EDGE, SET_ELEMENTS,
} from './types';

export const openEditDialog = () : MainActionTypes => ({
  type: OPEN_EDIT_DIALOG,
});

export const closeEditDialog = () : MainActionTypes => ({
  type: CLOSE_EDIT_DIALOG,
});

export const addEdge = (edge: Edge) : MainActionTypes => ({
  type: ADD_EDGE,
  payload: edge,
});

export const removeEdge = (edge: Edge) : MainActionTypes => ({
  type: REMOVE_EDGE,
  payload: edge,
});

export const setElements = (elements: Elements) : MainActionTypes => ({
  type: SET_ELEMENTS,
  payload: elements,
});
