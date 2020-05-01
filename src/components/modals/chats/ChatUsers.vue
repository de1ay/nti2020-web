<template>
  <div class="nti-form">
    <nti-input class="nti-12" type="autocomplete" label="Добавить пользователя"
      v-model="newUser" placeholder="Поиск по логину" primary :items="usersForSelect"
      aicon="plus" @enter="addUser"/>
    <div class="users">
      <div class="user" v-for="bind in usersByChatID[chat.id]" :key="`bind-${bind.id}`">
        <img class="user-avatar"
          :src="userByPrimaryID[bind.user].avatar || require('@/assets/images/no_photo.png')"/>
        <div class="user-title">
          {{
            userByPrimaryID[bind.user].name
            ? `${userByPrimaryID[bind.user].surname} ${userByPrimaryID[bind.user].name} ${userByPrimaryID[bind.user].patronymic}`
            : userByPrimaryID[bind.user].username
          }}
        </div>
        <v-icon class="user-action" v-if="bind.user !== chat.owner"
          name="trash" @click="removeUser(bind)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'ChatUsers',
  components: {
    NtiInput,
  },
  inject: ['hideModal'],
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      newUser: undefined,
      chat: {},
    }
  },
  computed: {
    ...mapState('session', { me: 'user' }),
    ...mapState('users', ['users']),
    ...mapGetters('users', ['userByPrimaryID']),
    ...mapGetters('chat', ['usersByChatID']),
    usersForSelect() {
      if (!this.chat.id) return [];
      return this.users.map(user => ({
        prop: user.primary_id,
        text: user.username,
      }))
    },
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapActions('chat', ['getChatUsers', 'addUserToChat', 'removeUserFromChat']),
    async addUser() {
      if (this.usersByChatID[this.chat.id].find(bind => bind.user === this.newUser)) {
        this.$toasted.error('Пользователь уже состоит в чате');
        this.newUser = undefined;
        return;
      }
      try {
        await this.addUserToChat({
          userID: this.newUser,
          chatID: this.chat.id,
          notifications: false,
        });
        this.getChatUsers();
        this.newUser = undefined;
        this.$toasted.success('Пользователь добавлен');
      } catch (err) {
        err.message ? this.$toasted.error(err.message) : this.$toasted.error('Поля заполнены неверно');
      }
    },
    async removeUser(bind) {
      if (bind.user === this.chat.owner) {
        this.$toasted.error('Нельзя удалить владельца чата');
        return;
      }
      try {
        await this.removeUserFromChat(bind.id);
        this.getChatUsers();
        this.$toasted.success('Пользователь удален');
      } catch (err) {
        this.$toasted.error(err.message);
      }
    },
  },
  async mounted() {
    this.chat = Object.assign({}, this.$props.data);
    await this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
.users {
  padding: 0 10px;
  margin: 10px 0;
  max-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: hidden;
  overflow-y: auto;

  .user {
    height: 40px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      object-fit: cover;
    }

    &-title {
      margin-left: 15px;
      font-family: $bahnschrift;
      font-size: 18px;
    }

    &-action {
      margin: 0 4px 0 auto;
      width: 14px;
      height: 14px;
      color: $neutralDarker;
      transition: color ease-in-out .2s;

      :hover {
        color: $secondary;
        cursor: pointer;
      }

    }

  }

}
</style>