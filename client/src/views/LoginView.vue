<template>
  <b-jumbotron :header="'login-title' | translate" :lead="'login-subtitle' | translate">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="usernameGroup">
        <b-form-input id="usernameInput" 
          type="text" 
          v-model="form.username"
          :placeholder="'login-usernamePlaceholder' | translate"
          @input="$v.form.username.$touch()"
          :state="$v.form.username.$dirty ? !$v.form.username.$error : null"
        />
        <b-form-invalid-feedback id="usernameInput" v-if="!$v.form.username.required">
          {{'login-usernameNotExist' | translate}}
        </b-form-invalid-feedback>

        <b-form-invalid-feedback id="usernameInput" v-if="!$v.form.username.pattern">
          {{'login-usernameInvalid' | translate}}
        </b-form-invalid-feedback>        

      </b-form-group>
      <b-form-group id="passwordGroup">
        <b-form-input id="password"
          type="password"
          v-model="form.password"
          :placeholder="'login-passwordPlaceholder' | translate"
          @input="$v.form.password.$touch()"
          :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
          />

        <b-form-invalid-feedback id="usernameInput" v-if="!$v.form.password.required">
          {{'login-passwordNotExist' | translate}}
        </b-form-invalid-feedback>

      </b-form-group>
      <b-button type="submit" variant="info" :disabled="$v.form.$invalid">{{'login-loginButton' | translate}}</b-button>
    </b-form>
    <p>{{'login-noAccMessage' | translate}} <router-link id="link" to="/register">{{'login-joinUs' | translate}}</router-link>
    </p>
  </b-jumbotron>
</template>

<script>
  import UserService from '../services/UserService.js'
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, helpers } from 'vuelidate/lib/validators'
  const alphaNum = helpers.regex('alphaNum', /[a-öA-Ö\d]/)
  export default {
    name: 'LoginView',
    data() {
      return {
        form: {
          username: '',
          password: '',
          token: null
        },
        show: true,
      }
    },
    mixins: [validationMixin],
    validations: {
      form: {
        username: {
          required: required,
          alphaNum: alphaNum
        },
        password: {
          required: required
        }
      }
    },
    methods: {
      ...mapActions('userModule', [
        'logIn'
      ]),
      async onSubmit(evt) {
        evt.preventDefault();
        await UserService.login(this.form.username, this.form.password)
          .then((data) => {
            this.logIn({
              name: data.username,
              role: data.role,
              token: `${data.token_type} ${data.access_token}`
              });
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
      }
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

