import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'login' },
  },  
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
