import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { toast } from 'react-toastify';
import genSalt from './salt';

let users;
const { localStorage } = global.window;
const salt = genSaltSync(10);

const server = {
  /**
   * Populates the users, similar to seeding a database in the real world
   */
  init() {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      // Set default user
      const test = 'test';
      const testSalt = genSalt(test);
      const testPass = hashSync('password', testSalt);

      users = {
        [test]: hashSync(testPass, salt),
      };

      localStorage.users = JSON.stringify(users);
      localStorage.encrypted = true;
    } else {
      users = JSON.parse(localStorage.users);
    }
  },
  /**
   * Pretends to log a user in
   *
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  login(username, password) {
    const userExists = this.doesUserExist(username);

    return new Promise((resolve, reject) => {
      if (userExists && compareSync(password, users[username])) {
        resolve({
          authenticated: true,
          // Fake a random token
          token: Math.random()
            .toString(36)
            .substring(7),
        });
      } else {
        let error;
        if (userExists) {
          toast.error('Wrong password');
          error = new Error('Wrong password');
        } else {
          toast.error("User doesn't exist");
          error = new Error("User doesn't exist");
        }
        reject(error);
      }
    });
  },

  /**
   * Pretends to register a user
   *
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  register(username, password) {
    return new Promise((resolve, reject) => {
      // If the username isn't used, hash the password with bcrypt to store it in localStorage
      if (!this.doesUserExist(username)) {
        users[username] = hashSync(password, salt);
        localStorage.users = JSON.stringify(users);

        // Resolve when done
        resolve({ registered: true });
      } else {
        toast.error('Username already in use');
        // Reject with appropiate error
        reject(new Error('Username already in use'));
      }
    });
  },

  /**
   * Pretends to log a user out and resolves
   */
  logout() {
    return new Promise(resolve => {
      localStorage.removeItem('token');
      resolve(true);
    });
  },

  /**
   * Checks if a username exists in the db
   * @param  {string} username The username that should be checked
   */
  doesUserExist(username) {
    return !(users[username] === undefined);
  },
};

server.init();

export default server;
