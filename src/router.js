import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Layout from '@/layouts/Base.vue';

import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';

import Map from '@/views/Map.vue';
import Chat from '@/views/Chat.vue';
import Users from '@/views/Users.vue';
import Profile from '@/views/Profile.vue';
import Equipment from '@/views/Equipment.vue';
import Dashboard from "./views/Dashboard";
import Alerts from "./views/Alerts";
import MachinesWithCritical from "./views/MachinesWithCritical";
import MachinesWithWarnings from "./views/MachinesWithWarnings";

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
      path: 'profile',
      redirect: { name: 'portal' },
    }, {
      path: 'profile/:id',
      name: 'profile',
      component: Profile,
    }, {
      path: 'chat',
      name: 'chat',
      component: Chat,
    }, {
      path: 'chat/private/:id',
      name: 'chat',
      component: Chat,
    }, {
      path: 'chat/group/:id',
      name: 'chat',
      component: Chat,
    }, {
      path: 'map',
      name: 'map',
      component: Map,
    }, {
      path: 'equipment',
      name: 'equipment',
      component: Dashboard,
    }, {
      path: 'equipment/:id',
      name: 'equipment-page',
      component: Equipment,
    }, {
      path: 'equipment-alerts/:id',
      name: 'alerts',
      component: Alerts,
    }, {
      path: 'machines-with-critical',
      name: 'machines-with-critical',
      component: MachinesWithCritical,
    }, {
      path: 'machines-with-warnings',
      name: 'machines-with-warnings',
      component: MachinesWithWarnings,
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
