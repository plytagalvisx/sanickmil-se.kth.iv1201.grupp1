import store from '../store';
import dictionary from '../assets/localization';


export default {    
  translate (key) {
    const currentLanguage = store.lm.currentLanguage
    // eslint-disable-next-line
    console.log("Current language: ", currentLanguage)
    return dictionary[currentLanguage][key]
  }
}