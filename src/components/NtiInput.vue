<template>
  <div class="nti-input" :class="{
    'nti-input--active': isInputStateActive}">

    <!-- Text/Password -->
    <input class="nti-input__field" v-if="$props.type === 'text' || $props.type === 'password'"
      v-model="rawVal" :type="$props.type" :placeholder="$props.placeholder"
      :disabled="$props.disabled"
      @focus="setInputState(InputStates.active)"
      @blur="setInputState(InputStates.default)">

    <!-- Default label -->
    <label class="nti-input__label">
      {{ $props.label }}
    </label>

  </div>
</template>

<script>
const InputStates = {
  default: 0,
  active: 1,
  error: 2,
};

export default {
  name: 'NtiInput',
  props: {
    value: {
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputState: InputStates.default,
      InputStates,
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
    isInputStateActive() {
      return this.inputState === InputStates.active;
    },
  },
  methods: {
    setInputState(state) {
      this.inputState = state;
    },
    changeInputState() {
      if (this.inputState === InputStates.default) {
        this.inputState = InputStates.active;
      } else {
        this.inputState = InputStates.default;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nti-input {
  box-sizing: border-box;
  margin-bottom: 15px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid $neutral;
  transition: border ease-in-out .2s;

  &__label {
    order: -1;
    margin-bottom: 5px;
    color: $neutral;
    font-size: 13px;
    font-family: $bahnschrift;
    transition: color ease-in-out .2s;
  }

  &__field {
    margin: -3px 0 0 -2px;
    width: 100%;
    color: #fff;
    background: transparent;
    font-size: 16px;
    font-family: $calibriLight;
    border: none;
    outline: none;

    &::placeholder {
      color: $neutral;
    }

    &[type="text"] {

      &:disabled {
        background: #fff;
        cursor: not-allowed;
      }

    }

  }
  
  &--active {
    border-bottom: 1px solid #fff;

    .nti-input__label {
      color: #fff;
    }

  }

}
</style>
