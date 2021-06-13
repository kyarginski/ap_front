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
  return request(`${getAuthServerUrl()}clients/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request(`${getAuthServerUrl()}clients/`, {
    method: 'PATCH',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteUser(params: { id: number[] }) {
  return request(`${getAuthServerUrl()}clients/`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
