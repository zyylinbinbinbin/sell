import store from '../store/index'
import $config from '../config/config'

//数据转化
function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}

export function formatTime(number, format, ride) {

  if (ride === 'ride') {
    number = number * 1000
  }

  let formateArr  = ['Y','M','D','h','m','s'];
  let returnArr   = [];

  let date = new Date(+number*1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 *
 * @param name: key name
 * @param value: key value
 * @param time: expires time
 */
export function setCookie(name, value, time) {
  let exp = new Date();
  exp.setTime(exp.getTime() + time); //过期时间 一天
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  // console.log(expires)
}

export function changeTitle(title, isHome) {
  let projectName = isHome ? '' : (store.state.projectName ? store.state.projectName + '-' : '');
  document.title = projectName + title;
}

export function formatMoney(val) {
  val = String(val);
  if (val.length < 3) return val;
  let [newStr, other] = val.split('.') ;
  let newMoney = newStr.split('').reverse();
  let str = '';
  for (let i = 0; i < newMoney.length; i++) {
    if((i + 1) % 4 === 0) {
      newMoney.splice(i, 0, ',');
    }
  }
  newMoney.reverse();

  for(let i = 0; i < newMoney.length; i++ ){
    str += newMoney[i]
  }
  other && other.length && (str = str + '.' + other);
  return str
}

export function isLogin() {
  let userInfo = store.getters.getUserInfo || JSON.parse(localStorage.getItem($config.userInfoKey));
  if (userInfo && userInfo.login_time) {
    // let nowDate = Date.now() / 1000;
    // if (nowDate - userInfo.login_time <= $config.exceedTime ) {
      !store.getters.getUserInfo && store.commit('changeUserInfo', userInfo);
    //   return true
    // } else {
    //   localStorage.removeItem($config.userInfoKey);
    //   store.commit('changeUserInfo', {})
    // }
    return true
  }
  return false
}

export function debounce(fn, wait) {
  let timer = null;
  return function () {
    let self = this;
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      return fn.apply(self, arg)
    }, wait)
  }
}


export function Message(message){
  this.$notify({
      title: '提示',
      message: message,
      type: 'warning'
    });
}