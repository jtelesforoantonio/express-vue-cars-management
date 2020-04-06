import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import authRoutes from "./auth";
import userRoutes from "./user";
import carRoutes from "./car";

Vue.use(VueRouter);

const routes = [
  ...authRoutes,
  ...userRoutes,
  ...carRoutes,
  {
    path: '*',
    redirect: {
      name: 'cars.index'
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    to.meta.middleware.forEach(middleware => {
      if (middleware === 'auth' && !store.getters['auth/isAuthenticated']) {
        next({name: 'login'});
      } else {
        next();
      }
      if (middleware === 'admin' && store.getters['auth/isAuthenticated'] && !store.state.auth.user.isAdmin) {
        next({name: 'cars.index'});
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router
