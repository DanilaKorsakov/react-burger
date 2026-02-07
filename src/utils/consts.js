const ingredientsLink =
  'https://new-stellarburgers.education-services.ru/api/ingredients';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function request(url = ingredientsLink, options = {}) {
  return fetch(url, options).then(checkResponse);
}
