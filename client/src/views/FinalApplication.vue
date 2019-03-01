<template>
  <b-jumbotron :header="'profile-title' | translate" :lead="'profile-subtitle' | translate">
    <hr>
    <ApplicationReceiptComponent v-on:displayParentFlash="displayParentFlash"/>
  </b-jumbotron>
</template>

<script>
  import ApplicationReceiptComponent from '../components/application/ApplicationReceiptComponent'
  export default {
    data() {
      return {
        msgToParent: '',
        typeToParent: ''
      }
    },
    components: {
      ApplicationReceiptComponent
    },
    methods: {
      displayParentFlash(message, type) {
        this.$emit('displayFlash', message, type);
      }
    }
  }
</script>