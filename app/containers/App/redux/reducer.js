/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  error: null,
  isUserLoggedIn: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        draft.isUserLoggedIn = true;
        break;
      case LOGOUT_SUCCESS:
        draft.isUserLoggedIn = false;
        break;
    }
  });

export default appReducer;
