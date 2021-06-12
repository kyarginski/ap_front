import request, { getAuthServerUrl } from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';


export async function queryInventory(params?: TableListParams) {
  return request(`${getAuthServerUrl()}inventory/`, {
    params,
  });
}

export async function addInventory(params: TableListParams) {
  const params2 = params;
  params2.StatusId = Number(params.StatusId);
  return request(`${getAuthServerUrl()}inventory/`, {
    method: 'POST',
    data: {
      ...params2,
    },
  });
}

export async function updateInventoryStatus(params: TableListParams) {
  return request(`${getAuthServerUrl()}inventory-set-status/`, {
    method: 'PATCH',
    data: {
      ...params,
      method: 'status',
    },
  });
}

export async function updateInventory(params: TableListParams) {
  return request(`${getAuthServerUrl()}inventory/`, {
    method: 'PATCH',
    data: {
      ...params,
      method: 'update',
    },
  });
}


export async function deleteInventory(params: { id: number[] }) {
  return request(`${getAuthServerUrl()}inventory/`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}



export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: { id: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
