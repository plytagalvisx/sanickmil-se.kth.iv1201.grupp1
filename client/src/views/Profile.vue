<template>
  <b-jumbotron>
    <template slot="header">{{ showHeader }}</template>

    <template slot="lead">{{ showLead }}</template>
    <hr>
    <ApplicationReceiptComponent :inheritedApplication="application" :receiptType="'profile'" v-if="hasApplication" />
  </b-jumbotron>
</template>

<script>
  import ApplicationService from '../services/ApplicationService'
  import ApplicationReceiptComponent from '../components/ApplicationReceiptComponent'
  export default {
    data() {
      return {
        hasApplication: false,
        application: [],
        loading: false
      }
    },
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
      ApplicationReceiptComponent
    },
    computed: {
      showHeader() {
        if (this.loading) {
          return '';
        }
        if (this.hasApplication) {
          return 'Your application';
        } else {
          return 'No application';
        }
      },
      showLead() {
        if (this.loading) {
          return '';
        }
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

