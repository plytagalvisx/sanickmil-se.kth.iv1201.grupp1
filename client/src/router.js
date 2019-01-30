import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/Register.vue'
import Form from './views/Form.vue'
import ApplicantComponent from './views/Application.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form
    },
    {
      path: '/',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/apply',
      name: 'apply',
      component: ApplicantComponent
    }
  ]
})
