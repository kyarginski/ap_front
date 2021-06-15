export interface TableListItem {
  id: number;
  username?: string;
  password?: string;
  surname?: string;
  firstname?: string;
  patronymic?: string;
  createDt?: dateTime;
  endDt?: dateTime;
  locked?: number;
  secType?: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
  id?: number;
  username?: string;
  password?: string;
  surname?: string;
  firstname?: string;
  patronymic?: string;
  createDt?: dateTime;
  endDt?: dateTime;
  locked?: number;
  secType?: number;
}
