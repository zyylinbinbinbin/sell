// import { getNextBtn, getPersonal, getVerify, postLogin, getAsyncRoutes } from "../api/api";
import { getVerify, postLogin } from "../api/api";

import { setCookie } from '../assets/base'
import $config from '../config/config';
import router from "../router";

export const hasPermissionRole = (route, roles) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
};

export const filterAsyncRoutes = (router, roles) => {
  let res = [];
  router.forEach(route => {
    const tmp = { ...route };
    if (hasPermissionRole(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp);
    }
  });
  return res;
};

const actions = {
  nextBtn(context, isHome) {
    getNextBtn(isHome, context.state.userInfo.identity)
      .then(res => {
        context.commit('changeNextInfo', res)
      })
  },
  getUserInfo: async({ commit, state }) => {
    const data = await getPersonal(state.userInfo.id, state.userInfo.identity);
    const roles = data.role.length ? data.role : ['guest'];
    commit('changeUserRoles', roles);
    return roles;
  },
  asyncRoutes: async() => {
    const routes = await getAsyncRoutes();
    if (routes && routes.length) {
      return routes
    }
  },
  //登录
  login: async({ commit }, data) => {
    let res = await postLogin(data);
    if (res && res.id) {
      setCookie("user_login_cookice", res.id, $config.exceedTime * 1000);
      console.log($config.exceedTime * 1000)
      localStorage.setItem($config.userInfoKey, JSON.stringify(res));
      commit('changeUserInfo', res);

    }
    return res
  },
  //退出登录
  output({ commit }) {
    setCookie("user_login_cookice", 0, 0);
    localStorage.removeItem($config.userInfoKey);
    sessionStorage.removeItem('token');
    commit('changeUserInfo', {});
    commit('changeUserRoles', []);
    router.push('/');
  },
  //注册账号
  register: async({ commit }, data) => {
    console.log(data);
  },
  //验证码
  verifyCode: async({ commit }) => {
    let res = await getVerify();
    if (res) {
      let img = btoa(
        new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return 'data:image/png;base64,' + img;
    }
  }
};

export default actions;
