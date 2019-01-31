<template>
<main>
    <b-jumbotron class="login" header="Register" lead="Enter your preferred user information">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group id="usernameGroup">
              <b-form-input id="username" type="text" v-model="form.username" required placeholder="Username:" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group id="passwordGroup">
              <b-form-input id="password" type="password" v-model="form.password" required placeholder="Password:" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group id="emailGroup">
              <b-form-input id="email" type="text" v-model="form.email" required placeholder="Email:" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group id="firstNameLabel">
              <b-form-input id="firstNameInput" placeholder="First name:" v-model="form.firstName" required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-form-group id="lastNameLabel">
              <b-form-input id="lastNameInput" placeholder="Last name:" v-model="form.lastName" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group id="birthGroup">
              <b-form-input id="birth" type="date" v-model="form.birth" required placeholder="dd-mm-yyyy" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="info">Register</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <hr>
      <p>Already have an account? <router-link id="link" to="/">Login!</router-link>
      </p>
    </b-jumbotron>
  </main>
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
          email: '',
          firstName: '',
          lastName: '',
          birth: ''
        },
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        this.form.username = '',
        this.form.password = '',
        this.form.email = '',
        this.form.firstName = '',
        this.form.lastName = '',
        this.form.birth = ''
        await UserService.register(this.form.username, this.form.password, this.form.email, this.form.firstName, this.form.lastName, this.form.birth).then(resData => {
          /* eslint-disable-next-line no-console */
          console.log(resData);
        })
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.username = '';
        this.form.password = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      }
    },
    create() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>