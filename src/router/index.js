import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Laser from '@/components/Laser';
import Radar from '@/components/Radar';

Vue.use(Router);

export default new Router({
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
