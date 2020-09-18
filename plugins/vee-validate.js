import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, localize,
} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';

localize('zh_TW', zhTW);

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: '請填寫 {_field_}',
});

// Add a rule.
// extend('secret', {
//   validate: (value) => value === 'example',
//   message: 'This is not the magic word',
// });

// Register it globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
