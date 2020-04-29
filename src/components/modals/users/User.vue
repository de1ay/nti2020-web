<template>
  <div class="nti-form">
    <nti-input class="nti-6" type="text" label="Логин"
      v-model.trim="user.login" placeholder="Введите логин" primary/>
    <nti-input class="nti-6" type="text" label="Email"
      v-model.trim="user.email" placeholder="Введите email" primary/>
    <div class="form-actions">
      <button class="nti-button">
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'User',
  components: {
    NtiInput,
  },
  inject: ['hideModal'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      user: {
        login: '',
        email: '',
        is_staff: false,
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>