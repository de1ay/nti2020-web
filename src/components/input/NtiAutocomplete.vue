<template>
  <div class="autocomplete"
    :class="{'autocomplete--opened': opened}">
    <input class="nti-input__field" type="text" v-model="text"
      :placeholder="$props.placeholder" :disabled="$props.disabled"
      @focus="onFocus" @input="onInput" @keydown.enter="$emit('enter', rawVal)"
      v-on-click-outside="onUnfocus">
    <div v-if="opened" class="dropdown-list">
      <div class="dropdown-item" v-for="item in itemsForSelect" :key="item.prop"
        @click="selectItem(item)">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WpAutocomplete',
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
      return this.$props.items.filter(
        item => item.text.toLowerCase().indexOf(this.text.toLowerCase()) === 0,
      );
    },
  },
  methods: {
    onFocus() {
      if (this.text.length > 0 && this.rawVal === undefined) {
        this.opened = true;
      }
      this.$emit('focus');
    },
    onUnfocus() {
      if (this.text.length > 0 && this.rawVal !== undefined) {
        this.text = this.activeItem.text;
      }
      this.opened = false;
      this.$emit('unfocus');
    },
    onInput() {
      if (this.text.length > 0) {
        if (this.itemsForSelect.length === 1) {
          this.selectItem(this.itemsForSelect[0]);
        } else {
          this.opened = true;
        }
      } else {
        this.opened = false;
        this.rawVal = undefined;
      }
    },
    selectItem(item) {
      this.rawVal = item.prop;
      this.text = item.text;
      this.opened = false;
      this.$emit('unfocus');
      this.$emit('select', item.prop);
    },
  },
  watch: {
    rawVal(to) {
      if (to === undefined) {
        this.text = '';
      }
    },
  },
  mounted() {
    if (this.$props.value || this.$props.value === null) {
      if (this.$props.items.length !== 0) {
        this.text = this.$props.items.find(
          item => item.prop === this.$props.value,
        ).text;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: $calibriLight;
  font-size: 16px;

  .nti-input__field {
    margin-left: -2px;
    width: 100%;
    height: 22px;
    color: #000;
    font-size: 16px;
    font-family: $calibriLight;
    border: none;
    outline: none;

    &::placeholder {
      color: $neutralDarker;
    }

  }

  .dropdown {

    &-item {
      height: 22px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
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
        color: $neutralDarker;

        &:hover {
          cursor: pointer;
        }

      }

    }

    &-list {
      z-index: 100;
      position: absolute;
      top: 30px;
      max-height: 75px;
      width: 100%;
      background: #fff;
      font-size: 15px;
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      border-radius: 5px;
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

  }

}
</style>
