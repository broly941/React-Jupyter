import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CREATE_RUN, DELETE_RUN, GET_EXPERIMENTS, GET_RUNS } from './constants';
import request from '../../../share/utils/request';
import {
  deleteRunSuccess,
  getMlflowExperimentsSuccess,
  getRunsSuccess,
  getRuns as getRunsAction,
  clearSelectedRun,
  createRunSuccess,
} from './actions';
import { host as mlflowHost } from '../../../share/constants/mlflow-config';
import { makeSelectSelectedExperiment } from './selectors';

export function* getExperiments() {
  try {
    const response = yield call(
      request,
      `http://${mlflowHost}/api/2.0/mlflow/experiments/list`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );
    yield put(getMlflowExperimentsSuccess(response.experiments));
  } catch (error) {
    console.log(error);
    //
  }
}

export function* getRuns() {
  try {
    const experimentId = yield select(makeSelectSelectedExperiment());
    const response = yield call(
      request,
      `http://${mlflowHost}/api/2.0/mlflow/runs/search`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          experiment_ids: experimentId,
        }),
      },
    );
    yield put(getRunsSuccess(response.runs));
  } catch (error) {
    console.log(error);
    //
  }
}

export function* deleteRun(action) {
  try {
    yield call(request, `http://${mlflowHost}/api/2.0/mlflow/runs/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        run_id: action.payload,
      }),
    });
    yield put(deleteRunSuccess());
    yield put(getRunsAction());
    toast.success('Run has been successfully deleted');
  } catch (error) {
    console.log(error);
    //
  }
}

export function* createRun(action) {
  try {
    yield call(request, `http://${mlflowHost}/api/2.0/mlflow/runs/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        experiment_id: action.payload,
      }),
    });
    yield put(createRunSuccess());
    yield put(getRunsAction());
    toast.success('Run has been added');
  } catch (error) {
    console.log(error);
    //
  }
}

export default function* mlflowSaga() {
  yield takeLatest(GET_EXPERIMENTS, getExperiments);
  yield takeLatest(GET_RUNS, getRuns);
  yield takeLatest(DELETE_RUN, deleteRun);
  yield takeLatest(CREATE_RUN, createRun);
}
