import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// const vuexLocalStorage = new VuexPersist({
//   key: 'vuex-persistance',
//   storage: window.localStorage
// });

export default new Vuex.Store({
  // plugins: [vuexLocalStorage.plugin],
  state: {
    loggedIn: false,
    user: null,
    globalError: null
  },
  mutations: {
    logIn: (state, newUser = {name: 'defaultUser', role: 'DEBUG'}) => {
      state.user = newUser;
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
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