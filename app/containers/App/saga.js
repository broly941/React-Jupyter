import {hashSync} from 'bcryptjs';
import {call, takeLatest} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST,} from 'containers/App/constants';
import {put} from '@redux-saga/core/effects';
import auth from '../../utils/auth';
import genSalt from '../../utils/auth/salt';
import {loginSuccess, logoutSuccess, registerSuccess} from './actions';
import {IS_LOGGED_IN_REQUEST} from "./constants";

export function* authorize({ username, password, isRegistering }) {
  try {
    const salt = genSalt(username);
    const hash = hashSync(password, salt);
    return isRegistering
      ? yield call(auth.register, username, hash)
      : yield call(auth.login, username, hash);
  } catch (error) {
    // yield put({ type: REQUEST_ERROR, error: error.message });
    return false;
  } finally {
    // yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* isLoggedIn() {
  if (auth.loggedIn()) {
    yield put(loginSuccess());
  }
}

export function* login(action) {
  const { username, password } = action.payload;
  const response = yield call(authorize, {
    username,
    password,
    isRegistering: false,
  });
  if (response) {
    yield put(loginSuccess());
  }
}

export function* logout() {
  const response = yield call(auth.logout);
  if (response) {
    yield put(logoutSuccess());
  }
}

export function* register(action) {
  const { username, password } = action.payload;
  const response = yield call(authorize, {
    username,
    password,
    isRegistering: true,
  });
  if (response) {
    yield put(registerSuccess());
  }
}

export default function* githubData() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_REQUEST, logout);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(IS_LOGGED_IN_REQUEST, isLoggedIn);
}
