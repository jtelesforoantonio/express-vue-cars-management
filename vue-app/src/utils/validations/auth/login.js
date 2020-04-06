import {extend, localize} from 'vee-validate';
import {required, email} from 'vee-validate/dist/rules';
import lang from 'vee-validate/dist/locale/es.json';

function validate() {
  extend('required', required);
  extend('email', email);
  localize('en', lang);
}

export default validate;
