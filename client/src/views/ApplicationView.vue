<template>
<div v-if="stage1"> 
  <b-jumbotron>
  <template slot="header">Apply</template>

<template slot="lead">
   Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be decided by the recruiter, depending on your qualifications!
</template>
      <hr class="my-4">
      <b-container class="bv-example-row">
        <b-form @submit="onSubmit">
          <b-row>
            <b-col md="7" sm="12">
              <b-form-group label="Select expertise:" label-for="expertiseSelect">
                <b-form-select required id="expertiseSelect" :options="skillOptions" v-model="qualifications.name">
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
          <b-row>
            <b-col md="6" sm="12">
              <b-button type="reset" size="lg" variant="danger" @click="onReset">Reset</b-button>
            </b-col>
            <b-col md="6" sm="12">
              <b-button class="button" @click="stage1 = false; stage2 = true" size="lg" variant="info">Next</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-jumbotron>
    </div>
    <ApplicationReceiptComponent :receiptType="'apply'" v-else-if="stage2"/>
</template>

<script>
  import ApplicationService from '../services/ApplicationService.js'
  import ApplicationReceiptComponent from '../components/ApplicationReceiptComponent.vue'
  import {
    mapState
  } from 'vuex'
  export default {
    components: {
      ApplicationReceiptComponent
    },
    name: 'ApplicationView',
    data() {
      return {
        stage1: true,
        stage2: false,
        skillOptions: [],
        qualifications: [],
        availability: []
      }
    },
    computed: {
      ...mapState(['loggedIn', 'user'])
    },
    created() {

      ApplicationService.getSkills()
        .then((res) => {
          this.skillOptions = res.data;
        });
    },
    methods: {
      addExpertise() {
        this.qualifications.push({
          competenceName: this.qualifications.name,
          yearsOfExperience: Number.parseInt(this.qualifications.years)
        })
      },
      addAvailability() {
        this.availability.push({
          from: this.availability.start,
          to: this.availability.end
        })
      },
      async onReset() {
        //Can be used for removing application (I thinkz) :
        //await ApplicationService.removeState()
        this.$cookies.remove('savedState')
        document.getElementById('expertiseSelect').value = '';
        this.qualifications.years = '';
        this.availability.start = '';
        this.availability.end = '';
        this.availability = [];
        this.qualifications = [];
      },
      onSubmit(evt) {
        evt.preventDefault();
      }
    }
  }
</script>

<style scoped>
  form {
    text-align: left;
  }
  
  .button {
    float: right;
  }
  
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
</style>