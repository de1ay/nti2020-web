<template>
  <div class="users">
    <modal v-if="modal" title="Пользователь" @close="setModal()">
      <user-modal/>
    </modal>
    <div class="navbar">
      <nti-input class="nti-3" v-model="search" type="text"
        placeholder="Начните ввод для поиска" bicon="search" primary/>
      <button class="nti-button" @click="setModal(true)">Добавить пользователя</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

import Modal from '@/components/Modal.vue';
import UserModal from '@/components/modals/users/User.vue';

export default {
  name: 'Users',
  components: {
    NtiInput,
    Modal,
    UserModal,
  },
  data() {
    return {
      modal: false,
      search: '',
    }
  },
  computed: {
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    setModal(modal=false, editableUser=null) {
      this.modal = modal;
      this.editableUser = editableUser;
    },
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style lang="scss" scoped>

</style>