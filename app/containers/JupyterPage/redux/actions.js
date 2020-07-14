import {
  CLEAR_LOCAL_CELL_STORAGE,
  GET_FILE_NAMES,
  GET_FILE_NAMES_SUCCESS,
  GET_NOTEBOOK,
  GET_NOTEBOOK_SUCCESS,
  RESTART_KERNEL,
  GET_SESSIONS_SUCCESS,
  SAVE_CELL_LOCALLY,
  SAVE_NOTEBOOK,
  SELECT_FILE_NAME,
} from './constants';

export function getFileNamesInDir() {
  return {
    type: GET_FILE_NAMES,
  };
}

export function getFileNamesInDirSuccess(fileNames) {
  return {
    type: GET_FILE_NAMES_SUCCESS,
    payload: fileNames,
  };
}

export function getNotebook(fileName) {
  return {
    type: GET_NOTEBOOK,
    payload: fileName,
  };
}

export function getNotebookSuccess(data) {
  return {
    type: GET_NOTEBOOK_SUCCESS,
    payload: data,
  };
}

export function selectFileName(fileName) {
  return {
    type: SELECT_FILE_NAME,
    payload: fileName,
  };
}

export function saveCellLocally(index, cell) {
  return {
    type: SAVE_CELL_LOCALLY,
    payload: { index, cell },
  };
}

export function clearLocalCellStorage() {
  return {
    type: CLEAR_LOCAL_CELL_STORAGE,
  };
}

export function saveNotebook(notebook) {
  return {
    type: SAVE_NOTEBOOK,
    payload: notebook,
  };
}

export function restartKernel() {
  return {
    type: RESTART_KERNEL,
  };
}
