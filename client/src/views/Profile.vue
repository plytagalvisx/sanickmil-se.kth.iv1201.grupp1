<template>
  <b-jumbotron>
    <template slot="header">{{ showHeader }}</template>

    <template slot="lead">{{ showLead }}</template>
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
          return 'Your application';
        } else {
          return 'No application';
        }
      },
      showLead() {
        if (this.hasApplication) {
          return 'Here you can see your current application. You can edit your application as long as it is "Unhandled"';
        } else {
          return 'You do not have a current application. You can apply by pressing "Apply" in the upper right corner.';
        }
      }
    }
  }
</script>

<style scoped>
  
</style>

