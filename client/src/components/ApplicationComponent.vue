<template>
  <b-jumbotron header="Recruiter page" lead="Current applications are listed below.">
    <!--<FilterApplicationComponent/>-->
      <b-card class="application" border-variant="info" v-for="(application, index) in applications" :key="index">
        <b-row>
          <b-col md="1" sm="12">
            <b-badge v-if="application.applicationStatus === 'hired'" variant="success">HIRED!</b-badge>
            <b-badge v-else-if="application.applicationStatus === 'rejected'" variant="danger">REJECTED!</b-badge>
            <b-badge v-else variant="secondary">UNHANDLED</b-badge>
          </b-col>
          <b-col md="10" sm="12"></b-col>
          <b-col md="1" sm="12">
            <b-btn variant="info" @click="application.isOpen = !application.isOpen">
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
          <!-- TODO: SUBMITTED AT SKA LÄGGAS TILL I DATABASEN 
            <b-col md="4" sm="12">
            <p><b>is open: </b>{{ application.isOpen }}</p>
          </b-col>
          -->
          <b-col md="4" sm="12">
            <p><b>is open: </b>{{ application.isOpen }}</p>
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
          <b-row v-for="available in application.availability" :key="available.name" class="tableRow">
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
              <b-btn variant="danger" size="lg" @click="onReject(application)">Reject</b-btn>
            </b-col>
            <b-col md="4" sm="12">
              <b-btn variant="secondary" size="lg" @click="onUnhandled(application)">Unhandled</b-btn>
            </b-col>
            <b-col md="4" sm="12">
              <b-btn variant="success" size="lg" @click="onHire(application)">Hire</b-btn>
            </b-col>
          </b-row>
        </div>
      </b-card>
  </b-jumbotron>
</template>

<script>
  import ApplicationService from '../services/ApplicationService'
  //import FilterApplicationComponent from '../components/FilterApplicationComponent'
  export default {
    //components: {
    //  FilterApplicationComponent
    //},
    data() {
      return {
        applications: []
      }
    },
    created() {
      ApplicationService.getApplications().then((res) => {
        let tmp = res.data;
        // eslint-disable-next-line
        console.log(tmp);
        tmp.map((ele) => {
          ele.isOpen = false;
        });
        this.applications = tmp;
        // eslint-disable-next-line
        console.log(this.applications);
      });
    },
    methods: {
      onReject(application) {
        application.applicationStatus = 'rejected'
      },
      onHire(application) {
        application.applicationStatus = 'hired'
      },
      onUnhandled(application) {
        application.applicationStatus = 'unhandled'
      },
      toggleApplication(application) {
        // eslint-disable-next-line
        console.log(application);
        // eslint-disable-next-line
        console.log("THE BUTTON WAS PRESSED!!!!!");
        application.isOpen = !application.isOpen;
        // eslint-disable-next-line
        console.log("IS OPEN? ", application.isOpen);
      }
    }
  }
</script>

<style>
  .application {
    background-color:#edf1f5 !important;
    margin-bottom: 0.5em;
  }
  
  .title {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom:0.1em;
    margin-top:1em;
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

  .tableRow:hover{
    background-color:#d9e0e6;
  }
  
  .buttons {
    margin-top: 1em;
  }
</style>
