<template>
  <b-container class="bv-example-row textStyle">
    <b-row>
      <b-col md="6" sm="12">
        <p><b>First name: </b> {{this.userInfo.firstname}}</p>
      </b-col>
      <b-col md="6" sm="12">
        <p><b>Last name: </b>{{this.userInfo.lastname}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="12">
        <p><b>Email: </b>{{this.userInfo.email}}</p>
      </b-col>
      <b-col md="6" sm="12">
        <p><b>SSN: </b>{{this.userInfo.ssn}}</p>
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
    <b-row v-for="qualification in qualifications" :key="qualification.name" class="tableRow">
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
    <b-row v-for="(available, index) in availability" :key="index" class="tableRow">
      <b-col md="6" sm="12">
        {{ new Date(available.from).toLocaleDateString() }} <br>
      </b-col>
      <b-col md="6" sm="12">
        {{ new Date(available.to).toLocaleDateString() }}
      </b-col>
    </b-row>
    <b-row style="margin-top: 1em;">
      <b-col md="6" sm="12">
        <b-button variant="info" size="lg" to="apply">Edit application</b-button>
        <!-- TODO: Att detta endast görs när ansökan inte är hanterad! -->
      </b-col>
      <b-col md="6" sm="12">
        <b-badge class="status" v-if="['profile'].indexOf($route.name) > - 1" v-bind:class="{unhandled : application.applicationStatus === 'unhandled', hired : application.applicationStatus === 'accepted', rejected : application.applicationStatus === 'rejected'}"> {{ this.application.applicationStatus }}</b-badge>
        <b-button class="submit" variant="info" size="lg" v-if="['receipt'].indexOf($route.name) > - 1" @click="onSubmit">Submit</b-button>
        <!-- TODO: Fixa så man kan submitta -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import UserService from '../services/UserService.js'
  import ApplicationService from '../services/ApplicationService.js'
  export default {
    data() {
      return {
        userInfo: {},
        qualifications: [],
        availability: []
      }
    },
    async created() {
      this.userInfo = await UserService.getUserInfo()
        .then((res) => this.userInfo = res.data)
        .catch((err) => err)
      let cookie = this.$cookies.get('savedState')
      if (cookie) {
        this.qualifications = cookie.qualifications
        this.availability = cookie.availability
      }
    },
    methods: {
      async onSubmit() {
        let availability = this.availability.map((e) => {
          return {
            from: new Date(e.from).toISOString(),
            to: new Date(e.to).toISOString()
          }
        })
        await ApplicationService.saveState(this.qualifications, availability)
      }
    },
    props: [
      'application'
    ]
  }
</script>

<style scoped>
  .status {
    font-size: 1.7em;
    float:right;
  }

  .submit {
    float:right;
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
  
  .textStyle {
    font-size: 1.2em;
    text-align: left;
  }
</style>
