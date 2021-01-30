import {endpoints} from 'src/endpoints.js';
import {getLayoutedElementsFromLeaves} from 'src/elementsService/getLayoutedElements.js';
import {createElementsFromLeaves} from 'src/elementsService/createElementsFromLeaves.js';
import {Dispatch} from "redux";
import {
  ADD_EDGE,
  CLOSE_EDIT_DIALOG,
  FETCHING_DATA_FAILURE, MainActionTypes,
  OPEN_EDIT_DIALOG,
  REMOVE_EDGE, SET_ELEMENTS,
  START_FETCHING_DATA
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

export const getData = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: START_FETCHING_DATA});
    return endpoints.getLeaves()
      .then(({data}) => {
        const elements = createElementsFromLeaves(data);
        const layoutedElements = getLayoutedElementsFromLeaves(elements);
        dispatch(setElements(layoutedElements));
      })
      .catch(() => {
        dispatch({type: FETCHING_DATA_FAILURE});
      });
  };
};

export const setElements = (elements: object[]) : MainActionTypes => {
  return {
    type: SET_ELEMENTS,
    payload: elements,
  };
};

