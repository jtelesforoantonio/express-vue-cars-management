import {extend, localize} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import lang from 'vee-validate/dist/locale/es.json';

function validate() {
  extend('required', required);
  localize('es', lang);
}

export default validate;
