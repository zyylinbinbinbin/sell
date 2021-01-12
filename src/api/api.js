import $http from './http'
import store from '../store'

//登录
export const postLogin = data => { return $http.post('user/login', data) }

//验证码
export const getVerify = data => { return $http.get('/user/check_code/', data, true) }

//首页
export const getindex = data => { return $http.get('/index', data) }

//项目管理
export const getproject = data => { return $http.get('/project', data) }

// 项目查询
export const postproject = data => { return $http.post('/project', data) }

//初始进新增项目
export const getaddproject = data => { return $http.get('/add_project', data) }

//新增项目
export const postaddproject = data => { return $http.post('/add_project', data) }

//项目信息
export const getalter = data => { return $http.get('/alter_project', data) }

//修改项目信息
export const postalter = data => { return $http.post('/alter_project', data) }



//添加专家信息接口 
export const getaddpro = data => { return $http.post('/add_pro', data) }

//查看项目信息接口
export const getprofessional = data => { return $http.get('professional', data) }

//专家信息修改接口
export const getalterdelpro = data => { return $http.post('/alter_del_pro/(.+)', data) }

//专家删除
export const getdelprofession = data => { return $http.post('/del_profession/(.+)', data) }

//项目信息修改
export const getalterproject = data => { return $http.get('/alter_project/(.+)', data) }

//项目信息删除
export const getdelproject = data => { return $http.get('/del_project/(.+)', data) }

export const getUpload =  '/add_excel'





















// 获取首页导航 or 项目数据
export const gethomeIndexData = role => { return $http.get('/Double/Front/project_index', {role:role}) }

//问题列表
export const problemlist = page => { return $http.get('/Double/Front/message', page) }

//政策解读首页展示
export const gethomedisplay = data => { return $http.get('/Double/Front/home_display_forum', data)}

//答疑解惑首页展示
export const getdisplaymessage = data => { return $http.get('/Double/Front/home_display_message', data)}

//答疑解惑列表展示
export const getdisplaymessagelist = data => { return $http.get('/Double/Front/message', data)}

//答疑解惑问题详情
export const getnormtlist = data => { return $http.get('/Double/Front/message',data)}

//回答问题
export const postnormt = (params,id) => { return $http.post('/Double/index/message', { params: params,id:id}) }

