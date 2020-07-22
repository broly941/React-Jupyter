/**
 * The Mlflow state selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMlflow = state => state.mlflow || initialState;

const makeSelectError = () =>
  createSelector(
    selectMlflow,
    jupyterState => jupyterState.error,
  );

const makeSelectExperiments = () =>
  createSelector(
    selectMlflow,
    jupyterState => jupyterState.experiments,
  );

const makeSelectSelectedExperiment = () =>
  createSelector(
    selectMlflow,
    jupyterState => jupyterState.seletedExperiment,
  );

const makeSelectRuns = () =>
  createSelector(
    selectMlflow,
    jupyterState => jupyterState.runs,
  );

const makeSelectSelectedRun = () =>
  createSelector(
    selectMlflow,
    jupyterState => jupyterState.selectedRun,
  );

export {
  makeSelectError,
  makeSelectExperiments,
  makeSelectSelectedExperiment,
  makeSelectRuns,
  makeSelectSelectedRun,
};
