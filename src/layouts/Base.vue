<template>
  <div class="layout">
    <header class="header">
      <div class="header__inner">
        <img src="@/assets/images/logo.jpg" alt="logo" class="header__logo">
        <nav class="header__nav">
          <nav-link v-for="link in filteredLinks" :key="link.to" :to="link.to" :text="link.text"/>
        </nav>
        <div class="header__user">
          <img src="@/assets/images/user.jpg" alt="" class="header__user-icon">
        </div>
      </div>
    </header>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NavLink from '@/components/NavLink.vue';

export default {
  name: 'Base',
  components: {
    NavLink,
  },
  data() {
    return {
      navLinks: [/*{
        to: 'home',
        text: 'Главная',
      }, */{
        to: 'users',
        text: 'Пользователи',
        showCondition: this.isUserAdmin,
      }, {
        to: 'chat',
        text: 'Чат',
      }, {
        to: 'equipment',
        text: 'Оборудование',
      }],
    };
  },
  computed: {
    ...mapGetters('session', ['isUserAdmin']),
    filteredLinks() {
      return this.navLinks.filter(link => link.showCondition !== false);
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;

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