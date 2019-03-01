<template>
  <Stretch v-if="loading"/>
  <div v-else>
    <hr class="my-4">
    <b-container class="bv-example-row">
      <b-form>
        <b-row>
          <b-col md="7" sm="12">
            <b-form-group :label="'apply-competenceLabel' | translate" label-for="expertiseSelect">
              <b-form-select
                id="expertiseSelect"
                :options="skillOptions"
                v-model="inputQualification.name"
                @input="$v.inputQualification.name.$touch()"
                :state="$v.inputQualification.name.$dirty ? !$v.inputQualification.name.$error : null"
              />
              <b-form-invalid-feedback id="expertiseSelect" v-if="!$v.inputQualification.name.required">
                {{'apply-edit-qualiInvalid' | translate}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group :label="'apply-experienceLabel' | translate" label-for="yearsInput">
              <b-form-input type="number" 
                id="yearsInput"
                :placeholder="'apply-experiencePlaceholder' | translate"
                v-model="inputQualification.years"
                @input="$v.inputQualification.years.$touch()"
                :state="$v.inputQualification.years.$dirty ? !$v.inputQualification.years.$error : null"
              />
              <b-form-invalid-feedback id="yearsInput" v-if="!$v.inputQualification.years.required">
                {{'apply-edit-expInvalid' | translate}}
            </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group :label="'apply-newEntry' | translate" label-for="newExpertise">
              <b-button id="newExpertise" @click="storeQualification" :disabled="$v.inputQualification.$invalid">+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group :label="'apply-competence' | translate">
              <b-table id="qualifications" striped :items="application.qualifications"
                @input="$v.application.qualifications.$touch()"
                :state="$v.application.qualifications.$dirty ? !$v.application.qualifications.$error : null"
              />
              <b-form-invalid-feedback id="qualifications" v-if="!$v.application.qualifications.required">
                {{'apply-edit-availNotExist' | translate}}
            </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityStartLabel" :label="'apply-availabilityFrom' | translate" label-for="availabilityStartDate">
              <b-form-input id="availabilityStartDate"
                type="date"
                v-model="inputAvailability.start" 
                @input="$v.inputAvailability.start.$touch()"
                :state="$v.inputAvailability.start.$dirty ? !$v.inputAvailability.start.$error : null"
              />
              <b-form-invalid-feedback id="availabilityStartDate" v-if="!$v.inputAvailability.start.required">
                {{'apply-edit-startNotExist' | translate}}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="availabilityStartDate" v-if="!$v.inputAvailability.start.dateForm">
                {{'apply-edit-dateInvalid' | translate}}
            </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group id="availabilityEndLabel" :label="'apply-availabilityTo' | translate" label-for="availabilityEndDate">
              <b-form-input id="availabilityEndDate"
                type="date"
                v-model="inputAvailability.end"
                @input="$v.inputAvailability.end.$touch()"
                :state="$v.inputAvailability.end.$dirty ? !$v.inputAvailability.end.$error : null"
              />
              <b-form-invalid-feedback id="availabilityEndLabel" v-if="!$v.inputAvailability.end.startDateBeforeEnd">
                {{'apply-edit-endBeforeStart' | translate}}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="availabilityEndLabel" v-if="!$v.inputAvailability.end.required">
                {{'apply-edit-endNotExist' | translate}}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback id="availabilityStartDate" v-if="!$v.inputAvailability.end.dateForm">
                {{'apply-edit-dateInvalid' | translate}}
            </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group id="expertise" :label="'apply-newEntry' | translate" label-for="newAvailability">
              <b-button id="newAvailability" @click="storeAvailability" :disabled="$v.inputAvailability.$invalid" >+</b-button>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" sm="12">
            <b-form-group :label="'apply-availability' | translate">
              <b-table striped :items="application.availability"
                @input="$v.application.availability.$touch()"
                :state="$v.application.availability.$dirty ? !$v.application.availability.$error : null"
              />
              <b-form-invalid-feedback id="lastNameInput" v-if="!$v.application.availability.required">
                {{'apply-edit-availNotExist' | translate}}
            </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col offset="6" md="6" sm="12">
            <b-button class="button" @click="$emit('progressStage')" size="lg" variant="info" :disabled="$v.application.$invalid">{{'apply-next' | translate}}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import ApplicationService from '../../services/ApplicationService';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import { validationMixin } from 'vuelidate';
  import { required, helpers } from 'vuelidate/lib/validators';
  import {Stretch} from 'vue-loading-spinner';
  const checkDateForm = helpers.regex('checkDateForm', /^2\d{3}(-\d{2}){2}$/);

  function startDateBeforeEnd() {
    return this.inputAvailability.start < this.inputAvailability.end;
  }

  export default {
    name: 'EditApplicationComponent',
    data() {
      return {
        skillOptions: [],
        inputQualification: {},
        inputAvailability: {},
        loading: true
      }
    },
    created() {
      ApplicationService.getSkills()
        .then((res) => {
          this.loading = true;
          this.skillOptions = res.data;
        })
        .finally(() => {
          this.loading = false;
        });
      if (!this.applicationExists) {
        this.loading = true;
        ApplicationService.getApplication()
          .then((res => {
            this.setApplication(res.data)
        }))
        .catch(err => {
          this.loading = true;
          // eslint-disable-next-line
          console.log('No application was found', err.response.status, err.response.data);
          // this.$emit('propagateFlash', err.response.data, 'error')
        })
        .finally(() => {
          this.loading = false;
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
    },
    mixins: [validationMixin],
    validations: {
      inputQualification: {
        name: {
          required: required
        },
        years: {
          required: required
        }
      },
      inputAvailability: {
        start: {
          required: required,
          dateForm: checkDateForm
        },
        end: {
          startDateBeforeEnd,
          required: required,
          dateForm: checkDateForm
        }
      },
      application: {
        qualifications: {
          required: required
        },
        availability: {
          required: required
        }
      }
    },
    components: {
      Stretch
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