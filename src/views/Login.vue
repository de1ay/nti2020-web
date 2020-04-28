<template>
  <div class="login">
    <div class="login-card">
      <div class="card-info">
        <img src="@/assets/images/full_logo.jpg" class="info-logo">
      </div>
      <div class="card-form">
        <div class="form-field">
          <nti-input v-model="login" type="text" label="Логин"
            placeholder="Введите логин"/>
          <nti-input v-model="password" type="password" label="Пароль"
            placeholder="Введите пароль"/>
          <button class="nti-button" :disabled="!isSubmitAllowed" @click="submit">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'Login',
  components: {
    NtiInput,
  },
  data() {
    return {
      login: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('session', ['isAuthorized']),
    isSubmitAllowed() {
      return this.login.length > 0 && this.password.length > 0;
    },
  },
  methods: {
    ...mapActions('session', ['authorize']),
    async submit() {
      if (this.isSubmitAllowed) {
        try {
          await this.authorize({
            login: this.login,
            password: this.password,
          });
          this.$toasted.success('Вход выполнен');
          this.$router.replace({ name: 'home' });
        } catch (e) {
          if (e.length) {
            e.forEach(err => this.$toasted.error(err));
          } else {
            this.$toasted.error(e);
          }
        }
      }
    },
  },
  created() {
    if (this.isAuthorized) {
      this.$router.replace({ name: 'home' });
    }
  },
};
</script>

<style lang="scss" scoped>
.nti-button {
  width: 100%
}

.login {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &-card {
    width: 630px;
    height: 270px;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 50% 50%;

    .card {

      &-info {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $neutral;
        border-right: none;
        border-radius: 10px 0 0 10px;

        .info {

          &-logo {
            height: 120px;
          }

        }

      }

      &-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: $primary;
        border: 1px solid $primary;
        border-radius: 0 10px 10px 0;
      }

    }

  }

}
</style>