import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  mutations,
  state
});

export default store;
