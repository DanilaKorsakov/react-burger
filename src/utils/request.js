class ServerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  throw new ServerError(res.message, res.status);
}

export function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}
