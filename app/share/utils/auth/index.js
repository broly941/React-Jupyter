import request from './fakeRequest';

const { localStorage } = global.window;

const auth = {
  login(username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);
    return request.post('/login', { username, password }).then(response => {
      localStorage.token = response.token;
      return Promise.resolve(true);
    });
  },
  logout() {
    return request.post('/logout');
  },
  loggedIn() {
    return !!localStorage.token;
  },
  register(username, password) {
    return request
      .post('/register', { username, password })
      .then(() => auth.login(username, password));
  },

  onChange() {},
};

export default auth;
