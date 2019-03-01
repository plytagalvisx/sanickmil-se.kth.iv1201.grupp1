<template>
  <b-jumbotron>
    <template slot="header">{{headerText | translate}}</template>

    <template slot="lead">
      {{'apply-subtitle' | translate}}
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
          return 'apply-title';
        else if (this.reviewApplication)
          return 'apply-review-Title';
        else {
          return 'apply-error-Title';
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