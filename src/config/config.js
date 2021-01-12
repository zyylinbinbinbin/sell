// 接口api
function changeBaseURL() {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    return '/api'
// 编译环境
  } else {
    return ''
  }
}

// 后台返回图片
function changeBaseIMG() {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    return 'http://192.168.0.152:8000/'
// 编译环境
  } else {
    return ''
  }
}



let config = {
  baseURL: changeBaseURL(),
  baseIMG: changeBaseIMG(),
  pwdReg: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*.]{6,18}$/,
  userInfoKey: 'an_user',
  exceedTime: 86400,
};

export default config;
