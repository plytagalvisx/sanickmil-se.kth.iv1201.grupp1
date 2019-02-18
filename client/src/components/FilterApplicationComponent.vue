<template>
  <b-card class="application" border-variant="info">
    <lable>Unhandled: </lable>
    <input type="checkbox" value="unhandled" v-model="checkedStatus">
    <lable>Hired: </lable>
    <input type="checkbox" value="hired" v-model="checkedStatus">
    <lable>Rejected: </lable>
    <input type="checkbox" value="rejected" v-model="checkedStatus">
    <b-btn variant="info" @click="onFilter(checkedStatus)">Filter</b-btn>
    <span>Checked status: {{ checkedStatus }}</span>
  </b-card>
</template>

<script>
  export default {
    data() {
      return {
        checkedStatus: []
      }
    },
    methods: {
      onFilter(checkedStatus) {
        this.$emit('filterApplications', checkedStatus);
      }
    }
  }
</script>

<style scoped>
  
</style>
