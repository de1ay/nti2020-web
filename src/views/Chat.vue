<template>
  <div class="chat">
    <div class="chats">
      <div class="chats-title">
        <div class="title-text">Чаты</div>
        <v-icon class="title-action" name="plus"/>
      </div>
      <div class="chats-rows">
        <div class="chats-row" v-for="chat in groupChats" :key="`group-${chat.id}`"
          @click="groupChatClick(chat.id)">
          <img class="row-avatar"
            :src="chat.avatar"/>
          <div class="row-content">
            <div class="row-title">{{ chat.name }}</div>
          </div>
        </div>
        <div class="chats-row" v-for="chat in privateChats" :key="`private-${chat.userID}`"
          @click="privateChatClick(chat.userID)">
          <img class="row-avatar"
            :src="(userByPrimaryID[chat.userID] && userByPrimaryID[chat.userID].avatar)
              || require('@/assets/images/no_photo.png')"/>
          <div class="row-content">
            <div class="row-title">{{ (userByPrimaryID[chat.userID] && userByPrimaryID[chat.userID].name) ? 
              `${userByPrimaryID[chat.userID].surname} ${userByPrimaryID[chat.userID].name}` 
              : userByPrimaryID[chat.userID].username }}</div>
            <div class="row-message">{{ chat.message }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="active_chat">
      <div class="active_chat-info">
        <img :src="activeChatInfo.logo || require('@/assets/images/no_photo.png')"
          alt="Нет фото" class="active_chat-avatar">
        <div class="active_chat-title">
          {{ activeChatInfo.title }}
        </div>
      </div>
      <div class="active_chat-messages">
        <div class="message" v-for="msg in activeChat" :key="msg.id">
          <img class="message-avatar" :src="(userByPrimaryID[msg.sender] && userByPrimaryID[msg.sender].avatar)
            || require('@/assets/images/no_photo.png')"/>
          <div class="message-content">
            <div class="message-title">
              {{ msg.sender === user.primary_id ? 'Вы' 
                : (
                  (userByPrimaryID[msg.sender] && userByPrimaryID[msg.sender].name) ? 
                  `${userByPrimaryID[msg.sender].surname} ${userByPrimaryID[msg.sender].name}` 
                  : userByPrimaryID[msg.sender].username
                )
              }}
            </div>
            <div class="message-text">
              {{ msg.message }}
            </div>
          </div>
          <div class="message-time"></div>
        </div>
      </div>
      <div class="active_chat-input">
        <nti-input class="active_chat-input__field nti--margin_0" v-model="message"
          type="text" placeholder="Новое сообщение" aicon="paper-plane" primary
          @aicon="sendMessage" @enter="sendMessage"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import NtiInput from '@/components/NtiInput.vue';

export default {
  name: 'Chat',
  components: {
    NtiInput,
  },
  data() {
    return {
      message: '',
      recievedMessagesRefresh: null,
      groupChatsRefresh: null,
      activeChatRefresh: null,
    };
  },
  computed: {
    ...mapState('session', ['user']),
    ...mapState('users', ['users']),
    ...mapState('chat', [
      'activeChat',
      'activeChatInfo',
      'groupChats'
    ]),
    ...mapGetters('users', ['userByPrimaryID']),
    ...mapGetters('chat', [
      'groupChatByID',
      'privateChats'
    ]),
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapActions('chat', [
      'getGroupChat',
      'getGroupChats',
      'getPrivateChat',
      'getRecievedMessages',
    ]),
    sendMessage() {
      console.log(this.message);
      this.message = undefined;
    },
    groupChatClick(chatID) {
      if (!this.$route.params.id
        || (
          this.$route.path.indexOf('group') === -1
          && this.$route.params.id !== chatID.toString()
        )
      ) {
        this.$router.push({path: `/portal/chat/group/${chatID}`})
      }
    },
    privateChatClick(chatID) {
      if (!this.$route.params.id
        || (
          this.$route.path.indexOf('private') === -1
          && this.$route.params.id !== chatID.toString()
        )
      ) {
        this.$router.push({path: `/portal/chat/private/${chatID}`})
      }
    },
    clearIntervals() {
      if (this.groupChatsRefresh) clearInterval(this.groupChatsRefresh);
      if (this.recievedMessagesRefresh) clearInterval(this.recievedMessagesRefresh);
      if (this.activeChatRefresh) clearInterval(this.activeChatRefresh);
    },
    async initialize() {
      await this.getUsers();
      this.getGroupChats();
      this.getRecievedMessages(this.$route.params.id);

      this.recievedMessagesRefresh = setInterval(() => this.getRecievedMessages(), 5000);
      this.groupChatsRefresh = setInterval(() => this.getGroupChats(), 5000);

      if (this.$route.path.indexOf('private') !== -1 && this.$route.params.id) {
        this.getPrivateChat(this.$route.params.id);
        this.activeChatRefresh = setInterval(() => this.getPrivateChat(this.$route.params.id), 5000);
      }

      if (this.$route.path.indexOf('group') !== -1 && this.$route.params.id) {
        this.getGroupChat(this.$route.params.id);
        this.activeChatRefresh = setInterval(() => this.getGroupChat(this.$route.params.id), 5000);
      }
    }
  },
  watch: {
    async $route() {
      this.clearIntervals();
      await this.initialize();
    }
  },
  async mounted() {
    await this.initialize();
  },
  beforeDestroy() {
    this.clearIntervals();
  }
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .chats {
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border-radius: 10px;

    &-title {
      margin-bottom: 10px;
      padding: 20px;
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-radius: 10px;

      .title {

        &-text {
          font-family: $bahnschrift;
          font-size: 18px;
        }

        &-action {
          margin-top: -2px;
          height: 20px;
          color: $neutralDarker;
          transition: color ease-in-out .2s;

          &:hover {
            color: $primary;
            cursor: pointer;
          }

        }

      }

    }

    &-rows {
      padding: 20px;
      max-height: 1000px;
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      background: #fff;
      border-radius: 10px;
      overflow-y: auto;
    }

    &-row {
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .row {

        &-avatar {
          margin-right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          object-fit: cover;
        }

        &-content {
          max-width: 150px;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
        }

        &-title {
          max-width: 150px;
          font-family: $bahnschrift;
          font-size: 14px;
          word-wrap: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &-message {
          width: 100%;
          max-height: 17px;
          color: $neutralDarker;
          font-family: $bahnschrift;
          font-size: 16px;
          text-align: left;
          word-wrap: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

    }

  }

  .active_chat {
    width: 630px;
    border-radius: 10px;

    &-info {
      margin-bottom: 10px;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 10px;
    }

    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      object-fit: cover;
    }

    &-title {
      margin-left: 10px;
      font-family: $bahnschrift;
      font-size: 18px;
    }

    &-messages {
      margin-bottom: 10px;
      padding: 20px;
      background: #fff;
      border-radius: 10px;

      .message {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        &:not(:last-child) {
          margin-bottom: 20px;
        }

        &-avatar {
          margin-right: 10px;
          width: 39px;
          height: 39px;
          border-radius: 40px;
          object-fit: cover;
        }

        &-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        &-title {
          margin-bottom: 5px;
          color: $neutralDarker;
          font-family: $bahnschrift;
          font-size: 14px;
        }

        &-text {
          font-family: $bahnschrift;
          font-size: 14px;
        }

      }

    }

    &-input {
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #fff;
      border-radius: 10px;

      &__field {
        flex: 1;
      }

      &__button {
        margin-left: 10px;
        color: $neutralDarker;
      }

    }

  }

}
</style>