import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
// import UserService from './services/UserService'
import VueCookie from 'vue-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueCookie);
Vue.use(BootstrapVue);
Vue.use(store);

Vue.config.productionTip = false

/**
 * Asserts that the user is logged in at each navigation.
 * Logged out users trying to access logged in pages are
 * redirected to the login page, and may enter the registration
 * page as well.
 */
router.beforeEach( async(to, from, next) => {
  let loggedIn = store.state.loggedIn;
  // eslint-disable-next-line
  console.log(typeof store.state.loggedIn);
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    next();
  } else {
    if (!loggedIn) {
      router.push('/login');
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
