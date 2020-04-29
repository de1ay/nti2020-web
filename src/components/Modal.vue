<template>
  <div class="modal">
    <div class="modal-content" v-on-click-outside="close">
      <div class="header">
        <div class="title">{{$props.title}}</div>
        <button class="nti-button nti-button--white" @click="close">
          <v-icon name="times"/>
        </button>
      </div>
      <div class="content">
        <slot @close="close"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  provide() { 
    return {
      hideModal: this.close,
    }
  },
  props: {
    title: {
      type: String,
      default: '...',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &-content {
    z-index: 1001;
    padding: 20px 10px;
    width: 900px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;

    .header {
      margin: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-family: $bahnschrift;
        font-size: 20px;
        font-weight: bold;
        color: $primary;
      }

    }

  }

  .content {
    margin-top: 10px;
  }

}
</style>
