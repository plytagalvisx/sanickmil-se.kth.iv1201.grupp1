import store from '../store'
let auth = store.state.userModule.user.token === null ? '' : store.state.userModule.user.token;
export default require('axios').create({
  headers: {'Authorization': auth}
});