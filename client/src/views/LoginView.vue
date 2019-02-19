<template>
  <b-jumbotron header="Login" lead="You need to login in order to use the service. Please login, or create a new user!">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="usernameGroup">
        <b-form-input id="username" type="text" v-model="form.username" required placeholder="Enter username" />
      </b-form-group>
      <b-form-group id="passwordGroup">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />

      </b-form-group>
      <b-button type="submit" variant="info">Login</b-button>
    </b-form>
    <p>Don't have an account? <router-link id="link" to="/register">Join us!</router-link>
    </p>
  </b-jumbotron>
</template>

<script>
  import UserService from '../services/UserService.js'
  import { mapActions } from 'vuex'
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
      ...mapActions([
        'logIn',
        'setError'
      ]),
      async onSubmit(evt) {
        evt.preventDefault();
        await UserService.login(this.form.username, this.form.password)
          .then((data) => {
            this.logIn({name: this.form.username, token: data.auth, role: data.role});
            localStorage.setItem('userAuth', data.auth);
            this.$emit('displayFlash', data.message, 'success');
            if (data.role === 'applicant') {
              this.$router.push('/');
            } else {
              this.$router.push('/recruiter');
            }
          })
          .catch(err => {
            this.$emit('displayFlash', err.response.data.message, 'error');
          });
      },
      onReset (evt) {
        evt.preventDefault();
        this.form.username = '';
        this.form.password = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      },
    }
  }
</script>

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
