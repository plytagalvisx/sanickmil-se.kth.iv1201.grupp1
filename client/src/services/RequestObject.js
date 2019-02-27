import store from '../store'
let auth = store.state.userModule.user.token === null ? '' : store.state.userModule.user.token;
if (auth === '')// eslint-disable-next-line
  console.log('NO AUTHORIZATION', store.state.userModule.user.token)
export default require('axios').create({
  // headers: {'Authorization': auth}
});