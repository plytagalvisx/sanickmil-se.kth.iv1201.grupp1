<template>
  <div>
    <b-container class="bv-example-row textStyle">
      <b-row>
        <b-col md="6" sm="12">
          <p><b>First name: </b> {{ application.firstname }}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p><b>Last name: </b> {{ application.lastname }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <p><b>Email: </b>{{application.email}}</p>
        </b-col>
        <b-col md="6" sm="12">
          <p><b>SSN: </b>{{application.ssn}}</p>
        </b-col>
      </b-row>
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
      <hr>
      <b-row>
        <b-col md="6" sm="12">
          <b-button v-bind:class="{noEdit: application.applicationStatus !== 'unhandled'}" variant="info" size="lg">Edit application</b-button>
          <!-- TODO: Att detta endast görs när ansökan inte är hanterad! -->
        </b-col>
        <b-col md="6" sm="12">
          <!--<p v-if="['profile'].indexOf($route.name) > - 1"><b>Status:</b> {{application.applicationStatus}}</p>-->
          <h1>
            <b-badge v-if="['profile'].indexOf($route.name) > - 1" v-bind:class="{unhandled : application.applicationStatus === 'unhandled', hired : application.applicationStatus === 'hired', rejected : application.applicationStatus === 'rejected'}">{{application.applicationStatus}}</b-badge>
          </h1>
          <b-button variant="info" size="lg" v-if="['receipt'].indexOf($route.name) > - 1" @click="onSubmit">Submit </b-button>
          <!-- TODO: Fixa så man kan submitta -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    props: [
      'application'
    ]
  }
</script>

<style scoped>
  .badge {
    float: right;
    font-weight: 2em;
  }
  
  .unhandled {
    background-color: grey;
  }
  
  .rejected {
    background-color: crimson;
  }
  
  .hired {
    background-color: green;
  }
  
  .noEdit {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  .textStyle {
    font-size: 1.2em;
    text-align: left;
  }
</style>
