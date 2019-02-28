import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import languages from './assets/localization/languages';

// TODO: Decide on wether or not to keep the persist

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-persistance',
  storage: window.localStorage,
  modules: ['userModule']
});

const userModule = {
  namespaced: true,
  // plugins: [vuexLocalStorage.plugin],
  state: {
    user: {
      name: null,
      token: null,
      role: null
    }
  },
  mutations: {
    logIn: (state, newUser) => {
      state.user = newUser;
    },
    logOut: (state) => {
      state.user.name = null;
      state.user.token = null;
      state.user.role = null;
    }
  },
  actions: {
    logIn: ({commit}, payload) => {
      commit('logIn', payload);
    },
    logOut: ({commit}) => {
      commit('logOut');
    }
  }
}

const applicationModule = {
  namespaced: true,
  state: {
    application: {
      qualifications: [],
      availability: []
    },
    form: {
      username: null,
      password: null
    }
  },
  getters: {
    applicationExists: (state) => state.application.qualifications.length > 0 || state.application.availability.length > 0,
    applicationState: (state) => {
      const availAndQual = (state.application.qualifications.length > 0 || state.application.availability.length > 0);
      if (availAndQual && state.application.submissionDate !== undefined) {
        return 'complete';
      } else if(availAndQual) {
        return 'partial';
      } else {
        return 'empty'
      }
    }
  },
  mutations: {
    addAvailability: (state, avail) => {
      state.application.availability.push(avail);
    },
    addQualification: (state, qual) => {
      state.application.qualifications.push(qual);
    },
    setApplication: (state, appl) => {
      state.application = appl;
    },
    completeApplicationInfo: (state, userInfo) => {
      state.application = {
        ...state.application,
        ...userInfo
      }
    },
    clearApplication: (state) => {
      state.application = {
        qualifications: [],
        availability: []
      }
    }
  },
  actions: {
    addAvailability: ({commit}, payload) => {
      commit('addAvailability', payload);
    },
    addQualification: ({commit}, payload) => {
      commit('addQualification', payload);
    },
    setApplication: ({commit}, payload) => {
      commit('setApplication', payload);
    },
    completeApplicationInfo: ({commit}, payload) => {
      commit('completeApplicationInfo', payload);
    },
    clearApplication: ({commit}) => {
      commit('clearApplication')
    }
  }
}

const languageModule = {
  namespaced: true,
  state: {
    currentLanguage: languages[0].id
  },
  getters: {
    currentLanguage: state => state.currentLanguage,
  },
  mutations: {
    setCurrentLanguage: (state, language) => {
      state.currentLanguage = language;
    }
  },
  actions: {
    setCurrentLanguage: ({commit}, payload) => {
      commit('setCurrentLanguage', payload)
    }
  }
}

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    userModule,
    applicationModule,
    languageModule,
  }
})

/*
store.state.applicationModule ->
store.state.userModule ->
*/