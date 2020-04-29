import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Layout from '@/layouts/Base.vue';

import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';

import Home from '@/views/Home.vue';
import Chat from '@/views/Chat.vue';
import Users from '@/views/Users.vue';
import Profile from '@/views/Profile.vue';
import Equipment from '@/views/Equipment.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'index',
    redirect: { name: 'login' },
    meta: { requiresAuth: false },
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  }, {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: { requiresAuth: false },
  }, {
    path: '/portal',
    name: 'portal',
    component: Layout,
    redirect: { name: 'chat' },
    meta: { requiresAuth: true },
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
    }, {
      path: 'profile/:id',
      name: 'profile',
      component: Profile,
    }, {
      path: 'chat',
      name: 'chat',
      component: Chat,
    }, {
      path: 'equipment',
      name: 'equipment',
      component: Equipment,
    }, {
      path: 'users/:page',
      name: 'users',
      component: Users,
    }],
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth !== false) {
    if (!store.getters['session/isAuthorized']) {
      window.location.replace(`/logout`)
    }
    store.dispatch('session/getUser');
  }
  next()
});

export default router;
