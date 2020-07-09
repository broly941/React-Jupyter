import {
  IS_LOGGED_IN_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './constants';

export function isLoggedInRequest() {
  return {
    type: IS_LOGGED_IN_REQUEST,
  };
}

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    payload: data,
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}
