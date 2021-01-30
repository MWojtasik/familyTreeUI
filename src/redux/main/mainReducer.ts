import {mainInitialState} from './mainInitialState';
import {
  ADD_EDGE, CLOSE_EDIT_DIALOG,
  FETCHING_DATA_FAILURE, MainActionTypes, MainState,
  OPEN_EDIT_DIALOG,
  REMOVE_EDGE,
  SET_ELEMENTS,
  START_FETCHING_DATA
} from "./types";
import {Edge} from "react-flow-renderer";

export function mainReducer(state: MainState, action: MainActionTypes) {
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
        elements: action.payload,
      };
    case ADD_EDGE:
      return {
        ...state,
        elements: [...state.elements, action.payload]
      };
    case REMOVE_EDGE: {
      const newElements = state.elements.filter(
        (element: Edge ) => !(element.source === action.payload.source && element.target === action.payload.target)
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
