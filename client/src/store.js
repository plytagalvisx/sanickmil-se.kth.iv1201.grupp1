import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

// TODO: Decide on wether or not to keep the persist

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-persistance',
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    user: {
      name: null,
      token: null,
      role: null
    },
    // TODO: To retain username/password when switching from login->register and vice versa
    form: {
      username: null,
      password: null
    },
    globalError: null
  },
  mutations: {
    logIn: (state, newUser) => {
      state.user = newUser;
    },
    logOut: (state) => {
      state.user.name = null;
      state.user.token = null;
      state.user.role = null;
    },
    setError: (state, text) => {
      state.globalError = text;
    }
  },
  actions: {
    logIn: ({commit}, payload) => {
      commit('logIn', payload);
    },
    logOut: ({commit}) => {
      commit('logOut');
    },
    setError: ({commit}, payload) => {
      commit('setError', payload);
    }
  }
})