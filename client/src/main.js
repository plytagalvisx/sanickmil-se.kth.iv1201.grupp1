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
  const res = await UserService.checkToken();
  if (!res.success && to.fullPath !== '/login') {
    router.push('/login');
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
