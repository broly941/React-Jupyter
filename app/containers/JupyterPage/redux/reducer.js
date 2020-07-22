import produce from 'immer';
import {
  CLEAR_LOCAL_CELL_STORAGE,
  GET_FILE_NAMES_SUCCESS,
  GET_NOTEBOOK_SUCCESS,
  SAVE_CELL_LOCALLY,
  SELECT_FILE_NAME,
} from './constants';

export const initialState = {
  error: false,
  dir: '',
  seletedFileName: null,
  fileNames: null,
  notebook: null,
  editedCells: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_FILE_NAMES_SUCCESS:
        draft.fileNames = Object.assign([], action.payload);
        break;
      case GET_NOTEBOOK_SUCCESS:
        draft.notebook = Object.assign({}, action.payload);
        break;
      case SELECT_FILE_NAME:
        draft.seletedFileName = action.payload;
        break;
      case SAVE_CELL_LOCALLY:
        const newEditedCells = { ...draft.editedCells };
        newEditedCells[action.payload.index] = action.payload.cell;
        draft.editedCells = newEditedCells;
        break;
      case CLEAR_LOCAL_CELL_STORAGE:
        draft.editedCells = null;
        break;
    }
  });

export default homeReducer;
