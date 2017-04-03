import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Other from '@/components/Other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/other',
      name: 'Other',
      component: Other
    }
  ]
})
