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
    <div class="active_chat" v-if="$route.params.id">
      <div class="active_chat-info">
        <img :src="activeChatInfo.logo || require('@/assets/images/no_photo.png')"
          alt="Нет фото" class="active_chat-avatar">
        <div class="active_chat-title">
          {{ activeChatInfo.title }}
        </div>
      </div>
      <div class="active_chat-messages" ref="chatMessages">
        <div class="message" v-for="msg in activeChat" :key="msg.id">
          <img class="message-avatar" :src="(userByPrimaryID[msg.sender] && userByPrimaryID[msg.sender].avatar)
            || require('@/assets/images/no_photo.png')"
            @click="$router.push({name: 'profile', params: { id: msg.sender }})"/>
          <div class="message-content">
            <div class="message-title">
              {{ msg.sender === user.primary_id ? 'Вы' 
                : (
                  (userByPrimaryID[msg.sender] && userByPrimaryID[msg.sender].name) ? 
                  `${userByPrimaryID[msg.sender].surname} ${userByPrimaryID[msg.sender].name}` 
                  : userByPrimaryID[msg.sender].username
                )
              }}
              <div class="message-date">
                {{ getDisplayDate(msg.timestamp) }}
              </div>
            </div>
            <div class="message-text">
              {{ msg.message }}
            </div>
          </div>
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
      dateFormatOptions: {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
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
    isGroupChat() {
      return this.$route.path.indexOf('group') !== -1;
    },
    isPrivateChat() {
      return this.$route.path.indexOf('private') !== -1;
    }
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapActions('chat', [
      'getGroupChat',
      'getGroupChats',
      'getPrivateChat',
      'getRecievedMessages',
      'sendChatMessage',
      'sendPrivateMessage',
    ]),
    scrollToLastMessage() {
      this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
    },
    getDisplayDate(data) {
      let date = new Date(data);
      return date.toLocaleString('ru-RU', this.dateFormatOptions);
    },
    async sendMessage() {
      if (!this.message || this.message.length === 0) return;
      try {
        if (this.isPrivateChat) {
          await this.sendPrivateMessage({
            userID: this.activeChatInfo.id,
            message: this.message,
          })
          this.getPrivateChat(this.$route.params.id);
        }
        if (this.isGroupChat) {
          await this.sendChatMessage({
            chatID: this.activeChatInfo.id,
            message: this.message,
          })
          this.getGroupChat(this.$route.params.id);
        }
      } catch (e) {
          console.log(e);
          this.$toasted.error('Ошибка при отправке сообщения');
        }
      this.message = undefined;
    },
    groupChatClick(chatID) {
      if (!this.$route.params.id
        || this.isPrivateChat
        || this.$route.params.id !== chatID.toString()
      ) {
        this.$router.push({path: `/portal/chat/group/${chatID}`})
      }
    },
    privateChatClick(chatID) {
      if (!this.$route.params.id
        || this.isGroupChat
        || this.$route.params.id !== chatID.toString()
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

      if (this.isPrivateChat && this.$route.params.id) {
        await this.getPrivateChat(this.$route.params.id);
        this.scrollToLastMessage();
        this.activeChatRefresh = setInterval(() => this.getPrivateChat(this.$route.params.id), 5000);
      }

      if (this.isGroupChat && this.$route.params.id) {
        await this.getGroupChat(this.$route.params.id);
        this.scrollToLastMessage();
        this.activeChatRefresh = setInterval(() => this.getGroupChat(this.$route.params.id), 5000);
      }
    }
  },
  watch: {
    async $route() {
      this.clearIntervals();
      await this.initialize();
    },
    activeChat(to, from) {
      if (to.length > from.length) {
        let to = setTimeout(() => this.scrollToLastMessage(), 50);
      }
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
  margin-bottom: 30px;
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
      height: 20px;
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
      max-height: 530px;
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
          max-height: 16px;
          color: $neutralDarker;
          font-family: $bahnschrift;
          font-size: 14px;
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
      max-height: 416px;
      background: #fff;
      border-radius: 10px;
      overflow-y: auto;

      .message {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        &:not(:last-child) {
          margin-bottom: 20px;
        }

        &-avatar {
          margin-right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          object-fit: cover;

          &:hover {
            cursor: pointer;
          }

        }

        &-content {
          max-width: 534px;
          min-width: 534px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        &-title {
          margin: 3px 0 5px 0;
          display: flex;
          justify-content: space-between;
          color: $neutralDarker;
          font-family: $bahnschrift;
          font-size: 12px;
        }

        &-time {
          color: $neutralDarker;
          font-family: $bahnschrift;
          font-size: 12px;
        }

        &-text {
          max-width: 534px;
          font-family: $bahnschrift;
          font-size: 14px;
          word-break: break-word;
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