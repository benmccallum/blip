import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Laser from '../views/Laser.vue';
import Radar from '../views/Radar.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(Router);

var router = new Router({
  mode: 'history',
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
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

// Events subscribed to
router.afterEach(() => {
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
