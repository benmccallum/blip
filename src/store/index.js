import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';
import googlePageSpeedModule from './googlePageSpeedModule';
import isHtml5Module from './isHtml5Module';
import mozillaObservatoryHttpModule from './mozillaObservatoryHttpModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  mutations,
  state,
  modules: {
    googlePageSpeedModule,
    isHtml5Module,
    mozillaObservatoryHttpModule
  }
});

export default store;
