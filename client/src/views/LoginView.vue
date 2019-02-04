<template>
  <b-jumbotron class="login" header="Login" lead="You need to login in order to use the service. Please login, or create a new user!">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="usernameGroup">
        <b-form-input id="username" type="text" v-model="form.username" required placeholder="Enter username" />
      </b-form-group>
      <b-form-group id="passwordGroup">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />

      </b-form-group>
      <b-button type="submit" variant="info">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <p>Don't have an account? <router-link id="link" to="/register">Join us!</router-link>
    </p>
  </b-jumbotron>
</template>

<script>
  import UserService from '../services/UserService.js'
  import { mapMutations } from 'vuex'
  export default {
    name: 'LoginView',
    data() {
      return {
        form: {
          username: '',
          password: '',
          token: null
        },
        show: true
      }
    },
    methods: {
      ...mapMutations([
        'LOG_IN'
      ]),
      async onSubmit(evt) {
        evt.preventDefault();

        await UserService.login(this.form.username, this.form.password).then(resData => {
          if (resData.success) {
            this.LOG_IN();
            this.$router.push('/');
          }
        })
        this.form.username = ''
        this.form.password = ''
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #link {
    text-decoration: underline;
    color: #2c3e50;
    font-weight: bold;
  }

  #link:hover {
    color: #5c73a8;
  }
</style>