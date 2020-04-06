const userRoutes = [
  {
    path: '/users',
    name: 'users.index',
    component: () => import(/* webpackChunkName: "users" */ '../views/User'),
    meta: {
      middleware: ['auth', 'admin']
    }
  }
];

export default userRoutes;
