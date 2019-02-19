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
    <b-row>
      <b-table striped hover :items="qualifications" :fields="fieldsQual"></b-table>
    </b-row>
    <b-row>
      <b-table striped hover :items="availability" :fields="fieldsAvailability"></b-table>
    </b-row>
    <hr>
    <b-row>
      <b-col md="6" sm="12">
        <b-button variant="info" size="lg" to="apply">Edit application</b-button>
        <!-- TODO: Att detta endast görs när ansökan inte är hanterad! -->
      </b-col>
      <b-col md="6" sm="12">
        <p v-if="['profile'].indexOf($route.name) > - 1"><b>Status:</b> Unhandled</p>
        <b-button variant="info" size="lg" v-if="['receipt'].indexOf($route.name) > - 1" @click="onSubmit">Submit </b-button>
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
        // eslint-disable-next-line 
        userInfo: {},
        qualifications: [],
        // eslint-disable-next-line 
        availability: [],
        fieldsAvailability: {
          from: {
            label: 'Availability from',
            sortable: true
          },
          to: {
            label: 'Availability to',
            sortable: true
          }
        },
        fieldsQual: {
          competenceName: {
            sortable: true
          },
          yearsOfExperience: {
            sortable: true
          }
        },
      }
    },
    async created(){
      this.userInfo = await UserService.getUserInfo()
      .then((res) => this.userInfo = res.data)
      .catch((err) => err) 
      // eslint-disable-next-line
      console.log("userinfo: ", this.userInfo)
      let cookie = this.$cookies.get('savedState')
      if (cookie) { 
          this.qualifications = cookie.qualifications
          this.availability = cookie.availability
      }
    },
    methods:{
      async onSubmit(){
        let availability = this.availability.map((e) => {
          return {from: new Date(e.from).toISOString(), to: new Date(e.to).toISOString()}
          })
          // eslint-disable-next-line
        console.log(availability)
        await ApplicationService.saveState(this.qualifications, availability)
      }
    }
  }
</script>

<style scoped>
  .textStyle {
    font-size: 1.2em;
    text-align: left;
  }
</style>
