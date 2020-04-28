import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/layouts/Base.vue';

import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';

import Home from '@/views/Home.vue';
import Chat from '@/views/Chat.vue';
import Equipment from '@/views/Equipment.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'index',
    redirect: { name: 'login' },
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/logout',
    name: 'logout',
    component: Logout
  }, {
    path: '/portal',
    name: 'portal',
    component: Layout,
    redirect: { name: 'home' },
    children: [{
      path: '/home',
      name: 'home',
      component: Home,
    }, {
      path: '/chat',
      name: 'chat',
      component: Chat,
    }, {
      path: '/equipment',
      name: 'equipment',
      component: Equipment,
    }],
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
