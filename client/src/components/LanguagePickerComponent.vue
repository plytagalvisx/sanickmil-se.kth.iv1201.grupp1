<template>
  <div class="language-selector">
    <div v-for ="(language, index) in availableLanguages" :key="index">
      <input type="radio" :id="language.id" :value="language.id" v-model="selectedLanguage">
      <label :for="language.id">{{language.label}}</label>
      
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import languages from '../assets/localization/languages';

  export default {
    data() {
      return {
        availableLanguages: languages,
      }
    },
    computed: {
      ...mapGetters('languageModule',['currentLanguage']),
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
  }
  };
</script>

<style scoped>
.language-selector {
  text-align: left;
  padding: 2rem 5rem;
}
</style>