import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js'
import actions from "./actions.js"
import getters from "./getters.js"
//注册 vuex
Vue.use(Vuex);

const state = {
  projectId: '6666',
  menuId: undefined,
  menuTitle: '',
  path: '',
  navId: '',
  menu: [],
  projectName: '',
  token: 'edtzk',
  specialistOptions: {},
  nextInfo: {},
  roles: [],
  userInfo: null,
  // unscrambleId:undefined,
  // doubtId:undefined,
  adminleftnavnum:"1", //管理后台左侧导航
  count: 0,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
