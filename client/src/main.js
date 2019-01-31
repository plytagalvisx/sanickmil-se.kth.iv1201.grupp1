import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import UserService from './services/UserService'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

Vue.config.productionTip = false

router.beforeEach( async (to, from, next) => {
  try {
     await UserService.checkToken();
  } catch(err) {
    if (to.fullPath !== '/login' && to.fullPath !== '/register') {
      router.push('/login');
    }
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
