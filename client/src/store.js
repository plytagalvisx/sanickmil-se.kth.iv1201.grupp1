import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-persistance',
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    loggedIn: false,
    user: null
  },
  mutations: {
    LOG_IN: (state, newUser = {name: 'defaultUser', role: 'DEBUG'}) => {
      state.user = newUser;
      state.loggedIn = true;
    },
    LOG_OUT: (state => {
      state.loggedIn = false;
    })
  },
  actions: {
    logIn: ({commit}, payload) => {
      commit('LOG_IN', payload);
    },
    logOut: ({commit}) => {
      commit('LOG_OUT');
    }
  }
})