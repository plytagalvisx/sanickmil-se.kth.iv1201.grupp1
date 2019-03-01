import store from '../store';
import dictionary from '../assets/localization';
// import { mapState } from 'vuex';


export default {    
  // computed: {
  //   ...mapState('languageModule', ['currentLanguage']),
  // },
  translate (key) {
    //get current language from vuex state
    const currentLanguage = store.state.languageModule.currentLanguage
    // eslint-disable-next-line
    console.log("Current key: ", key)
    return dictionary[currentLanguage][key]
  }
}