import {
  ADD_EDGE,
  CLOSE_EDIT_DIALOG,
  MainActionTypes,
  OPEN_EDIT_DIALOG,
  REMOVE_EDGE, SET_ELEMENTS,
} from "./types";
import {Edge} from "react-flow-renderer";

export const openEditDialog = () : MainActionTypes => {
  return {
    type: OPEN_EDIT_DIALOG
  };
};

export const closeEditDialog = () : MainActionTypes => {
  return {
    type: CLOSE_EDIT_DIALOG
  };
};


export const addEdge = (edge: Edge) : MainActionTypes => {
  return {
    type: ADD_EDGE,
    payload: edge,
  };
};

export const removeEdge = (edge: Edge) : MainActionTypes => {
  return {
    type: REMOVE_EDGE,
    payload: edge,
  };
};

export const setElements = (elements: object[]) : MainActionTypes => {
  return {
    type: SET_ELEMENTS,
    payload: elements,
  };
};

