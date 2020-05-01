<template>
  <div class="users">
    <modal v-if="modal" title="Пользователь" @close="setModal()">
      <user-modal/>
    </modal>
    <div class="navbar">
      <nti-input class="nti-3 nti--margin_0" v-model="search" type="text"
        placeholder="Поиск по логину" bicon="search" primary/>
      <button class="nti-button nti-button--transparent" v-if="isUserHighManager || isUserManager" @click="setModal(true)">
        Добавить пользователя
      </button>
    </div>
    <div class="users-content">
      <div class="user" v-for="user in filteredUsers" :key="user.primary_id"
        @click="$router.push({name: 'profile', params: { id: user.primary_id }})">
        <div class="user-avatar">
          <img :src="user.avatar || require('@/assets/images/no_photo.png')" alt="Нет фото">
        </div>
        <div class="user-info">
          <div class="info-rows">
            <div class="info-row">
              <div class="row-title">Логин:</div>
              <div class="row-value">{{ user.username }}</div>
            </div>
            <div class="info-row">
              <div class="row-title">Email:</div>
              <div class="row-value">{{ user.email }}</div>
            </div>
            <div class="info-divider"></div>
            <div class="info-row">
              <div class="row-title">ФИО:</div>
              <div class="row-value">
                {{ !!user.surname ? `${user.surname} ${user.name} ${user.patronymic}` : 'Не задано' }}
              </div>
            </div>
            <div class="info-row">
              <div class="row-title">Должность: </div>
              <div class="row-value">{{ user.position ? user.position : 'Не задана' }}</div>
            </div>
          </div>
          <div class="info-tags">
            <div class="info-tag" v-if="user.is_staff">Администратор</div>
            <div class="info-tag" v-if="user.groups[user.groups.length - 1] && user.groups[user.groups.length - 1] > 5">
              {{ groupByID[user.groups[user.groups.length - 1]].text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

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
      apiUrl: process.env.VUE_APP_API_ENDPOINT,
    }
  },
  computed: {
    ...mapState('users', ['users']),
    ...mapGetters('session', ['isUserHighManager', 'isUserManager']),
    ...mapGetters('users', ['groupByID']),
    filteredUsers() {
      return this.users.filter(user => user.username.indexOf(this.search) === 0);
    },
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    setModal(modal=false, editableUser=null) {
      this.modal = modal;
      this.editableUser = editableUser;
    },
  },
  created() {
    this.getUsers();
  }
}
</script>

<style lang="scss" scoped>
.users {

  .navbar {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .user {
    box-sizing: border-box;
    margin-bottom: 30px;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: #fff;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
    }

    &-avatar {

      > img {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        object-fit: cover;
      }

    }

    &-info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      .info {

        &-tags {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
        }

        &-tag {
          box-sizing: border-box;
          right: 0;
          margin-left: 20px;
          padding: 5px 20px;
          height: 24px;
          color: #fff;
          background: $primary;
          font-family: $bahnschrift;
          font-size: 12px;
          border-radius: 10px;
        }

        &-divider {
          margin: 5px 0 0 20px;
          height: 40px;
          width: 1px;
          background: $neutralDarker;
          border-radius: 10px;
        }

        &-rows {
          max-height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        &-row {
          margin-left: 20px;
          min-width: 200px;
          height: 50%;
          display: flex;
          align-items: flex-start;

          .row {

            &-title {
              min-width: 100px;
              color: $neutralDarker;
              font-family: $bahnschrift;
              font-size: 16px;
            }

            &-value {
              font-family: $bahnschrift;
              font-size: 16px;
            }

          }

        }

      }

    }

  }

}
</style>