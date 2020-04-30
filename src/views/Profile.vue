<template>
  <div class="profile">
    <div class="profile-avatar_container">
      <div class="profile-avatar">
        <img :src="user.avatar ? `${apiUrl}${user.avatar}` : require('@/assets/images/no_photo.png')"
          alt="Нет фото" class="avatar">
      </div>
      <div class="nti-button" v-show="false" v-if="isUserAdmin || me.id === user.id">
        Редактировать
      </div>
    </div>
    <div class="profile-info">
      <div class="profile-card profile-full_name">
        <div class="card-title">
          <span class="name">
            {{ !!user.surname ? `${user.surname} ${user.name} ${user.patronymic}` : 'Не задано' }}
          </span>
        </div>
      </div>
      <div class="profile-card">
        <div class="card-row">
          <div class="row-title">Логин</div>
          <div class="row-value">{{ user.username }}</div>
        </div>
        <div class="card-row">
          <div class="row-title">Email</div>
          <div class="row-value">{{ user.email }}</div>
        </div>
      </div>
      <div class="profile-card">
        <div class="card-row">
          <div class="row-title">Возраст</div>
          <div class="row-value">{{ user.age ? user.age : 'Не задан' }}</div>
        </div>
        <div class="card-row">
          <div class="row-title">Должность</div>
          <div class="row-value">{{ user.position ? user.position : 'Не задана' }}</div>
        </div>
        <div class="card-row">
          <div class="row-title">Стаж</div>
          <div class="row-value">{{ user.experience ? user.experience : 'Не задан' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_ENDPOINT,
    };
  },
  computed: {
    ...mapState('users', ['user']),
    ...mapState('session', {me: 'user'}),
    ...mapGetters('session', ['isUserAdmin']),
  },
  methods: {
    ...mapActions('users', ['getUser']),
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &-card {
    padding: 20px;
    min-width: 275px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background: #fff;
    border-radius: 10px;

    .card-title {
      height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: $bahnschrift;
      font-size: 20px;
    }

    .card-row {
      max-width: 275px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      font-family: $bahnschrift;

      &:not(:last-child){
        margin-bottom: 10px;
      }

      .row-title {
        color: $neutralDarker;
      }

    }

  }

  &-info {
    width: 645px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    .profile-card:nth-child(2) {
      margin-right: 15px;
    }

  }

  &-full_name {
    margin-bottom: 15px;
    width: 100%;
  }

  &-avatar_container {
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    .nti-button {
      margin-bottom: 15px;
    }

  }

  &-add_info {
    width: 590px;
  }

  &-avatar {
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 20px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 10px;

    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      object-fit: cover;
    }

  }

}
</style>