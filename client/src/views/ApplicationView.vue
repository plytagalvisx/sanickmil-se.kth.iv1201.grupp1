<template>
  <b-jumbotron>
    <template slot="header">{{headerText}}</template>

    <template slot="lead">
      Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be
      decided by the recruiter, depending on your qualifications!
    </template>
  <EditApplicationComponent v-on:propagateFlash="propagateFlash" v-on:progressStage="progressStage" v-if="editApplication" />
  <ApplicationReceiptComponent v-on:propagateFlash="propagateFlash" :receiptType="'apply'" v-else-if="reviewApplication" />

  </b-jumbotron>

</template>

<script>
  import EditApplicationComponent from '../components/application/EditApplicationComponent'
  import ApplicationReceiptComponent from '../components/application/ApplicationReceiptComponent'
  import {mapState} from 'vuex'
  export default {
    components: {
      ApplicationReceiptComponent,
      EditApplicationComponent
    },
    name: 'ApplicationView',
    data() {
      return {
        editApplication: true,
        reviewApplication: false
      }
    },
    computed: {
      ...mapState('applicationModule', ['application']),
      headerText() {
        if (this.editApplication)
          return 'Apply';
        else if (this.reviewApplication)
          return 'Review your application';
        else {
          return 'ERROR';
        }
      }
    },
    methods: {
      progressStage() {
        this.editApplication = false;
        this.reviewApplication = true;
      },
      propagateFlash(message, type) {
        this.$emit('displayFlash', message, type);
      }
    }
  }
</script>