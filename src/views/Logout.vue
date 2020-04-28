<template>
  <div class="logout"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  methods: {
    ...mapActions('session', ['logout']),
  },
  async created() {
    await this.logout();
    this.$router.replace({ name: 'login' });
  },
};
</script>

<style lang="scss" scoped>
</style>