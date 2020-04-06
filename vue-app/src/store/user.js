import axios from '../config/axios';

export default {
  namespaced: true,
  state: {
    users: [],
    errors: [],
    loading: false,
    showCreateDialog: false,
    isStoring: false,
    showEditDialog: false,
    isUpdating: false,
    userToEdit: {},
    showDeleteDialog: false,
    isDeleting: false,
    userToDelete: {},
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    pushUser(state, payload) {
      state.users.unshift(payload);
    },
    setShowCreateDialog(state, payload) {
      state.showCreateDialog = payload;
    },
    setIsStoring(state, payload) {
      state.isStoring = payload;
    },
    setShowEditDialog(state, payload) {
      state.showEditDialog = payload;
    },
    setIsUpdating(state, payload) {
      state.isUpdating = payload;
    },
    setUserToEdit(state, payload) {
      state.userToEdit = payload
    },
    updateUser(state, payload) {
      delete payload.password;
      Object.assign(state.users[payload.index], payload);
    },
    setShowDeleteDialog(state, payload) {
      state.showDeleteDialog = payload;
    },
    setIsDeleting(state, payload) {
      state.isDeleting = payload;
    },
    setUserToDelete(state, payload) {
      state.userToDelete = payload
    },
    deleteUser(state, payload) {
      state.users.splice(payload, 1);
    },
    setErrors(state, payload) {
      state.errors = payload;
    }
  },
  actions: {
    async index({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('/users');
        commit('setUsers', response.data);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
      }
    },
    showCreateDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowCreateDialog', payload);
    },
    async store({commit}, payload) {
      try {
        commit('setIsStoring', true);
        const response = await axios.post('/users', payload);
        commit('pushUser', response.data);
        commit('setIsStoring', false);
        commit('setShowCreateDialog', false);
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsStoring', false);
      }
    },
    showEditDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowEditDialog', payload);
    },
    setUserToEdit({commit}, payload) {
      commit('setUserToEdit', payload);
    },
    async update({commit}, payload) {
      try {
        commit('setIsUpdating', true);
        await axios.put(`/users/${payload.id}`, payload);
        commit('setIsUpdating', false);
        commit('setShowEditDialog', false);
        commit('updateUser', payload);
        commit('setUserToEdit', {});
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsUpdating', false);
      }
    },
    showDeleteDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowDeleteDialog', payload);
    },
    setUserToDelete({commit}, payload) {
      commit('setUserToDelete', payload);
    },
    async destroy({commit}, payload) {
      try {
        commit('setIsDeleting', true);
        await axios.delete(`users/${payload.id}`);
        commit('setIsDeleting', false);
        commit('setShowDeleteDialog', false);
        commit('deleteUser', payload.index);
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsDeleting', false);
      }
    }
  },
  getters: {}
}
