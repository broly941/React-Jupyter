function checkStatus(response) {
  if (!response.ok) {
    throw response;
  }
  return response.json();
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
