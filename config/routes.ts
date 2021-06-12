export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  {
    path: '/dictionaries',
    name: 'dictionaries',
    icon: 'table',
    access: 'canAdmin',
    routes: [
      {
        path: '/dictionaries/employees',
        name: 'employees',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/responsibilities',
        name: 'responsibilities',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/warehouses',
        name: 'warehouses',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/offices',
        name: 'offices',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/vehicles',
        name: 'vehicles',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/buyers',
        name: 'buyers',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/suppliers',
        name: 'suppliers',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/banks',
        name: 'banks',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/dictionaries/expenses',
        name: 'expenses',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },

  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/admin/users',
        name: 'users',
        icon: 'table',
        component: './UserList',
      },
      {
        path: '/admin/Inventory',
        name: 'inventory',
        icon: 'table',
        component: './Inventory',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
