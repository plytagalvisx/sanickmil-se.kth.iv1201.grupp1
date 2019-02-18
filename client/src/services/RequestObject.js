import store from '../store'
let auth = store.state.user.token === null ? '' : store.state.user.token;
export default require('axios').create({
  headers: {'Authorization': auth}
});