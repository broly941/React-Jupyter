import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  GET_FILE_NAMES,
  GET_NOTEBOOK,
  RESTART_KERNEL,
  SAVE_NOTEBOOK,
} from './constants';
import request from '../../../share/utils/request';
import {
  clearLocalCellStorage,
  getFileNamesInDirSuccess,
  getNotebookSuccess,
} from './actions';
import { makeSelectDir, makeSelectSelectedFileName } from './selectors';

const token = '';
const host = 'localhost:8888';

export function* getNotebook() {
  try {
    const dir = yield select(makeSelectDir());
    const selectedFileName = yield select(makeSelectSelectedFileName());
    const response = yield call(
      request,
      `http://${host}/api/contents/${dir}/${selectedFileName}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        method: 'GET',
      },
    );
    yield put(clearLocalCellStorage());
    yield put(getNotebookSuccess(response));
  } catch (error) {
    //
  }
}

export function* getFileNames() {
  try {
    const dir = yield select(makeSelectDir());
    const response = yield call(request, `http://${host}/api/contents/${dir}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
      method: 'GET',
    });
    yield put(getFileNamesInDirSuccess(response.content));
  } catch (error) {
    //
  }
}

export function* saveNotebook(action) {
  try {
    const dir = yield select(makeSelectDir());
    const selectedFileName = yield select(makeSelectSelectedFileName());
    const response = yield call(
      request,
      `http://${host}/api/contents/${dir}/${selectedFileName}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        method: 'PUT',
        body: action.payload,
      },
    );
    yield put(getNotebookSuccess(response));
  } catch (error) {
    Promise.resolve(error.body).then(errorBody => {
      toast.error(
        `${error.status}: ${errorBody.message} ${errorBody.reason || ''}`,
      );
    });
  }
}

function* getAllSessions() {
  try {
    return yield call(request, `http://${host}/api/sessions`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
      method: 'GET',
    });
  } catch (error) {
    toast.error("Session hasn't been found");
    return null;
  }
}

export function* getKernelId() {
  const dir = yield select(makeSelectDir());
  const selectedFileName = yield select(makeSelectSelectedFileName());
  const sessionResponse = yield* getAllSessions();
  const foundSession = sessionResponse.find(session => {
    const path = `${dir}/${selectedFileName}`;
    return session.path === path;
  });
  return foundSession ? foundSession.kernel.id : null;
}

export function* restartKernel() {
  try {
    const kernelId = yield* getKernelId();
    if (!kernelId) {
      toast.warn("Running kernel hasn't been found");
      return;
    }
    yield call(request, `http://${host}/api/kernels/${kernelId}/restart`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
      method: 'POST',
    });
    toast.success('Kernel has been restarted');
  } catch (error) {
    toast.error("Kernel hasn't been restarted");
  }
}

export default function* appSaga() {
  yield takeLatest(GET_NOTEBOOK, getNotebook);
  yield takeLatest(GET_FILE_NAMES, getFileNames);
  yield takeLatest(SAVE_NOTEBOOK, saveNotebook);
  yield takeLatest(RESTART_KERNEL, restartKernel);
}
