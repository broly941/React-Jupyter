import {
  CLEAR_SELECTED_RUN,
  CREATE_RUN,
  DELETE_RUN,
  DELETE_RUN_SUCCESS,
  GET_EXPERIMENTS,
  GET_EXPERIMENTS_SUCCESS,
  GET_RUNS,
  GET_RUNS_SUCCESS,
  SELECT_EXPERIMENT,
  SELECT_RUN,
} from './constants';

export function getMlflowExperiments() {
  return {
    type: GET_EXPERIMENTS,
  };
}

export function getMlflowExperimentsSuccess(experiments) {
  return {
    type: GET_EXPERIMENTS_SUCCESS,
    payload: experiments,
  };
}

export function selectExperiment(experimentId) {
  return {
    type: SELECT_EXPERIMENT,
    payload: experimentId,
  };
}

export function getRuns() {
  return {
    type: GET_RUNS,
  };
}

export function getRunsSuccess(runs) {
  return {
    type: GET_RUNS_SUCCESS,
    payload: runs,
  };
}

export function selectRun(runId) {
  return {
    type: SELECT_RUN,
    payload: runId,
  };
}

export function clearSelectedRun() {
  return {
    type: CLEAR_SELECTED_RUN,
  };
}

export function createRun(experimentId) {
  return {
    type: CREATE_RUN,
    payload: experimentId,
  };
}

export function deleteRun(runId) {
  return {
    type: DELETE_RUN,
    payload: runId,
  };
}

export function deleteRunSuccess() {
  return {
    type: DELETE_RUN_SUCCESS,
  };
}
