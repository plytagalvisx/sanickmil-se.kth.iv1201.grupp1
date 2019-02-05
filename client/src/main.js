import Vue from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import store from './store'
=======
>>>>>>> started work on saving state of application in cookies
import BootstrapVue from 'bootstrap-vue'
import UserService from './services/UserService'
import VueCookie from 'vue-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueCookie);
Vue.use(BootstrapVue);
<<<<<<< HEAD
Vue.use(store);

Vue.config.productionTip = false

/**
 * Asserts that the user is logged in at each navigation.
 * Logged out users trying to access logged in pages are
 * redirected to the login page, and may enter the registration
 * page as well.
 */
router.beforeEach( async(to, from, next) => {
  try {
    await UserService.checkToken();
=======

Vue.config.productionTip = false

router.beforeEach( async (to, from, next) => {
  try {
     await UserService.checkToken();
>>>>>>> started work on saving state of application in cookies
  } catch(err) {
    if (to.fullPath !== '/login' && to.fullPath !== '/register') {
      router.push('/login');
    }
  }
  next();
});

new Vue({
  router,
<<<<<<< HEAD
  store,
=======
>>>>>>> started work on saving state of application in cookies
  render: h => h(App)
}).$mount('#app')
