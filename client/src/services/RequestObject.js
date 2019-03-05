import store from '../store'
let axiosInstance = require('axios').create({
  timeout: 1000
});
/**
 * Adds the authrization header before each request.
 */
axiosInstance.interceptors.request.use(config => {
  if (store.state.userModule.user.token) {
    config.headers.authorization = store.state.userModule.user.token;
  }
  return config;
  },
  error => Promise.reject(error)
);
export default axiosInstance;
