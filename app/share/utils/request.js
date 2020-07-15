/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
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
