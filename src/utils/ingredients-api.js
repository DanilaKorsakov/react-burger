const ingredientsApiConfig = {
  baseURL: 'https://new-stellarburgers.education-services.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function response(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

export function getIngredients() {
  return response(`${ingredientsApiConfig.baseURL}/ingredients`).then((res) => res.data);
}

export function createOrder(ingredients) {
  return response(`${ingredientsApiConfig.baseURL}/orders`, {
    method: 'POST',
    headers: ingredientsApiConfig.headers,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => ({ name: res.name, order: res.order }));
}
