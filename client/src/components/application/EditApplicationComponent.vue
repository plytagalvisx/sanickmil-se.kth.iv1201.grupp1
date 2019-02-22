<template>
  <div>
    <hr class="my-4">
    <b-container class="bv-example-row">
      <b-form>
        <b-row>
          <b-col md="7" sm="12">
            <b-form-group label="Select expertise:" label-for="expertiseSelect">
              <b-form-select required id="expertiseSelect" :options="skillOptions" v-model="inputQualification.name">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Experience (years):" label-for="yearsInput">
              <b-form-input type="number" id="yearsInput" placeholder="Years of expertise" v-model="inputQualification.years"
                required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="New entry" label-for="newExpertise">
              <b-button id="newExpertise" @click="storeQualification" required>+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Qualifications:">
              <b-table striped :items="application.qualifications"></b-table>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityStartLabel" label="Availability from:" label-for="availabilityStartDate">
              <b-form-input id="availabilityStartDate" type="date" v-model="inputAvailability.start" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityEndLabel" label="Availability to:" label-for="availabilityEndDate">
              <b-form-input id="availabilityEndDate" type="date" v-model="inputAvailability.end" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group id="expertise" label="New entry" label-for="newAvailability">
              <b-button id="newAvailability" @click="storeAvailability" required>+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Availability:">
              <b-table striped :items="application.availability"></b-table>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col offset="6" md="6" sm="12">
            <b-button class="button" @click="$emit('progressStage')" size="lg" variant="info">Next</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import ApplicationService from '../../services/ApplicationService'
  import {mapState, mapActions, mapGetters} from 'vuex';
  export default {
    name: 'EditApplicationComponent',
    data() {
      return {
        skillOptions: [],
        inputQualification: {},
        inputAvailability: {}
      }
    },
    created() {
      // TODO: Show some loading while the skills are being fetched.
      ApplicationService.getSkills()
        .then((res) => {
          this.skillOptions = res.data;
        });
      // TODO: Show some loading if this need to be fetced as well?
      if (!this.applicationExists) {
        ApplicationService.getApplication()
          .then((res => {
          this.setApplication(res.data)
        }))
        .catch(err => {
          // eslint-disable-next-line
          console.log('No application was found', err.response.status, err.response.data);
          // this.$emit('propagateFlash', err.response.data, 'error')
        });
      }
    },
    methods: {
      ...mapActions('applicationModule', [
        'addQualification',
        'addAvailability',
        'setApplication'
      ]),
      storeQualification() {
        this.addQualification({
          competenceName: this.inputQualification.name,
          yearsOfExperience: Number.parseInt(this.inputQualification.years)
        });
      },
      storeAvailability() {
        this.addAvailability({
          from: this.inputAvailability.start,
          to: this.inputAvailability.end
        });
      },
    },
    computed: {
      ...mapState('applicationModule', ['application']),
      ...mapGetters('applicationModule', ['applicationExists'])
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