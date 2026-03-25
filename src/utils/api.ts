import { request } from '@utils/request.js';
import { fetchWithRefresh } from '@utils/tokens.js';

import type {
  TFormValues,
  TIngredient,
  TIngredientResponse,
  TOrder,
  TOrderResponse,
  TProfileFormValues,
  TResponseWithoutUserInfo,
  TUser,
  TUserResponse,
} from '@utils/types.ts';

type ApiConfig = {
  baseURL: string;
  headers?: Record<string, string>;
};

export const apiConfig: ApiConfig = {
  baseURL: 'https://new-stellarburgers.education-services.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getIngredients(): Promise<TIngredient[]> {
  const response = await request<TIngredientResponse>(
    `${apiConfig.baseURL}/ingredients`
  );
  return response.data;
}

export async function createOrder(ingredients: string[]): Promise<TOrder> {
  const response = await fetchWithRefresh<TOrderResponse>(
    `${apiConfig.baseURL}/orders`,
    {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    }
  );

  return { name: response.name, order: response.order };
}

export async function register(formData: Omit<TFormValues, 'code'>): Promise<TUser> {
  const response = await request<TUserResponse>(`${apiConfig.baseURL}/auth/register`, {
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

export async function login(
  formData: Pick<TFormValues, 'email' | 'password'>
): Promise<TUser> {
  const response = await request<TUserResponse>(`${apiConfig.baseURL}/auth/login`, {
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

export async function logout(): Promise<TResponseWithoutUserInfo> {
  const response = await request<TResponseWithoutUserInfo>(
    `${apiConfig.baseURL}/auth/logout`,
    {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    }
  );

  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  return response;
}

export async function sendEmail(
  formData: Pick<TFormValues, 'email'>
): Promise<TResponseWithoutUserInfo> {
  const response = await request<TResponseWithoutUserInfo>(
    `${apiConfig.baseURL}/password-reset`,
    {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        email: formData.email,
      }),
    }
  );

  localStorage.setItem('hasEmailCode', 'true');

  return response;
}

export async function resetPassword(
  formData: Pick<TFormValues, 'password' | 'code'>
): Promise<TResponseWithoutUserInfo> {
  const response = await request<TResponseWithoutUserInfo>(
    `${apiConfig.baseURL}/password-reset/reset`,
    {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        password: formData.password,
        token: formData.code,
      }),
    }
  );

  localStorage.removeItem('hasEmailCode');

  return response;
}

export async function getUser(): Promise<TUser> {
  const response = await fetchWithRefresh<Pick<TUserResponse, 'success' | 'user'>>(
    `${apiConfig.baseURL}/auth/user`,
    {
      method: 'GET',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
    }
  );

  return response.user;
}

export async function changeUserData(formData: TProfileFormValues): Promise<TUser> {
  const response = await fetchWithRefresh<Pick<TUserResponse, 'success' | 'user'>>(
    `${apiConfig.baseURL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.profilePassword,
      }),
    }
  );

  return response.user;
}
