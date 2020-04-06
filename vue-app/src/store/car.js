import store from '../store';
import axios from '../config/axios';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default {
  namespaced: true,
  state: {
    cars: [],
    errors: [],
    loading: false,
    showCreateDialog: false,
    isStoring: false,
    showEditDialog: false,
    isUpdating: false,
    carToEdit: {},
    showDeleteDialog: false,
    isDeleting: false,
    carToDelete: {},
    showPositionDialog: false,
    isUpdatingPosition: false,
    carToPosition: {}
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setCars(state, payload) {
      state.cars = payload;
    },
    pushCar(state, payload) {
      state.cars.unshift(payload);
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
    setCarToEdit(state, payload) {
      state.carToEdit = payload
    },
    updateCar(state, payload) {
      for (let index = 0; index < state.cars.length; index++) {
        if (state.cars[index].id === payload.id) {
          Object.assign(state.cars[index], payload);
          break;
        }
      }
    },
    setShowDeleteDialog(state, payload) {
      state.showDeleteDialog = payload;
    },
    setIsDeleting(state, payload) {
      state.isDeleting = payload;
    },
    setCarToDelete(state, payload) {
      state.carToDelete = payload
    },
    deleteCar(state, payload) {
      for (let index = 0; index < state.cars.length; index++) {
        if (state.cars[index].id === payload.id) {
          state.cars.splice(index, 1);
          break;
        }
      }
    },
    setShowPositionDialog(state, payload) {
      state.showPositionDialog = payload;
    },
    setCarToPosition(state, payload) {
      state.carToPosition = payload;
    },
    updatePosition(state, payload) {
      for (let index = 0; index < state.cars.length; index++) {
        if (state.cars[index].id === payload.id) {
          state.cars[index].position.lat = payload.lat;
          state.cars[index].position.lng = payload.lng;
          break;
        }
      }
    },
    setIsUpdatingPosition(state, payload) {
      state.isUpdatingPosition = payload;
    },
    setErrors(state, payload) {
      state.errors = payload;
    }
  },
  actions: {
    initSocket({commit}) {
      socket.on('NEW_CAR', data => {
        if (store.state.auth.user.isAdmin) {
          commit('pushCar', data);
        }
      });
      socket.on('UPDATE_CAR', data => {
        commit('updateCar', data);
      });
      socket.on('UPDATE_CAR_POSITION', data => {
        commit('updatePosition', data);
      });
      socket.on('DELETE_CAR', data => {
        commit('deleteCar', data);
      });
    },
    async index({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('/cars');
        commit('setCars', response.data);
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
        const response = await axios.post('/cars', payload);
        commit('pushCar', response.data);
        commit('setIsStoring', false);
        commit('setShowCreateDialog', false);
        socket.emit('NEW_CAR', response.data);
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
    setCarToEdit({commit}, payload) {
      commit('setCarToEdit', payload);
    },
    async update({commit}, payload) {
      try {
        commit('setIsUpdating', true);
        await axios.put(`/cars/${payload.id}`, payload);
        commit('setIsUpdating', false);
        commit('setShowEditDialog', false);
        commit('updateCar', payload);
        commit('setCarToEdit', {});
        socket.emit('UPDATE_CAR', payload);
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
    setCarToDelete({commit}, payload) {
      commit('setCarToDelete', payload);
    },
    async destroy({commit}, payload) {
      try {
        commit('setIsDeleting', true);
        await axios.delete(`cars/${payload.id}`);
        commit('setIsDeleting', false);
        commit('setShowDeleteDialog', false);
        commit('deleteCar', payload);
        socket.emit('DELETE_CAR', payload);
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsDeleting', false);
      }
    },
    showPositionDialog({commit}, payload) {
      commit('setErrors', []);
      commit('setShowPositionDialog', payload);
    },
    setCarToPosition({commit}, payload) {
      commit('setCarToPosition', payload);
    },
    async updatePosition({commit}, payload) {
      try {
        commit('setIsUpdatingPosition', true);
        await axios.patch(`/cars/${payload.id}/position`, {position: payload});
        commit('setIsUpdatingPosition', false);
        commit('setShowPositionDialog', false);
        commit('updatePosition', payload);
        socket.emit('UPDATE_CAR_POSITION', payload);
      } catch (e) {
        if (e.response) {
          commit('setErrors', e.response.data.errors);
        }
        commit('setIsUpdatingPosition', false);
      }
    }
  },
  getters: {}
}
