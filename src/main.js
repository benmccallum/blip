require('bootstrap');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import store from './store';
import router from './router';
import App from './App';
import './assets/styles/app.scss';

Vue.config.productionTip = false;

// Use to 'go offline' and switch to offline mock data when needed
window.offline = false;

// Setup GA analytics with vue-analytics plugin (https://github.com/MatteoGabriele/vue-analytics)
Vue.use(VueAnalytics, {
  id: 'UA-105801869-1',
  router
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
