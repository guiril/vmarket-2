import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, localize,
} from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';

localize('zh_TW', zhTW);

// No message specified.
extend('email', email);
extend('regex', regex);

// Override the default message.
extend('required', {
  ...required,
  message: '請填寫 {_field_}',
});

// Add a rule.

// Register it globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
