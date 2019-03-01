<template>
  <div>
    <b-jumbotron :header="'home-title' | translate" :lead="'home-message' | translate">
    <p>{{'home-encouragement' | translate}}</p>
    <b-btn size="lg" variant="info" to="/apply">{{'home-apply' | translate}}</b-btn>
  </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name: 'DashboardView'
  }
</script>
