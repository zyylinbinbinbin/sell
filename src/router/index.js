import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Logins/logins'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index'
import { isLogin } from '../assets/base'
const home = () => import('../components/Home/home.vue')


NProgress.configure({ showSpinner: false });

Vue.use(Router);
// component: () => import('@/components/NormtMain/normtMain'),
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'logins',
      component: Login
    },
    {
      path: '/ccc',
      name: 'ccc',
      component: () => import('@/components/ccc/ccc'),
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: () => import('@/components/ceshi'),
    },
    {
      path: '/home',
      component: home,
      redirect:'/homepage',
      children: [
        { 
          path: '/homepage', 
          component: () => import('@/components/Homepage/homepage'),
        },
        { 
          path: '/expert-GL', 
          component: () => import('@/components/Expert-GL/expert-GL'),
        },
        { 
          path: '/project-GL', 
          component: () => import('@/components/Project-GL/project-GL'),
        },
        { 
          path: '/project-Add', 
          component: () => import('@/components/Project-Add/project-Add'),
        },
        { 
          path: '/project-Change', 
          component: () => import('@/components/Project-Change/project-Change'),
        },
        // { 
        //   path: '/normt_details/:id',
        //   name:'normt_details', 
        //   component: () => import('@/components/Normt_details/normt_details'),
        // },
    ]
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/components/ErrorPage/404'),
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   window.scrollTo(0,0);
//   NProgress.start();
//   next()
//   let userId = sessionStorage.getItem("token");
//   // 是这白名单 白名单内不检查userId
//   // let whitePath = ['register','login']
//   if(!userId){
//     next({
//       path:'/'
//     })
//   }else{
//     next()
//   }
//   NProgress.done();
// })


// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   //to 将要访问的路径
//   //from 从哪个路径来
//   //next 是否放行   否 next("/login")

//   if (to.path === '/login') return next()
//   //获取token
//   const userId = window.sessionStorage.getItem('token')
//   console.log(userId)
//   if (!userId) return next('/login')
//   next()
// })

export default router
