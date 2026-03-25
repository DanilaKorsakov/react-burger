import { apiConfig } from '@utils/api.ts';
import { request, ServerError } from '@utils/request.ts';

type RefreshTokenType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export function isTokenExists(): boolean {
  return !!localStorage.getItem('accessToken');
}

export async function refreshToken(): Promise<RefreshTokenType> {
  const response: RefreshTokenType = await request(`${apiConfig.baseURL}/auth/token`, {
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

export async function fetchWithRefresh<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    return await request(url, options);
  } catch (error) {
    if (
      error instanceof ServerError &&
      (error.statusCode === 401 || error.statusCode === 403)
    ) {
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
