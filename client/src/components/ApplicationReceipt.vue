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
        <b-button type="button" v-if="application.applicationStatus === 'unhandled'" variant="info" size="lg" to="apply">Edit application</b-button>
      </b-col>
      <b-col md="6" sm="12">
        <b-badge class="status" v-if="['profile'].indexOf($route.name) > - 1" v-bind:class="{unhandled : application.applicationStatus === 'unhandled', hired : application.applicationStatus === 'accepted', rejected : application.applicationStatus === 'rejected'}">
          {{ this.application.applicationStatus }}</b-badge>
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
<<<<<<< HEAD
    async created() {
      this.userInfo = await UserService.getUserInfo()
        .then((res) => this.userInfo = res.data)
        .catch((err) => err)
=======
    async created(){
>>>>>>> minor changes
      let cookie = this.$cookies.get('savedState')
      if (cookie) {
        this.qualifications = cookie.qualifications
        this.availability = cookie.availability
      }
      this.userInfo = await UserService.getUserInfo()
      .then((res) => this.userInfo = res.data)
      .catch((err) => err) 
      // eslint-disable-next-line
      console.log("userinfo: ", this.userInfo)
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
          .then((res) => {
            this.$emit('displayParentFlash', res.data.message, 'success');
            this.$router.push('/');
          })
          .catch(err => {
            this.$emit('displayParentFlash', err.response.data.message, 'error');
          });
      }
    },
    props: [
      'application'
    ]
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
