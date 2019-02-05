<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'

export default {
  components: {
    HeaderComponent
  }
}
</script>

<style>
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
  }
</style>
