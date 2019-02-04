<template>
  <b-jumbotron>
    <template slot="header">Apply</template>

    <template slot="lead">
      Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be
      decided by the recruiter, depending on your qualifications!
    </template>
    <hr class="my-4">
    <b-container class="bv-example-row">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col md="7" sm="12">
            <b-form-group id="expertise" label="Select expertise:" label-for="expertiseSelect">
              <b-form-select id="expertiseSelect" :options="options" placeholder="Select expertise" v-model="application.expertise" required>
              </b-form-select>
            </b-form-group>
          </b-col>
        <b-col md="3" sm="12">
            <b-form-group id="expertise" label="Experience (years):" label-for="yearsInput">
              <b-form-input type="number" id="yearsInput" placeholder="Years of expertise" v-model="application.expertiseYears" required>
              </b-form-input>
            </b-form-group>
          </b-col>
        <b-col md="2" sm="12">
            <b-form-group id="expertise" label="New entry" label-for="newExpertise">
              <b-button id="newExpertise" :options="options" placeholder="Select expertise" required>+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <p><i>Preview med alla hittils tillagda expertiser</i></p>

        <b-row>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityStartLabel" label="Availability from:" label-for="availabilityStartDate">
              <b-form-input id="availabilityStartDate" type="date" v-model="application.startAvailability" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityEndLabel" label="Availability to:" label-for="availabilityEndDate">
              <b-form-input id="availabilityEndDate" type="date" v-model="application.endAvailability" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group id="expertise" label="New entry" label-for="newAvailability">
              <b-button id="newAvailability" :options="options" placeholder="Select expertise" required>+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <p><i>Visa sammanställning av input</i></p>

        <b-button type="submit" variant="info">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>
    </b-container>
  </b-jumbotron>
</template>

<script>
  import UserService from '../services/UserService.js'
  export default {
    name: 'ApplicationView',
    data() {
      return {
        options: [
        { value: null, text: 'Please select an expertise' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: {'C': '3PO'}, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
        application: {
          
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