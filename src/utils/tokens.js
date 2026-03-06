import { apiConfig } from '@utils/api.js';
import { request } from '@utils/request.js';

export function isTokenExists() {
  return !!localStorage.getItem('accessToken');
}

export async function refreshToken() {
  const response = await request(`${apiConfig.baseURL}/auth/token`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });

  localStorage.setItem('refreshToken', response.refreshToken);
  localStorage.setItem('accessToken', response.accessToken);

  return response;
}

export async function fetchWithRefresh(url, options) {
  try {
    return await request(url, options);
  } catch (error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      const refreshData = await refreshToken();

      return request(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
}
