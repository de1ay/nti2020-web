<template>
  <div class="chat">Chat</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Chat',
  methods: {
    ...mapActions('users', ['getUsers']),
  },
  computed: {
    ...mapState('users', ['users']),
  },
  created() {
    this.getUsers();
  }
};
</script>

<style lang="scss" scoped>

</style>