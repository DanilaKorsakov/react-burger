export class ServerError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }

  throw new ServerError(` Ошибка ${res.statusText}`, res.status);
}

export function request<T>(url: string, options = {}): Promise<T> {
  return fetch(url, options).then(checkResponse<T>);
}
