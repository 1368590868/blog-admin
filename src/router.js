import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'admin',
      component: () => import('@/views/Admin'),
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'adminLogin',
          component: () => import('@/views/Admin/Login')
        },
        {
          path: '/home',
          name: 'adminHome',
          component: () => import('@/views/Admin/Home'),
          redirect: '/home/workbench',
          children: [
            {
              path: '/home/workbench',
              name: 'workbench',
              component: () => import('@/views/Admin/Workbench')
            },
            {
              path: '/home/personal',
              name: 'personal',
              component: () => import('@/views/Admin/Personal')
            },
            {
              path: '/home/writeArticle',
              name: 'writeArticle',
              component: () => import('@/views/Admin/WriteArticle')
            },
            {
              path: '/home/articleUpdate',
              name: 'articleUpdate',
              component: () => import('@/views/Admin/ArticleUpdate')
            }
          ]
        }
      ]
    }
  ]
})
