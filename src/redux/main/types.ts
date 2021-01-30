import {Edge} from "react-flow-renderer";

export const START_FETCHING_DATA = 'START_FETCHING_DATA';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';
export const SET_ELEMENTS = 'SET_ELEMENTS';
export const ADD_EDGE = 'ADD_EDGE';
export const REMOVE_EDGE = 'REMOVE_EDGE';
export const OPEN_EDIT_DIALOG = 'OPEN_EDIT_DIALOG';
export const CLOSE_EDIT_DIALOG = 'CLOSE_EDIT_DIALOG';

export type MainState = Readonly<{
    elements: ReadonlyArray<object>,
    isFetchingData: boolean,
    isEditDialogOpen: boolean,
}>

export type RootState = {
    main: MainState,
}

interface OpenEditDialogAction {
    type: typeof OPEN_EDIT_DIALOG,
}

interface CloseEditDialogAction {
    type: typeof CLOSE_EDIT_DIALOG,
}

interface AddEdgeAction {
    type: typeof ADD_EDGE,
    payload: Edge,
}

interface RemoveEdgeAction {
    type: typeof REMOVE_EDGE,
    payload: Edge,
}

interface SetElementsAction {
    type: typeof SET_ELEMENTS,
    payload: object[]
}

interface StartFetchingDataAction {
    type: typeof START_FETCHING_DATA,
}

interface FetchingDataFailureAction {
    type: typeof FETCHING_DATA_FAILURE,
}

export type MainActionTypes =
    OpenEditDialogAction
    | CloseEditDialogAction
    | AddEdgeAction
    | RemoveEdgeAction
    | SetElementsAction
    | StartFetchingDataAction
    | FetchingDataFailureAction;
