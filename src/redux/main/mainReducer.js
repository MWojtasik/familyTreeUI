import {mainInitialState} from './mainInitialState.js';
import {
  ADD_EDGE, CLOSE_EDIT_DIALOG,
  FETCHING_DATA_FAILURE, OPEN_EDIT_DIALOG,
  REMOVE_EDGE,
  SET_ELEMENTS,
  START_FETCHING_DATA
} from 'src/redux/main/mainActions.js';

export function mainReducer(state, action) {
  if (typeof state === 'undefined') {
    return mainInitialState;
  }

  switch (action.type) {
  case START_FETCHING_DATA:
    return {
      ...state,
      isFetchingData: true,
    };
  case FETCHING_DATA_FAILURE:
    break;
  case SET_ELEMENTS:
    return {
      ...state,
      isFetchingData: false,
      elements: action.elements,
    };
  case ADD_EDGE:
    return {
      ...state,
      elements: [...state.elements, action.edge]
    };
  case REMOVE_EDGE: {
    const newElements = state.elements.filter(
      (element) => !(element.source === action.edge.source && element.target === action.edge.target)
    );
    return {
      ...state,
      elements: newElements,
    };
  }
  case OPEN_EDIT_DIALOG:
    return {
      ...state,
      isEditDialogOpen: true,
    };
  case CLOSE_EDIT_DIALOG:
    return {
      ...state,
      isEditDialogOpen: false
    };
  }

  return state;
}
