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
      component: Laser,
      props: (route) => ({ query: route.query.q })
    },
    {
      path: '/radar',
      name: 'Radar',
      component: Radar,
      props: (route) => ({ query: route.query.q })
    }
  ]
});

// Events subscribed to
router.afterEach(function (from, to) {
  // Reset global (per-page) cancel token used by a page's axios HTTP requests
  store.commit('resetCancelToken');
  // Refresh AddThis widgets
  if (window.addthis && window.addthis.layers && window.addthis.layers.refresh) {
    // For some reason this needs to be delayed slightly for the URL change to be reflected in
    // the share buttons...
    setTimeout(() => window.addthis.layers.refresh(), 500);
  }
});

export default router;
