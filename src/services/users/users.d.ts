// @ts-ignore
/* eslint-disable */

declare namespace users {
  type UserListItem = {
    id?: number;
    login?: string;
    pwd?: string;
    surname?: string;
    firstname?: string;
    patronymic?: string;
    createDt?: dateTime;
    endDt?: dateTime;
    locked?: string;
    secType?: string;
  };

  type UserList = {
    data?: UserListItem[];
    total?: number;
    success?: boolean;
  };

  let users: UserListItem[];
}
