<template>
  <b-jumbotron header="Your Application" lead="You can edit your application as long as the application is unhandeled. You can see your current application and its status here.">
    <hr>
    <ApplicationReceipt v-on:displayParentFlash="displayParentFlash"/>
  </b-jumbotron>
</template>

<script>
  import ApplicationReceipt from '../components/ApplicationReceipt'
  export default {
    data() {
      return {
        msgToParent: '',
        typeToParent: ''
      }
    },
    components: {
      ApplicationReceipt
    },
    methods: {
      displayParentFlash(message, type) {
        this.$emit('displayFlash', message, type);
      }
    }
  }
</script>