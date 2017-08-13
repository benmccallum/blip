require('bootstrap');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import App from './App';
import './assets/styles/app.scss';

Vue.config.productionTip = false;

// Use to 'go offline' and switch to offline mock data when needed
window.offline = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
