import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueCookies);
Vue.use(BootstrapVue);
Vue.use(store);
axios.interceptors.request.use(function(config) {
  // eslint-disable-next-line
  console.log('NOBODY EXPECTS THE SPANNISH INQUISITION')
  // if (store.state.userModule.user === null)
  //   return config;
  // const token = store.state.userModule.user.token === null ? '' : store.state.userModule.user.token;
  // // eslint-disable-next-line
  // console.log('NOBODY EXPECTS THE SPANNISH INQUISITION')
  // if ( token !== null ) {
  //   // eslint-disable-next-line
  //   console.log('adding header')
  //   config.headers.Authorization = token;
  // }
  return config;
}, function(err) {
  return Promise.reject(err);
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
