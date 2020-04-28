<template>
  <div class="login">
    <div class="login-card">
      <div class="card-info">

      </div>
      <div class="card-form">
        <div class="form-field">
          <nti-input v-model="login" type="text" label="Логин" placeholder="Введите логин"/>
          <nti-input v-model="password" type="password" label="Пароль" placeholder="Введите пароль"/>
          <button class="nti-button" :disabled="!isSubmitAllowed">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    isSubmitAllowed() {
      return !!this.login && !!this.password;
    },
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
        border: 1px solid $neutral;
        border-right: none;
        border-radius: 10px 0 0 10px;
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