<template>
  <div class="hello">
    <b-jumbotron class="login" header="Register new user" lead="Enter your perferred username and password">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="usernameGroup">
          <b-form-input id="username" type="text" v-model="form.username" required placeholder="Enter username"/>
        </b-form-group>
        <b-form-group id="passwordGroup">
         <b-form-input id="password" type="text" v-model="form.password" required placeholder="Enter password"/>
        </b-form-group>
        <b-button type="submit" variant="info">Register</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <p>Already have an account? <router-link id="link" to="/">Login!</router-link> </p>
    </b-jumbotron>
  </div>
</template>

<script>
import UserService from '../services/UserService.js'
  export default {
    name: 'RegisterView',
    data () {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault();
        await UserService.insertUser(this.form.username, this.form.password).then(resData => {
        /* eslint-disable-next-line no-console */
        console.log(resData);
      })
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.username = '';
        this.form.password = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    },
    create() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
