import axios from 'axios';

function checkStatus(response) {
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

function checkAxiosStatus(response) {
  if (response.status !== 200) {
    throw response;
  }
  return response.data;
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .catch(error => {
      const body = error.text().then(errorMessage => JSON.parse(errorMessage));
      const err = new Error(error.statusText);
      err.body = body;
      err.status = error.status;
      throw err;
    });
}

export function requestAxios(url, requesBody, options) {
  return axios
    .put(url, requesBody, options)
    .then(checkAxiosStatus)
    .catch(error => {
      console.log(error);
    });
}
