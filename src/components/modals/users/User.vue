<template>
  <div class="nti-form">
    <nti-input class="nti-3" type="text" label="Логин"
      v-model.trim="user.username" placeholder="Введите логин" primary/>
    <nti-input class="nti-3" type="text" label="Email"
      v-model.trim="user.email" placeholder="Введите email" primary/>
    <nti-input class="nti-3" type="dropdown" label="Уровень доступа"
      v-model="user.group" :items="groups" primary/>
    <nti-input class="nti-3" type="switch" label="Администратор"
      v-model="user.is_staff"/>
    <nti-input class="nti-4" type="password" label="Пароль"
      v-model.trim="user.password" placeholder="Введите пароль" primary/>
    <nti-input class="nti-4" type="password" label="Повторите пароль"
      v-model.trim="user.password_confirm" placeholder="Повторите пароль" primary/>
    <nti-input class="nti-4" type="file" label="Фото" accept=".png,.jpeg,.jpg"
      v-model="file" placeholder="Загрузить" primary/>
    <nti-input class="nti-4" type="text" label="Фамилия"
      v-model.trim="user.surname" placeholder="Введите фамилию" primary/>
    <nti-input class="nti-4" type="text" label="Имя"
      v-model.trim="user.name" placeholder="Введите имя" primary/>
    <nti-input class="nti-4" type="text" label="Отчество"
      v-model.trim="user.patronymic" placeholder="Введите фамилию" primary/>
    <nti-input class="nti-4" type="text" label="Должность"
      v-model.trim="user.position" placeholder="Введите должность" primary/>
    <nti-input class="nti-4" type="text" label="Опыт работы"
      v-model.number="user.experience" placeholder="Введите количество лет" primary/>
    <nti-input class="nti-4" type="text" label="Возраст"
      v-model.number="user.age" placeholder="Введите количество лет" primary/>
    <div class="form-actions">
      <button class="nti-button" @click="submit">
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

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
        id: '',
        username: '',
        group: 6,
        groups: [],
        email: '',
        is_staff: false,
        password: '',
        password_confirm: '',
        name: '',
        surname: '',
        patronymic: '',
        age: '',
        position: '',
        experience: '',
        avatar: '',
      },
      file: null,
    }
  },
  computed: {
    ...mapState('users', ['groups']),
    ...mapGetters('users', ['groupByID']),
  },
  methods: {
    ...mapActions('users', ['createUser', 'updateUser']),
    async submit() {
      if (this.user.id) {
        await this.editUser();
      } else {
        await this.addUser();
      }
    },
    async addUser() {
      if (this.user.password !== this.user.password_confirm) {
        this.$toasted.error('Пароли не совпадают');
        return;
      }
      if (!(this.user.username && this.user.email && this.user.group && this.file
        && this.user.name && this.user.surname && this.user.patronymic
        && this.user.age && this.user.position && this.user.experience )) {
        this.$toasted.error('Все поля обязательны');
        return;
      }
      try {
        this.user.avatar = this.file;
        this.user.groups = this.groupByID[this.user.group].set;
        let user = await this.createUser(this.user);
        this.$toasted.success('Пользователь добавлен');
        this.$emit('submit', user);
        this.hideModal();
      } catch (err) {
        err.message ? this.$toasted.error(err.message) : this.$toasted.error('Поля заполнены неверно');
      }
    },
    async editUser() {
      if (this.user.password.length > 0 && (this.user.password !== this.user.password_confirm)) {
        this.$toasted.error('Пароли не совпадают');
        return;
      }
      if (!(this.user.username && this.user.email && this.user.group
        && this.user.name && this.user.surname && this.user.patronymic
        && this.user.age && this.user.position && this.user.experience )) {
        this.$toasted.error('Все поля (кроме паролей и фото) обязательны');
        return;
      }
      try {
        await this.updateUser(this.user);
        this.$toasted.success('Изменения сохранены');
        this.hideModal();
      } catch (err) {
        this.$toasted.error(err.message);
      }
    },
  },
  mounted() {
    if (this.$props.data && this.$props.data.id) {
      this.user = Object.assign({}, this.$props.data);
      this.user.group = this.user.groups[this.user.groups.length - 1] ? this.groups[this.user.groups.length - 1] : undefined;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>