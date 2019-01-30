<template>
  <div id="apply">
    <b-jumbotron>
      <template slot="header">Apply</template>

      <template slot="lead">
        Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be
        decided by the recruiter, depending on you qualifications!
      </template>
      <hr class="my-4">
      <b-container class="bv-example-row">
        <b-form>
          <b-row>
            <b-col md="6" sm="12">
              <b-form-group
              id="firstNameLabel"
              label="First name:"
              label-for="firstNameInput">
              <b-form-input
                id="firstNameInput"
                placeholder="John"
                v-model="application.firstName"
                required>
              </b-form-input>
            </b-form-group>
            </b-col>
              <b-col md="6" sm="12">
                <b-form-group
                id="lastNameLabel"
                label="Last name:"
                label-for="lastNameInput">
                <b-form-input
                  id="lastNameInput"
                  placeholder="Doe"
                  v-model="application.lastName"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="12">
              <b-form-group
                id="emailLabel"
                label="Email:"
                label-for="emailInput">
                <b-form-input
                  id="emailInput"
                  placeholder="you@example.com"
                  v-model="application.emial"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

        </b-form>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
  #apply {
    max-width: 900px;
    margin: 0 auto;
  }

  form {
    text-align: left;
  }
</style>