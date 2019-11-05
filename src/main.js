import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAnalytics from 'vue-analytics';

import './assets/styles/app.scss';
import './registerServiceWorker'
require('bootstrap');

// Plugin: analytics
// Setup GA analytics with vue-analytics plugin (https://github.com/MatteoGabriele/vue-analytics)
Vue.use(VueAnalytics, {
  id: 'UA-105801869-1',
  router
});

// Plugin: axios
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
