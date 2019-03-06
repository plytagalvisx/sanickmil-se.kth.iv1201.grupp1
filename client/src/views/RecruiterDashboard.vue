<template>
    <RecruiterDashboardComponent v-on:propagateFlash="propagateFlash"/>
</template>

<script>
  import RecruiterDashboardComponent from '../components/RecruiterDashboardComponent'
  export default {
    name: 'RecruiterDashboard',
    components: {
      RecruiterDashboardComponent
    },
    methods: {
      propagateFlash(message, type) {
        this.$emit('displayFlash', message, type);
      }
    }
  }
</script>

<style scoped>
</style>
