import {endpoints} from 'src/endpoints.js';
import {getLayoutedElementsFromLeaves} from 'src/elementsService/getLayoutedElements.js';
import {createElementsFromLeaves} from 'src/elementsService/createElementsFromLeaves.js';

export const START_FETCHING_DATA = 'START_FETCHING_DATA';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';
export const SET_ELEMENTS = 'SET_ELEMENTS';
export const ADD_EDGE = 'ADD_EDGE';
export const REMOVE_EDGE = 'REMOVE_EDGE';
export const OPEN_EDIT_DIALOG = 'OPEN_EDIT_DIALOG';
export const CLOSE_EDIT_DIALOG = 'CLOSE_EDIT_DIALOG';

export const openEditDialog = () => {
  return {
    type: OPEN_EDIT_DIALOG
  };
};

export const closeEditDialog = () => {
  return {
    type: CLOSE_EDIT_DIALOG
  };
};


export const addEdge = (edge) => {
  return {
    type: ADD_EDGE,
    edge,
  };
};

export const removeEdge = (edge) => {
  return {
    type: REMOVE_EDGE,
    edge,
  };
};

export const getData = () => {
  return (dispatch) => {
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

export const setElements = (elements) => {
  return {
    type: SET_ELEMENTS,
    elements,
  };
};

