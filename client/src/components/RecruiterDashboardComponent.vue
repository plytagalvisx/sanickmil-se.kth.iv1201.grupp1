<template>
<div>
  <div v-if="!applications">LOADING</div>
  <b-jumbotron v-else header="Recruiter page" lead="Current applications are listed below.">
    <b-card class="application" border-variant="info" v-for="(application, index) in applications" :key="index">
      <b-row>
        <b-col md="1" sm="12">
          <b-badge v-if="application.applicationStatus === 'accepted'" variant="success">HIRED!</b-badge>
          <b-badge v-else-if="application.applicationStatus === 'rejected'" variant="danger">REJECTED!</b-badge>
          <b-badge v-else variant="secondary">UNHANDLED</b-badge>
        </b-col>
        <b-col md="10" sm="12"></b-col>
        <b-col md="1" sm="12">
          <b-btn variant="info" size="sm" @click="application.isOpen = !application.isOpen">
            <i v-if="!application.isOpen" class="fas fa-plus"></i>
            <i v-else class="fas fa-minus"></i></b-btn>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" sm="12">
          <p><b>First name: </b> {{ application.firstname }}</p>
        </b-col>
        <b-col md="4" sm="12">
          <p><b>Last name: </b>{{ application.lastname }}</p>
        </b-col>
        <b-col md="4" sm="12">
          <p><b>Submission date: </b>{{ new Date(application.submissionDate).toLocaleDateString() }}</p>
        </b-col>
      </b-row>
      <div v-show="application.isOpen">
        <b-row>
          <b-col md="6" sm="12">
            <p><b>Email: </b>{{ application.email }}</p>
          </b-col>
          <b-col md="6" sm="12">
            <p><b>SSN: </b>{{ application.ssn }}</p>
          </b-col>
        </b-row>
        <!-- HERE ARE THE TABLES -->
        <!-- TABLE FOR QUALIFICATIONS -->
        <b-row class="tableHeader">
          <b-col md="6" sm="12">
            <p class="title">Skill</p>
          </b-col>
          <b-col md="6" sm="12">
            <p class="title">Years</p>
          </b-col>
        </b-row>
        <b-row v-for="qualification in application.qualifications" :key="qualification.name" class="tableRow">
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
            <p class="title">Available from</p>
          </b-col>
          <b-col md="6" sm="12">
            <p class="title">Available to</p>
          </b-col>
        </b-row>
        <b-row v-for="(available, index) in application.availability" :key="index" class="tableRow">
          <b-col md="6" sm="12">
            {{ new Date(available.from).toLocaleDateString() }} <br>
          </b-col>
          <b-col md="6" sm="12">
            {{ new Date(available.to).toLocaleDateString() }}
          </b-col>
        </b-row>
        <!-- HERE STARTS THE BUTTONS -->
        <b-row class="buttons">
          <b-col md="4" sm="12">
            <b-btn variant="danger" size="lg" @click="onStatus(application, 'rejected')">Reject</b-btn>
          </b-col>
          <b-col md="4" sm="12">
            <b-btn variant="secondary" size="lg" @click="onStatus(application, 'unhandled')">Unhandled</b-btn>
          </b-col>
          <b-col md="4" sm="12">
            <b-btn variant="success" size="lg" @click="onStatus(application, 'accepted')">Hire</b-btn>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-jumbotron>
</div>
</template>

<script>
  import ApplicationService from '../services/ApplicationService'
  export default {
    data() {
      return {
        applications: []
      }
    },
    created() {
      // eslint-disable-next-line
      console.log('token:', this.$store.state.userModule.user.token);
      ApplicationService.getApplications().then((res) => {
        let tmp = res.data;
        tmp.map((ele) => {
          ele.isOpen = false;
        });
        this.applications = tmp;
      });
    },
    methods: {
      onStatus(application, status) {
        let oldStatus = application.applicationStatus;
        ApplicationService.changeStatus(application.ssn, status)
        .catch(() => {
          application.applicationStatus = oldStatus;
        });
        application.applicationStatus = status;
      }
    }
  }
</script>

<style>
  .application {
    background-color: #edf1f5 !important;
    margin-bottom: 0.5em;
  }
  
  .title {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 0.1em;
    margin-top: 1em;
  }
  
  .tableHeader {
    border-bottom-style: solid;
    border-width: 0.01em;
    border-color: #d9e0e6;
    vertical-align: center !important;
  }
  
  .tableRow {
    padding: 0.5em;
    border-bottom-style: solid;
    border-width: 0.01em;
    border-color: #d9e0e6;
  }
  
  .tableRow:hover {
    background-color: #d9e0e6;
  }
  
  .buttons {
    margin-top: 1em;
  }
</style>