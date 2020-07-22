import produce from 'immer';
import {
  CLEAR_SELECTED_RUN,
  DELETE_RUN_SUCCESS,
  GET_EXPERIMENTS_SUCCESS,
  GET_RUNS_SUCCESS,
  SELECT_EXPERIMENT,
  SELECT_RUN,
} from './constants';

export const initialState = {
  error: false,
  seletedExperiment: null,
  experiments: null,
  runs: [],
  selectedRun: null,
};

/* eslint-disable default-case, no-param-reassign */
const mlflowReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_EXPERIMENTS_SUCCESS:
        draft.experiments = Object.assign([], action.payload);
        break;
      case SELECT_EXPERIMENT:
        draft.seletedExperiment = action.payload;
        break;
      case GET_RUNS_SUCCESS:
        draft.runs = Object.assign([], action.payload);
        break;
      case SELECT_RUN:
        draft.selectedRun = action.payload;
        break;
      case DELETE_RUN_SUCCESS:
      case CLEAR_SELECTED_RUN:
        draft.selectedRun = null;
        break;
    }
  });

export default mlflowReducer;
