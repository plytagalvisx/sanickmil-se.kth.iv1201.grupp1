<template>
  <b-jumbotron>
    <template slot="header">{{ showHeader }}</template>

    <template slot="lead">{{ showLead }}</template>
    <hr>
    <ApplicationReceiptComponent :application="application" v-if="hasApplication" />
  </b-jumbotron>
</template>

<script>
  import ApplicationService from '../services/ApplicationService'
  import ApplicationReceiptComponent from '../components/application/ApplicationReceiptComponent'
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
      ApplicationReceiptComponent
    },
    computed: {
      showHeader() {
        if (this.loading) {
          //  eslint-disable-next-line
          console.log('THIS HAPPENDS');
          return '';
        }
        if (this.hasApplication) {
          //  eslint-disable-next-line
          console.log('ONE');
          return 'Your application';
        } else {
          //  eslint-disable-next-line
          console.log('TWO');
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

