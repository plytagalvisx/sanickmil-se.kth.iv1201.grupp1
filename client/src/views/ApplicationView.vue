<template>
<<<<<<< HEAD
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
=======
  <main id="apply">
    <b-jumbotron>
      <template slot="header">Apply</template>

      <template slot="lead">
        Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be
        decided by the recruiter, depending on your qualifications!
      </template>
      <hr class="my-4">
      <b-container class="bv-example-row">
        <b-form>
          <b-row>
            <b-col md="7" sm="12">
              <b-form-group label="Select expertise:" label-for="expertiseSelect">
                <b-form-select id="expertiseSelect" :options="options" placeholder="Select expertise" v-model="qualifications.name" required>
                </b-form-select>
              </b-form-group>
            </b-col>
          <b-col md="3" sm="12">
              <b-form-group label="Experience (years):" label-for="yearsInput">
                <b-form-input type="number" id="yearsInput" placeholder="Years of expertise" v-model="qualifications.years" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          <b-col md="2" sm="12">
              <b-form-group label="New entry" label-for="newExpertise">
                <b-button id="newExpertise" @click="addExpertise" required>+</b-button>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12" sm="12">
              <b-form-group label="Qualifications:">
                <b-table striped :items="qualifications"></b-table>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="5" sm="12">
              <b-form-group id="availabilityStartLabel" label="Availability from:" label-for="availabilityStartDate">
                <b-form-input id="availabilityStartDate" type="date" v-model="availability.start" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="5" sm="12">
              <b-form-group id="availabilityEndLabel" label="Availability to:" label-for="availabilityEndDate">
                <b-form-input id="availabilityEndDate" type="date" v-model="availability.end" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="2" sm="12">
              <b-form-group id="expertise" label="New entry" label-for="newAvailability">
                <b-button id="newAvailability" @click="addAvailability" required>+</b-button>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12" sm="12">
              <b-form-group label="Availability:">
                <b-table striped :items="availability"></b-table>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button to="/finalizeApplicationView" variant="info">next</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>

        </b-form>
      </b-container>
    </b-jumbotron>
  </main>
>>>>>>> started work on saving state of application in cookies
</template>

<script>
  import UserService from '../services/UserService.js'
  export default {
    name: 'ApplicationView',
    data() {
      return {
        options: [
<<<<<<< HEAD
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
=======
        { value: null, text: 'Please select an expertise', disabled: true },
        { value: 'Slav', text: 'Slav' },
        { value: 'Waiter', text: 'Waiter'},
        { value: 'General manager', text: 'General manager' },
        { value: 'Boss', text: 'Boss'},
      ],
        qualifications:[],
        availability:[]
      }
    },
    methods: {
      addExpertise(){
        this.qualifications.push({expertise: this.qualifications.name, years: this.qualifications.years})
        this.storeState()
      },
      addAvailability(){
        this.availability.push({startDate: this.availability.start, endDate: this.availability.end})
        this.storeState()
      },
      async storeState(){
        await UserService.saveState(this.qualifications, this.availability)
      },
      submit(){
        //skicka båda arrayerna med datan till en service och sedan vidare till backend.
      }
>>>>>>> started work on saving state of application in cookies
    }
  }
</script>

<style scoped>

  form {
    text-align: left;
  }
</style>