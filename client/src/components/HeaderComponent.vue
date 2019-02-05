<template>

<<<<<<< HEAD
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">SANICKMIL</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right v-if="loggedIn">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{user.name}}</em>
          </template>
          <b-dropdown-item to="#">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/apply" v-if="loggedIn">Apply</b-nav-item>
        <b-nav-item to="/register" v-if="!loggedIn">Register</b-nav-item>
        <b-nav-item to="/login" v-if="!loggedIn">Login</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import UserService from '../services/UserService.js'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'HeaderComponent',
    data() {
=======
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">SANICKMIL</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right v-if="loggedIn">
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item to="#">Profile</b-dropdown-item>
        <b-dropdown-item v-on:click="logout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
			<b-nav-item to="/apply" v-if="loggedIn">Apply</b-nav-item>
			<b-nav-item to="/register" v-if="!loggedIn">Register</b-nav-item>
			<b-nav-item to="/login" v-if="!loggedIn">Login</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
import UserService from '../services/UserService.js'
	export default {
		name: 'HeaderComponent',
    data () {
>>>>>>> started work on saving state of application in cookies
      return {
        form: {
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: '',
<<<<<<< HEAD
          birth: ''
        }
      }
    },
    computed: {
      ...mapState(['loggedIn', 'user'])
    },
    methods: {
      ...mapActions({
        logOut: 'logOut'
      }),
      async logout() {
        await UserService.logout().then(() => {
          this.logOut();
          this.$router.push('/login');
        });
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

  #title {
    font-family: 'Permanent Marker', cursive;
  }
=======
					birth: ''
				},
        loggedIn: false
      }
    },
    created(){
      this.verifyLoggedIn();
      
    },
    methods: {
      verifyLoggedIn(){
      let token = this.$cookie.get("jwtToken");
        if(token){
        this.loggedIn = true
      }else{
        this.loggedIn = false;
        }
        // eslint-disable-next-line no-console
        console.log(this.loggedIn)
			},
			async logout(){
				await UserService.logout().then(resData => {
          /* eslint-disable-next-line no-console */
          console.log(resData);
        })
			}
    }
	}
</script>

<style scoped>
	@import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

	#title {
		font-family: 'Permanent Marker', cursive;
	}
>>>>>>> started work on saving state of application in cookies
</style>