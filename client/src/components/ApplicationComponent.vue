<template>
  <b-jumbotron header="Recruiter page" lead="Current applications are listed below.">
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
          <b-col md="6" sm="12">
            <p><b>First name: </b> {{ application.firstname }}</p>
          </b-col>
          <b-col md="6" sm="12">
            <p><b>Last name: </b>{{ application.lastname }}</p>
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
          <b-row class="buttons">
            <b-col md="6">
              <b-btn variant="success" @click="onHire">Hire</b-btn>
            </b-col>
            <b-col md="6">
              <b-btn variant="danger" @click="onReject">Reject</b-btn>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-container>
  </b-jumbotron>
</template>

<script>
  export default {
    data() {
      return {
        applications: [{
            isOpen: false,
            firstname: "Emil",
            lastname: "LB",
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
            ]
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
            }]
          }
        ]
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
    border-bottom-style: solid;
    border-width: 0.01em;
    border-color: #d9e0e6;
  }
  
  .tableHeader {
    margin-bottom: -1em;
  }
  
  .tableRow {
    padding: 0.5em;
    border-bottom-style: solid;
    border-width: 0.01em;
    border-color: #d9e0e6;
  }
  
  .buttons {
    margin-top: 1em;
  }
</style>
