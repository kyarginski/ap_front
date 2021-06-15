import request, { getAuthServerUrl } from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryUsers(params?: TableListParams) {
  const token = localStorage.getItem('token');

  return request(`${getAuthServerUrl()}clients/`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
    },
    params: {
      ...params,
    },
  });
}

export async function addUser(params: TableListParams) {
  const token = localStorage.getItem('token');

  return request(`${getAuthServerUrl()}clients/`, {
    method: 'POST',
    headers: {
      'Authorization': `${token}`,
    },
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: TableListParams) {
  const token = localStorage.getItem('token');

  return request(`${getAuthServerUrl()}clients/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `${token}`,
    },
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteUser(params: { id: number[] }) {
  const token = localStorage.getItem('token');

  return request(`${getAuthServerUrl()}clients/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token}`,
    },
    data: {
      ...params,
    },
  });
}
