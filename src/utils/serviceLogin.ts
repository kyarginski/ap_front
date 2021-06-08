import request, {getAdminBaseUrl} from '@/utils/request';

export async function login2(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${getAdminBaseUrl()}api/login/account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function queryCurrent(key: string) {
  return request<API.CurrentUser>(`${getAdminBaseUrl()}api/user-info/${key}`, {
    method: 'GET',
  });
}