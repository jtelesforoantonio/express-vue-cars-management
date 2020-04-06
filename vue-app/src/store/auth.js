import axios from '../config/axios';
import router from "../router";

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    errors: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
    closeSession(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  actions: {
    async login({commit}, payload) {
      try {
        commit('setLoading', true);
        commit('setErrors', []);
        const response = await axios.post('/auth/login', payload);
        commit('setUser', response.data);
        commit('setLoading', false);
        router.push({name: 'cars.index'});
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        } else {
          commit('setErrors', ['Ocurrió un error inesperado, inténtalo de nuevo']);
        }
        commit('setLoading', false);
      }
    },
    logout({commit}) {
      commit('closeSession');
      router.push({name: 'login'});
    }
  },
  getters: {
    isAuthenticated: state => state.user !== null
  }
};
