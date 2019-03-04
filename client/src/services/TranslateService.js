import store from '../store';
import dictionary from '../assets/localization';


export default {    
  translate (key) {
    //get current language from vuex state
    const currentLanguage = store.state.languageModule.currentLanguage
    return dictionary[currentLanguage][key]
  }
}