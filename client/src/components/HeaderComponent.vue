<template>

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SANICKMIL</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <LanguagePickerComponent></LanguagePickerComponent>       

        <b-nav-item-dropdown right v-if="loggedIn">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{user.name}}</em>
          </template>
          <b-dropdown-item to="/profile">{{'hdr-profile' | translate}}</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">{{'hdr-signout' | translate}}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/apply" v-if="user.role === 'applicant'">{{'hdr-apply' | translate}}</b-nav-item>
        <b-nav-item to="/register" v-if="!loggedIn">{{'hdr-register' | translate}}</b-nav-item>
        <b-nav-item to="/login" v-if="!loggedIn">{{'hdr-login' | translate}}</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import LanguagePickerComponent from './LanguagePickerComponent.vue'
  export default {
    components:{
      LanguagePickerComponent,
    },
    name: 'HeaderComponent',
    computed: {
      ...mapState('userModule', ['user']),
      loggedIn() {
        return this.user.token !== null;
      }
    },
    methods: {
      ...mapActions('userModule', ['logOut']),
      ...mapActions('applicationModule', ['clearApplication']),
      logout() {
        this.logOut();
        this.clearApplication();
        this.$emit('displayFlash', 'SUCCESS.AUTH.LOGGED_OUT', 'info');
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

  #title {
    font-family: 'Permanent Marker', cursive;
  }
</style>