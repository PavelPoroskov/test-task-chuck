function fetchBase(
  method,
  apipoint,
  token,
  input,
  _options
) {
  let options = _options || {};
  options['method'] = method;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  options['headers'] = headers;

  if (input) {
    options['body'] = JSON.stringify(input);
  }

  return fetch(apipoint, options)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      return result.text();
    })
    .then(result => {
      if (typeof result == 'string') {
        throw new Error(result);
      }
      return result;
    });
}

export const get = (apipoint, token, input) => fetchBase('GET', apipoint, token, input);

export const post = (apipoint, token, input, options ) => fetchBase('POST', apipoint, token, input, options);
