<template>
  <div id="app">
    <HeaderComponent v-on:displayFlash="displayFlash" />
    <main>
      <router-view v-on:displayFlash="displayFlash"/>
      <FlashMessageComponent v-if="showFlash" :flashMessage="flashMessage" :type="flashType"/>

      <h2>{{ 'lbl-welcome' | translate }}</h2>
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'
import FlashMessageComponent from './components/FlashMessageComponent'

export default {
  components: {
    HeaderComponent,
    FlashMessageComponent,
  },
  data() {
    return {
      showFlash: false,
      flashMessage: '',
      flashType: '',
      currentInterval: null
    }
  },
  methods: {
    displayFlash(message, type) {
      this.flashMessage = message;
      this.flashType = type;
      this.showFlash = true;
      if (this.currentInterval) {
        window.clearInterval(this.currentInterval);
      }
      this.currentInterval = window.setTimeout(() => {
        this.showFlash = false;
        this.currentInterval = null;
      }, 3000);
    }    
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height:100vh;
    background-color: #f2f2f2;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
  }
</style>
