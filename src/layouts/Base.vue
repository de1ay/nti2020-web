<template>
  <div class="layout">
    <header class="header">
      <div class="header__inner">
        <img src="@/assets/images/logo.jpg" alt="logo" class="header__logo">
        <nav class="header__nav">
          <nav-link v-for="link in filteredLinks" :key="link.to" :to="link.to" :text="link.text"
            :params="link.params"/>
        </nav>
        <div class="header__user" @click="$router.push({ name: 'profile', params: { id: user.primary_id || 1 } })">
          <img :src="user.avatar ? `${apiUrl}${user.avatar}` : require('@/assets/images/no_photo.png')"
            alt="" class="header__user-icon">
        </div>
      </div>
    </header>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import NavLink from '@/components/NavLink.vue';

export default {
  name: 'Base',
  components: {
    NavLink,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_ENDPOINT,
    };
  },
  computed: {
    ...mapState('session', ['user']),
    filteredLinks() {
      return this.navLinks.filter(link => link.showCondition !== false);
    },
    navLinks() {
      return  [{
        to: 'profile',
        text: 'Профиль',
        params: { id: this.user.primary_id || 1 },
      }, {
        to: 'users',
        text: 'Пользователи',
        params: { page: 1 },
      }, {
        to: 'chat',
        text: 'Чат',
      }, {
        to: 'map',
        text: 'Карта',
      }, {
        to: 'equipment',
        text: 'Оборудование',
      }, {
        to: 'logout',
        text: 'Выход',
      }];
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $neutralLightest;

  .header {
    z-index: 100;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: $bigShadow;

    &__inner {
      padding: 10px;
      width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      height: 40px;
    }

    &__nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__user {

      &:hover {
        cursor: pointer;
      }

      &-icon {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        border: 2px solid $primary;
        object-fit: cover;
      }

    }

  }

  .content {
    margin-top: 30px;
    width: 900px;
  }

}
</style>