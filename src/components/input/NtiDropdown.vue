<template>
  <div class="dropdown" :class="{
      'dropdown--opened': opened,
      'nti-input--primary': $props.primary
    }"
    :disabled="$props.disabled"
    v-on-click-outside="hide">
    <div v-if="activeItem" class="dropdown-item dropdown-item--active"
      @click="changeOpenedState">
      {{ activeItem.text }}
    </div>
    <div v-else class="dropdown-item dropdown-item--placeholder" @click="changeOpenedState">
      {{ $props.placeholder }}
    </div>
    <div v-if="opened" class="dropdown-list">
      <div class="dropdown-item" v-for="item in itemsForSelect" :key="item.prop"
        @click="selectItem(item)">
        {{ item.text }}
      </div>
    </div>
    <div class="dropdown-arrow">
      <v-icon name="angle-down" class="dropdown-arrow__icon"
        @click="changeOpenedState"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NtiDropdown',
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
      opened: false,
    };
  },
  computed: {
    rawVal: {
      set(change) {
        this.$emit('input', change);
      },
      get() {
        return this.$props.value;
      },
    },
    activeItem() {
      return this.$props.items.find(item => item.prop === this.$props.value);
    },
    itemsForSelect() {
      const result = this.$props.items.filter(item => item.prop !== this.$props.value);
      return result;
    },
  },
  methods: {
    changeOpenedState() {
      this.opened = !this.opened;
      if (this.opened) {
        this.$emit('focus');
      } else {
        this.$emit('unfocus');
      }
    },
    hide() {
      this.opened = false;
      this.$emit('unfocus');
    },
    selectItem(item) {
      this.rawVal = item.prop;
      this.text = item.text;
      this.changeOpenedState();
      this.$emit('select', item.prop);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: $calibriLight;
  font-size: 16px;

  &[disabled = "disabled"] {

    &.dropdown--in_text::after {
      border-bottom-color: $neutralDark;
    }

    .dropdown {

      &-item {

        &:hover {
          cursor: not-allowed;
        }

      }

    }
  }

  &--opened {

    .dropdown {

      &-arrow {

        &__icon {
          transform: rotateZ(180deg);
        }

      }

    }

  }

  &--primary {

    .dropdown {

      &-item--active {
        color: $primaryLight;
      }

      &-list {
        box-shadow: 0 0 10px -3px $primaryLight;

        .dropdown-item {
          color: #fff;
          background: $primaryLight;

          &:hover {
            background: $primary;
          }

        }

      }

      &-arrow {

        &__icon {
          color: $primary;
        }

      }

    }

  }

  &-item {
    height: 22px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    transition: background ease-in-out .2s, color ease-in-out .2s;

    &--active {
      margin: -1px 0 1px 0;
      flex: 1;
      color: #000;

      &:hover {
        cursor: pointer;
      }

    }

    &--placeholder {
      flex: 1;
      color: $neutralDark;

      &:hover {
        cursor: pointer;
      }

    }

  }

  &-list {
    z-index: 100;
    position: absolute;
    top: 25px;
    max-height: 75px;
    min-width: 100%;
    max-width: 350px;
    background: #fff;
    font-size: 16px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    border-radius: 10px;
    box-shadow: 0px 0px 10px -3px #000;

    &::-webkit-scrollbar {
      display: none;
    }

    .dropdown-item {
      padding: 3px 20px;

      &:hover {
        color: #fff;
        background: $primary;
        cursor: pointer;
      }

    }

  }

  &-arrow {
    height: 21px;
    width: 21px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    &__icon {
      color: #000;
      transition: all ease-in-out .2s;
    }

  }

}
</style>
