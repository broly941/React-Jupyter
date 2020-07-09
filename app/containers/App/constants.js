/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const IS_LOGGED_IN_REQUEST = 'App/IS_LOGGED_IN_REQUEST';
export const LOGIN_REQUEST = 'App/LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'App/LOGOUT_REQUEST';
export const LOGIN_SUCCESS = 'App/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'App/LOGOUT_SUCCESS';
export const REGISTER_REQUEST = 'App/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'App/REGISTER_SUCCESS';
