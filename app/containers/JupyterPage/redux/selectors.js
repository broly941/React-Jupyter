/**
 * The jupyter state selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectJupyter = state => state.jupyter || initialState;

const makeSelectError = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.error,
  );

const makeSelectFileNames = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.fileNames,
  );

const makeSelectDir = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.dir,
  );

const makeSelectNotebook = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.notebook,
  );

const makeSelectSelectedFileName = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.seletedFileName,
  );

const makeSelectEditedCells = () =>
  createSelector(
    selectJupyter,
    jupyterState => jupyterState.editedCells,
  );

export {
  selectJupyter,
  makeSelectError,
  makeSelectDir,
  makeSelectFileNames,
  makeSelectNotebook,
  makeSelectSelectedFileName,
  makeSelectEditedCells,
};
