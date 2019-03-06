<template>
  <div class="flashmessage" v-bind:class="{error: type === 'error', success: type === 'success', info: type === 'info'}">
    {{ flashMessage | translate }}
  </div>
</template>
<script>
export default {
  name: 'FlashMessage',
  props: ['flashMessage', 'type']
}
</script>
<style scoped>

  .flashmessage {
    margin: 0.5em;
    border-radius: 10px;
    padding: 0.5em 1em;
    font-weight: bold;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .error {
    color: rgb(133, 6, 6);
    background-color: rgb(228, 138, 138);
  }

  .info {
    color: #053561;
    background-color: #b6e9f0;
  }

  .success {
    color: rgb(3, 83, 3);
    background-color: rgb(169, 247, 176);
  }
</style>
