import store from '../store';
import dictionary from '../assets/localization';

export default {
  /**
   * Gets a localized text string from a key
   * @param {String} key the key for localization
   * @returns {String} The actual localized string
   */
  translate (key) {
    const currentLanguage = store.state.languageModule.currentLanguage
    return dictionary[currentLanguage][key]
  }
}