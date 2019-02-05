import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ApplicationView from './views/ApplicationView'
import DashboardView from './views/DashboardView'
import Profile from './views/Profile'
import FinalApplication from './views/FinalApplication'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/apply',
      name: 'apply',
      component: ApplicationView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: FinalApplication
    }
  ]
})
