<template>
    <b-nav-item-dropdown right>
          <template slot="button-content">
            <b-img rounded width="30px" height="20px" :src="getImgUrl($store.state.languageModule.currentLanguage)" />
          </template>
        <b-dropdown-item @click="changeLanguage(language.id)" v-for="language in availableLanguages" :key="language.id" :id="language.id" v-model="selectedLanguage"><b-img rounded width="30px" height="20px" :src="getImgUrl(language.id)" /> {{language.label}}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  // import store from 
  import languages from '../assets/localization/languages';

  export default {
    data() {
      return {
        availableLanguages: languages,
      }
    },
    computed: {
      ...mapGetters('languageModule', ['currentLanguage']),
      selectedLanguage: {
        get() {
          return this.currentLanguage;
        },
        set(value) {
          this.setCurrentLanguage(value);
        }
      }
    },
    methods: {
      ...mapActions('languageModule', [
        'setCurrentLanguage'
      ]),
    changeLanguage(param){
      this.setCurrentLanguage(param);
    },
    getImgUrl(id){
      return require('../assets/localization/flags/' + id + '.png')
    }

    }
  };
</script>

<style scoped>
</style>