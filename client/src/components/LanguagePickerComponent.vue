<template>
    

      

    <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{'lbl-language' | translate}}</em>
          </template>
        <b-dropdown-item @click="changeLanguage(language.id)" v-for="language in availableLanguages" :key="language.id" :id="language.id" :value="language.id" v-model="selectedLanguage">{{language.label}}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
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
    }
    }
  };
</script>

<style scoped>
</style>