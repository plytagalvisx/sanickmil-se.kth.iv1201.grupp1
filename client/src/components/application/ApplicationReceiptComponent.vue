<template>
  <Stretch v-if="loading" />
  <div v-else>
    <b-container class="bv-example-row textStyle">
      <b-row>
        <b-col md="6" sm="12">
          <p><b>{{'apply-review-firstname' | translate}} </b> {{this.application.firstname}}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p><b>{{'apply-review-lastname' | translate}} </b>{{this.application.lastname}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <p><b>{{'apply-review-email' | translate}} </b>{{this.application.email}}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p><b>{{'apply-review-ssn' | translate}}: </b>{{this.application.ssn}}</p>
        </b-col>
      </b-row>
      <!-- TABLE FOR QUALIFICATIONS -->
      <b-row class="tableHeader">
        <b-col md="6" sm="12">
          <p class="title">{{'apply-review-skill' | translate}}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p class="title">{{'apply-review-years' | translate}}</p>
        </b-col>
      </b-row>
      <b-row v-for="qualification in this.application.qualifications" :key="qualification.name" class="tableRow">
        <b-col md="6" sm="12">
          {{ qualification.competenceName }} <br>
        </b-col>
        <b-col md="6" sm="12">
          {{ qualification.yearsOfExperience }}
        </b-col>
      </b-row>
  
      <!-- TABLE FOR AVAILABILITY -->
      <b-row class="tableHeader">
        <b-col md="6" sm="12">
          <p class="title">{{'apply-availableFrom' | translate}}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p class="title">{{'apply-availableTo' | translate}}</p>
        </b-col>
      </b-row>
      <b-row v-for="(available, index) in this.application.availability" :key="index" class="tableRow">
        <b-col md="6" sm="12">
          {{ new Date(available.from).toLocaleDateString() }} <br>
        </b-col>
        <b-col md="6" sm="12">
          {{ new Date(available.to).toLocaleDateString() }}
        </b-col>
      </b-row>
      <b-row style="margin-top: 1em;">
        <b-col md="6" sm="12">
          {{this.application.applicationstatus}}
          <b-button type="button" v-if="this.application.applicationStatus" :disabled="this.application.applicationStatus !== 'unhandled' " variant="info" size="lg" to="apply">{{'apply-review-edit' | translate}}</b-button>
        </b-col>
        <b-col md="6" sm="12">
          <b-badge class="status" v-if="receiptType === 'profile'" v-bind:class="{unhandled : application.applicationStatus === 'unhandled', hired : application.applicationStatus === 'accepted', rejected : application.applicationStatus === 'rejected'}">
            {{ this.application.applicationStatus }}</b-badge>
          <b-button class="submit" variant="info" size="lg" v-if="receiptType === 'apply'" @click="onSubmit">{{'apply-review-submit' | translate}}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import ApplicationService from '../../services/ApplicationService.js'
  import UserService from '../../services/UserService.js'
  import {
    Stretch
  } from 'vue-loading-spinner'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    name: 'ApplicationReceiptComponent',
    data() {
      return {
        loading: false,
        showApplication: false
      }
    },
    computed: {
      ...mapState('applicationModule', ['application']),
      ...mapGetters('applicationModule', ['applicationState'])
    },
    async created() {
      if (this.inheritedApplication) {
        this.setApplication(this.inheritedApplication);
        this.showApplication = true;
        return;
      }
      if (this.applicationState === 'partial') {
        const userInfo = await UserService.getUserInfo()
          .then(res => res.data);
        this.completeApplicationInfo(userInfo);
      } else if (this.applicationState === 'empty') {
        this.loading = true;
        await ApplicationService.getApplication()
          .then((res) => {
            this.setApplication(res.data);
            this.showApplication = true;
          })
          .catch(() => {
            this.showApplication = true;
          })
          .finally(() => {
            this.loading = false;
          })
  
      }
    },
    methods: {
      ...mapActions('applicationModule', ['setApplication', 'completeApplicationInfo', 'clearApplication']),
      async onSubmit() {
        let availability = this.application.availability.map((e) => {
          return {
            from: new Date(e.from).toISOString(),
            to: new Date(e.to).toISOString()
          }
        })
        try {
          const res = await ApplicationService.submitApplication(this.application.qualifications, availability);
          this.$emit('propagateFlash', res.data.message, 'success');
        } catch (err) {
          if (err.response.status === 409) { // The application has already been made
            this.$emit('propagateFlash', err.response.data.message, 'error');
          } else {
            this.$emit('propagateFlash', 'Something went wrong...', 'error');
          }
        } finally {
          this.clearApplication();
          this.$router.push('/profile')
        }
      }
    },
    props: [
      'receiptType',
      'inheritedApplication'
    ],
    components: {
      Stretch
    }
  }
</script>

<style scoped>
  .status {
    font-size: 1.25rem;
    float: right;
    font-weight: normal;
    padding: 0.5rem 1rem;
    line-height: 1.5;
  }
  
  .submit {
    float: right;
  }
  
  .unhandled {
    background-color: grey;
  }
  
  .rejected {
    background-color: #ee143e;
  }
  
  .hired {
    background-color: #00ac34;
  }
  
  .textStyle {
    font-size: 1.2em;
    text-align: left;
  }
</style>