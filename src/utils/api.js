import { request } from '@utils/request.js';
import { fetchWithRefresh } from '@utils/tokens.js';

export const apiConfig = {
  baseURL: 'https://new-stellarburgers.education-services.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getIngredients() {
  const response = await request(`${apiConfig.baseURL}/ingredients`);
  return response.data;
}

export async function createOrder(ingredients) {
  const response = await fetchWithRefresh(`${apiConfig.baseURL}/orders`, {
    method: 'POST',
    headers: {
      ...apiConfig.headers,
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });

  return { name: response.name, order: response.order };
}

export async function register(formData) {
  const response = await request(`${apiConfig.baseURL}/auth/register`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    }),
  });

  localStorage.setItem('refreshToken', response.refreshToken);
  localStorage.setItem('accessToken', response.accessToken);

  return response.user;
}

export async function login(formData) {
  const response = await request(`${apiConfig.baseURL}/auth/login`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  localStorage.setItem('refreshToken', response.refreshToken);
  localStorage.setItem('accessToken', response.accessToken);

  return response.user;
}

export async function logout() {
  const response = await request(`${apiConfig.baseURL}/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });

  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  return response;
}

export async function sendEmail(formData) {
  const response = await request(`${apiConfig.baseURL}/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: formData.email,
    }),
  });

  localStorage.setItem('hasEmailCode', true);

  return response;
}

export async function resetPassword(formData) {
  const response = await request(`${apiConfig.baseURL}/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      password: formData.password,
      token: formData.code,
    }),
  });

  localStorage.removeItem('hasEmailCode');

  return response;
}

export async function getUser() {
  return await fetchWithRefresh(`${apiConfig.baseURL}/auth/user`, {
    method: 'GET',
    headers: {
      ...apiConfig.headers,
      authorization: localStorage.getItem('accessToken'),
    },
  });
}

export async function changeUserData(formData) {
  const response = await fetchWithRefresh(`${apiConfig.baseURL}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...apiConfig.headers,
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  });

  return response.user;
}
