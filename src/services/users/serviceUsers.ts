// @ts-ignore
/* eslint-disable */
import request, { getAuthServerUrl } from '@/utils/request';

export async function getUsers(
  params?: {
    // query
    /** номер текущей страницы */
    current?: number;
    /** размер страницы */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const token = localStorage.getItem('token');

  const result = request<users.UserList>(`${getAuthServerUrl()}users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '' + token,
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });

  console.log('result >>>', result)

  return result;
}

export async function updateUser(options?: { [key: string]: any }) {
  return request<users.UserListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addUser(options?: { [key: string]: any }) {
  return request<users.UserListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
