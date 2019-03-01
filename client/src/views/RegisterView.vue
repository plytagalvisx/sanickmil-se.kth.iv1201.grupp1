<template>
  <b-jumbotron class="login" :header="'register-title' | translate" :lead="'register-subtitle' | translate">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group id="usernameGroup">
            <b-form-input id="username"
              type="text"
              v-model="form.username"
              required :placeholder="'register-usernamePlaceholder' | translate"
              @input="$v.form.username.$touch()"
              :state="$v.form.username.$dirty ? !$v.form.username.$error : null"
            />

            <b-form-invalid-feedback id="username" v-if="!$v.form.username.required">
              {{ 'register-usernameNotExist' | translate }}
            </b-form-invalid-feedback>

            <b-form-invalid-feedback id="username" v-if="!$v.form.username.pattern">
              {{ 'register-usernameInvalid' | translate }}
            </b-form-invalid-feedback> 
          </b-form-group>
        </b-col>
      </b-row>
  
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group id="passwordGroup">
            <b-form-input
              id="password"
              type="password"
              v-model="form.password"
              :placeholder="'register-passwordPlaceholder' | translate"
              @input="$v.form.password.$touch()"
              :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
            />

            <b-form-invalid-feedback id="password" v-if="!$v.form.password.required">
              {{ 'register-passwordNotExist' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="password" v-if="!$v.form.password.minLength">
              {{ 'register-passwordInvalid' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="password" v-if="!$v.form.password.passwordRegex">
              {{ 'register-passwordformatInvalid' | translate }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
  
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group id="emailGroup">
            <b-form-input id="email"
              type="email"
              v-model="form.email"
              :placeholder="'register-emailPlaceholder' | translate"
              @input="$v.form.email.$touch()"
              :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
            />
            <b-form-invalid-feedback id="email" v-if="!$v.form.email.required">
              {{ 'register-emailNotExist' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="email" v-if="!$v.form.email.email">
              {{ 'register-emailInvalid' | translate }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
  
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group id="firstNameLabel">
            <b-form-input id="firstNameInput"
              :placeholder="'register-firstnamePlaceholder' | translate"
              v-model="form.firstName"
              @input="$v.form.firstName.$touch()"
              :state="$v.form.firstName.$dirty ? !$v.form.firstName.$error : null"
            />
            <b-form-invalid-feedback id="firstNameInput" v-if="!$v.form.firstName.required">
              {{ 'register-firstnameNotExist' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="firstNameInput" v-if="!$v.form.firstName.alpha">
              {{ 'register-firstnameInvalid' | translate }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
  
        <b-col md="6" sm="12">
          <b-form-group id="lastNameLabel">
            <b-form-input id="lastNameInput"
              :placeholder="'register-lastnamePlaceholder' | translate"
              v-model="form.lastName"
              @input="$v.form.lastName.$touch()"
              :state="$v.form.lastName.$dirty ? !$v.form.lastName.$error : null"
            />
            <b-form-invalid-feedback id="lastNameInput" v-if="!$v.form.lastName.required">
              {{ 'register-lastnameNotExist' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="lastNameInput" v-if="!$v.form.lastName.required">
              {{ 'register-lastnameInvalid' | translate }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
  
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group id="ssnGroup">
            <b-form-input id="ssn"
              type="text"
              v-model="form.ssn"
              :placeholder="'register-ssnPlaceholder' | translate"
              @input="$v.form.ssn.$touch()"
              :state="$v.form.ssn.$dirty ? !$v.form.ssn.$error : null"
            />
            <b-form-invalid-feedback id="ssn" v-if="!$v.form.ssn.required">
              {{ 'register-ssnNotExist' | translate }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="ssn" v-if="!$v.form.ssn.ssn">
              {{ 'register-ssnInvalid' | translate }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="button" type="reset" variant="danger">{{ 'register-reset' | translate }}</b-button>
      <b-button :disabled="$v.form.$invalid" class="button" type="submit" variant="info">{{ 'register-registerButton' | translate }}</b-button>
    </b-form>
    <hr>
    <p>{{ 'register-accountAlready' | translate }}
      <router-link id="link" to="/">{{ 'register-loginLink' | translate }}</router-link>
    </p>
  </b-jumbotron>
</template>

<script>
  import UserService from '../services/UserService.js'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, helpers, email } from 'vuelidate/lib/validators'
  const alphaNum = helpers.regex('alphaNum', /[a-öA-Ö\d]/)
  const ssn = helpers.regex('ssn', /^(19|20)[0-9]{6}[- ]?[0-9]{4}$/)
  const password = helpers.regex('password', /[a-öA-Ö\d@$!%*#?&]/)
  const alpha = helpers.regex('alpha', /[a-öA-Ö]/)
  export default {
    name: 'RegisterView',
    data() {
      return {
        form: {
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: '',
          ssn: ''
        },
        show: true,
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        await UserService.register(this.form.username, this.form.password, this.form.email, this.form.firstName, this
          .form.lastName, this.form.ssn)
          .then(resData => {
            this.$router.push('/login');
            this.$emit('displayFlash', resData.data.message, 'success');
          })
          .catch(err => {
            this.$emit('displayFlash', err.response.data.message, 'error');
          });
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.username = '',
        this.form.password = '',
        this.form.email = '',
        this.form.firstName = '',
        this.form.lastName = '',
        this.form.ssn = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
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
          required: required,
          minLength: minLength(6),
          passwordRegex: password
        },
        email: {
          required: required,
          email: email
        },
        firstName: {
          required: required,
          alpha: alpha
        },
        lastName: {
          required: required,
          alpha: alpha
        },
        ssn: {
          required: required,
          ssn: ssn
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .button {
    margin: 0.2em;
  }
</style>