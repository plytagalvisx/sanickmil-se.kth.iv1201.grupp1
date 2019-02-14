<template>
  <b-jumbotron header="Recruiter page" lead="Current applications are listed below.">
    <FilterApplicationComponent/>
    <b-container class="bv-example-row" v-for="application in applications" :key="application.ssn">
      <b-card class="application" border-variant="info">
        <b-row>
          <b-col md="1" sm="12">
            <b-badge v-if="application.status === 'hired'" variant="success">HIRED!</b-badge>
            <b-badge v-else-if="application.status === 'rejected'" variant="danger">REJECTED!</b-badge>
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
          <b-col md="4" sm="12">
            <p><b>Submitted: </b>{{ application.submitted.date }}</p>
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
              {{ qualification.name }} <br>
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
              {{ available.from }} <br>
            </b-col>
            <b-col md="6" sm="12">
              {{ available.to }}
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
    </b-container>
  </b-jumbotron>
</template>

<script>
  import FilterApplicationComponent from '../components/FilterApplicationComponent'
  export default {
    components: {
      FilterApplicationComponent
    },
    data() {
      return {
        applications: [{
            isOpen: false,
            firstname: "Emil",
            lastname: "Lindholm Brandt",
            ssn: "19930324-3333",
            email: "emil93@gmail.com",
            status: "unhandled",
            qualifications: [{
                "name": "korvgrillning",
                "yearsOfExperience": 3.5
              },
              {
                "name": "jonglera",
                "yearsOfExperience": 7
              }
            ],
            availability: [{
                from: "2018-01-01",
                to: "2018-02-02"
              },
              {
                from: "2018-03-01",
                to: "2018-08-01"
              }
            ],
            submitted: {
              date: "2017-12-23"
            }
          },
          {
            isOpen: false,
            firstname: "Sabina",
            lastname: "Hauzenberger",
            ssn: "19960611-0246",
            email: "sabina@hauzenberger.se",
            status: "hired",
            qualifications: [{
                "name": "korvgrillning",
                "yearsOfExperience": 10
              },
              {
                "name": "cirkus",
                "yearsOfExperience": 15
              }
            ],
            availability: [{
              from: "2018-04-02",
              to: "2018-12-01"
            }],
            submitted: {
              date: "2014-02-01"
            }
          },
          {
            isOpen: false,
            firstname: "Nicklas",
            lastname: "Ockelberg",
            ssn: "19970629-0010",
            email: "ockelberg@gmail.com",
            status: "rejected",
            qualifications: [{
                "name": "clown",
                "yearsOfExperience": 2
              },
              {
                "name": "sockervaddssnurrare",
                "yearsOfExperience": 15
              },
              {
                "name": "karusellåkare",
                "yearsOfExperience": 4
              }
            ],
            availability: [{
              from: "2018-04-02",
              to: "2018-12-01"
            }],
            submitted: {
              date: "2016-03-04"
            }
          }
        ]
      }
    },
    methods: {
      onReject(application) {
        application.status = 'rejected'
      },
      onHire(application) {
        application.status = 'hired'
      },
      onUnhandled(application) {
        application.status = 'unhandled'
      }
    }
  }
</script>

<style scoped>
  .application {
    background-color: #edf1f5;
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
