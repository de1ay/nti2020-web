<template>
  <div class="nti-form">
    <nti-input class="nti-12" type="text" label="Название"
      v-model.trim="chat.name" placeholder="Введите название" primary
      @enter="submit"/>
    <div class="form-actions">
      <button class="nti-button" @click="submit">
        Сохранить изменения
      </button>
      <button class="nti-button nti-button--secondary" @click="removeChat" v-if="$props.data">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'Chat',
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
      chat: {
        id: '',
        name: '',
      },
    }
  },
  methods: {
    ...mapActions('chat', ['createChat', 'updateChat', 'deleteChat']),
    async submit() {
      if (this.chat.id) {
        await this.editChat();
      } else {
        await this.addChat();
      }
    },
    async addChat() {
      try {
        let user = await this.createChat(this.chat.name);
        this.$toasted.success('Чат создан');
        this.$emit('submit', user);
        this.hideModal();
      } catch (err) {
        err.message ? this.$toasted.error(err.message) : this.$toasted.error('Поля заполнены неверно');
      }
    },
    async editChat() {
      try {
        await this.updateChat(this.chat);
        this.$toasted.success('Изменения сохранены');
        this.hideModal();
      } catch (err) {
        err.message ? this.$toasted.error(err.message) : this.$toasted.error('Поля заполнены неверно');
      }
    },
    async removeChat() {
      try {
        await this.deleteChat(this.chat.id);
        this.$toasted.success('Чат удалён');
        this.hideModal();
        this.$router.push({ path: '/portal/chat' });
      } catch (err) {
        this.$toasted.error(err.message);
      }
    },
  },
  mounted() {
    if (this.$props.data && this.$props.data.id) {
      this.chat = Object.assign({}, this.$props.data);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>