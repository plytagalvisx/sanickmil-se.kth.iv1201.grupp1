import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ApplicationView from './views/ApplicationView'
import DashboardView from './views/DashboardView'
import RecruiterDashboard from './views/RecruiterDashboard'
import Profile from './views/Profile'
import store from './store'

Vue.use(Router)

const router = new Router({
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
      path: '/recruiter',
      name: 'recruiter',
      component: RecruiterDashboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

/**
 * Asserts that the user is logged in at each navigation.
 * Logged out users trying to access logged in pages are
 * redirected to the login page, and may enter the registration
 * page as well.
 */
router.beforeEach( async(to, from, next) => {
  let loggedIn = store.state.userModule.user.token !== null;
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    next();
  } else {
    if (!loggedIn) {
      router.push('/login');
    }
  }
  next();
});

export default router;
