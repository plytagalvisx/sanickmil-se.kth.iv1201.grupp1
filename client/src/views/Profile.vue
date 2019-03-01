<template>
  <b-jumbotron>
    <template slot="header">{{ showHeader | translate}}</template>

    <template slot="lead">{{ showLead | translate }}</template>
    <hr>
    <Stretch v-if="loading"></Stretch>
    <ApplicationReceiptComponent :inheritedApplication="application" :receiptType="'profile'" v-if="hasApplication" />
  </b-jumbotron>
</template>

<script>
  import ApplicationService from '../services/ApplicationService'
  import ApplicationReceiptComponent from '../components/application/ApplicationReceiptComponent'
  import {Stretch} from 'vue-loading-spinner'
  export default {
    data() {
      return {
        hasApplication: false,
        application: [],
        loading: false
      }
    },
    //Might want to be async to avoid freezing when going to profile from menu
    created() {
      ApplicationService.getApplication()
        .then((res) => {
          this.loading = false;
          this.application = res.data;
          this.hasApplication = true;
        })
        .catch(() => {
          this.loading = false;
          this.hasApplication = false;
        });
        this.loading = true;
    },
    components: {
      ApplicationReceiptComponent,
      Stretch
    },
    computed: {
      showHeader() {
        if (this.hasApplication) {
          return 'profile-title';
        } else {
          return 'profile-noTitle';
        }
      },
      showLead() {
        if (this.hasApplication) {
          return 'profile-subtitle';
        } else {
          return 'profile-noSubtitle';
        }
      }
    }
  }
</script>

<style scoped>
  
</style>

