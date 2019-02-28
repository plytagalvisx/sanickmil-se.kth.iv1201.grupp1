import Vue from 'vue';
import translateService from '../services/TranslateService';

const translateKey = (key) => {
  if (!key) return ''
  return translateService.translate(key)
}

Vue.filter('translate', translateKey)

export default translateKey