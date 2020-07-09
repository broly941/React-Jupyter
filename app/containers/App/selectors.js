/**
 * The global state selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectIsUserLoggedIn = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isUserLoggedIn,
  );

export { selectGlobal, makeSelectError, makeSelectIsUserLoggedIn };
