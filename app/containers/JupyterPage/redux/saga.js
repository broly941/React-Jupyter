import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  GET_FILE_NAMES,
  GET_NOTEBOOK,
  RESTART_KERNEL,
  SAVE_NOTEBOOK,
} from './constants';
import request, { requestAxios } from '../../../share/utils/request';
import {
  clearLocalCellStorage,
  getFileNamesInDirSuccess,
  getNotebookSuccess,
} from './actions';
import { makeSelectDir, makeSelectSelectedFileName } from './selectors';
import { token, host } from '../../../share/constants/jupyter-config';

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

    yield call(
      requestAxios,
      `http://${host}/api/contents/${dir}/${selectedFileName}`,
      action.payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      },
    );
    toast.success('Notebook has been updated');
  } catch (error) {
    toast.success("Notebook hasn/'t been updated");
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
