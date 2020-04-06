const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/auth/Login'),
    meta: {
      middleware: ['guest']
    }
  }
];

export default authRoutes;
