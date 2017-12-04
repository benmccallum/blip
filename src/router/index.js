import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import Home from '@/components/Home';
import Laser from '@/components/Laser';
import Radar from '@/components/Radar';

Vue.use(Router);

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/laser',
      name: 'Laser',
      component: Laser
    },
    {
      path: '/radar',
      name: 'Radar',
      component: Radar
    }
  ]
});

// Events subscribed to
router.afterEach(function (to, from) {
  // Reset global (per-page) cancel token used by a page's axios HTTP requests
  store.commit('resetCancelToken');
  // Refresh AddThis widgets
  window.addthis.layers.refresh();
});

export default router;
