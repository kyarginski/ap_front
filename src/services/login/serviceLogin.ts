import request, { getAuthServerUrl } from '@/utils/request';

export async function login2(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${getAuthServerUrl()}api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${getAuthServerUrl()}api/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function queryCurrent(key: string) {
  return request<API.CurrentUser>(`${getAuthServerUrl()}api/user-info/${key}`, {
    method: 'GET',
  });
}
