import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import New from '@/components/New'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title: 'Statistic'
      }
    },
    {
      path: '/new',
      name: 'New',
      component: New,
      meta:{
        title: 'Nouvel achat'
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta:{
        title: 'Modifier un achat'
      }
    }
  ]
})
