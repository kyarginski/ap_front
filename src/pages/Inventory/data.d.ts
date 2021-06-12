export interface TableListItem {
  Id: number;
  Name: string;
  Note: string;
  StatusId: number;
  UserName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
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
  StatusId?: number;
  Name?: string;
  Note?: string;
  UserName?: string;
  Id?: number;
  pageSize?: number;
  currentPage?: number;
}
