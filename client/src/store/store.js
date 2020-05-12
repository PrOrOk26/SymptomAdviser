import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import actions from './actions';
import steps from './modules/steps';
import patients from './modules/patients';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    api,
    steps,
    patients
  }
});
