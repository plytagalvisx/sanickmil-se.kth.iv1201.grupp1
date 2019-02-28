// import store from '../store';
import dictionary from '../assets/localization';
// import { mapState } from 'vuex';


export default {    
  // computed: {
  //   ...mapState('userModule', ['currentLanguage']),
  // },
  translate (key) {
    //get current language from vuex state
    const currentLanguage = 'en'
    // eslint-disable-next-line
    console.log("Current key: ", key)
    return dictionary[currentLanguage][key]
  }
}