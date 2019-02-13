import store from '../store'
// eslint-disable-next-line
console.log('Store test:', store.state.user.token);
let auth = store.state.user.token === null ? '' : store.state.user.token;
export default require('axios').create({
  headers: {'Authorization': auth}
});