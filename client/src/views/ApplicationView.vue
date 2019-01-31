<template>
  <main id="apply">
    <b-jumbotron>
      <template slot="header">Apply</template>

      <template slot="lead">
        Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be
        decided by the recruiter, depending on your qualifications!
      </template>
      <hr class="my-4">
      <b-container class="bv-example-row">
        <b-form @submit="onSubmit ">
          <b-row>
            <b-col md="6" sm="12">
              <b-form-group id="firstNameLabel" label="First name:" label-for="firstNameInput">
                <b-form-input id="firstNameInput" placeholder="John" v-model="application.firstName" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12">
              <b-form-group id="lastNameLabel" label="Last name:" label-for="lastNameInput">
                <b-form-input id="lastNameInput" placeholder="Doe" v-model="application.lastName" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="12">
              <b-form-group id="emailLabel" label="Email:" label-for="emailInput">
                <b-form-input id="emailInput" placeholder="you@example.com" v-model="application.email" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
<<<<<<< HEAD

          <b-row>
            <b-col sm="12">
              <b-form-group
                id="dobLabel"
                label-for="dobInput"
                label="Date of Birth">
                <b-form-input
                id="dobInput"
                type="date">

                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

=======
          <b-button type="submit" variant="info">Login</b-button>
>>>>>>> working with apply
        </b-form>
      </b-container>
    </b-jumbotron>
  </main>
</template>

<script>
  import UserService from '../services/UserService.js'
  export default {
    name: 'ApplicationView',
    data() {
      return {
        application: {
          firstName: '',
          lastName: '',
          email: ''
        }
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();

        await UserService.apply(this.application.firstName, this.application.lastName, this.application.email).then(
          resData => {
            /* eslint-disable-next-line no-console */
            console.log(resData);
          })
      },
    }
  }
</script>

<style scoped>

  form {
    text-align: left;
  }
</style>