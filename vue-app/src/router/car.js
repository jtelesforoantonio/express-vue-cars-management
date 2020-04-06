const carRoutes = [
  {
    path: '/cars',
    name: 'cars.index',
    component: () => import(/* webpackChunkName: "cars" */ '../views/Car'),
    meta: {
      middleware: ['auth']
    }
  }
];

export default carRoutes;
