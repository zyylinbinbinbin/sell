import axios from 'axios' // 引入axios
import qs from 'qs'  // 序列化字符串
import {
  Message
} from 'element-ui'

import store from '../store/index' // 引入全局状态管理
import config from '../config/config'
// import router from '../router' // 路由


// 请求超时时间
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true

function headerUrl (url) {
  url = config.baseURL + url
  return url
}

// 添加默认参数
function addDefaultParam(param, type) {
  let localprojectId = localStorage.getItem('project_id')
  
  param = param ? param : {};

  // if (param['token'] || store.state.token) {
  //   param['token'] = param['token'] || store.state.token;
  // }

  // if (param['projectId'] ||  localprojectId) {
  //   param['project_id'] = param['projectId'] || localprojectId;
  // }

  // if (param['step_id'] || store.state.menuId) {
  //   param['step_id'] = param['step_id'] || store.state.menuId;
  // }

  // if (type === 'POST') {
  //   param['path'] = param['path'] || store.state.path;
  //   param['nav_id'] = param['nav_id'] || store.state.navId;
  // }

  return param;
}


// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// response 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code == 400) {
        Message.error(response.data.msg);
        return Promise.resolve(false)
      } else if (response.data.code == 2021) {
		    Message.error(response.data.msg);
        return Promise.resolve(false)
      } else if (response.data.code == 3333) {
        localStorage.removeItem(config.userInfoKey);
        store.commit('changeUserInfo', {});
        Message.warning('登录过期，请重新登录!');
        router.push('/login');
      } else if (response.data.code == 5555) {
        Message.error(response.data.prompting);
        router.push('/');
        return Promise.resolve(false)
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  // 服务状态码不是200的情况
  error => {
    if (error.response.status) {
      Message.error('网络似乎出现了错误，请检查网络~');
      return Promise.reject(error.response)
    }
  }
)

export default {
  /**
   * get方法对应get请求
   * @param {String} url 请求地址
   * @param {Object} params 携带参数
   * @param {Boolean} other 判别码
   * @returns {Promise}
   */
  get (url, params, other) {
    params = addDefaultParam(params);
    let paramsObj = {
      params: params
    };
    if (other) {
      paramsObj['responseType'] = "arraybuffer"
    }
    // blob
    return new Promise((resolve, reject) => {
      axios.get(headerUrl(url), paramsObj)
        .then(res => {
          resolve(res.data)
        })

    })
  },
	
  /**
   * post方法对应post请求
   * @param {String} url 请求地址
   * @param {Object} params 携带参数
   * @returns {Promise}
   */
  post (url, params) {
    params = addDefaultParam(params, 'POST');
    return new Promise((resolve, reject) => {
      axios.post(headerUrl(url), qs.stringify(params))
        .then(res => {
          resolve(res.data)
        })
    })
  },
}
