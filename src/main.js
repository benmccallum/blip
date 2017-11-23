require('bootstrap');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import './assets/styles/app.scss';

// Plugin: analytics
// Setup GA analytics with vue-analytics plugin (https://github.com/MatteoGabriele/vue-analytics)
import VueAnalytics from 'vue-analytics';
Vue.use(VueAnalytics, {
  id: 'UA-105801869-1',
  router
});

// Plugin: axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
