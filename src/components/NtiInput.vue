<template>
  <div class="nti-input" :class="{
    'nti-input--active': isInputStateActive,
    'nti-input--primary': $props.primary,
    'nti-input--switch': $props.type === 'switch'}">
    <div class="nti-input__container">

      <!-- bicon -->
      <v-icon class="nti-input__bicon" v-if="$props.bicon" :name="$props.bicon"/>

      <!-- Switch -->
      <input v-if="$props.type === 'switch'" type="checkbox" v-model="rawVal"
        class="nti-input__field" :disabled="$props.disabled">

       <!-- File --> 
      <input class="nti-input__field" v-if="$props.type === 'file'"
        :type="$props.type" :placeholder="$props.placeholder"
        :disabled="$props.disabled" :accept="$props.accept"
        @change="onFileChange">

      <!-- Text/Password -->
      <input class="nti-input__field" v-if="$props.type === 'text' || $props.type === 'password'"
        v-model="rawVal" :type="$props.type" :placeholder="$props.placeholder"
        :disabled="$props.disabled"
        @focus="setInputState(InputStates.active)"
        @blur="setInputState(InputStates.default)">

      <!-- Label for switch -->
      <label v-if="$props.type === 'switch'" class="nti-input__label nti-12"
        @click="$emit('input', !rawVal)">
        {{ $props.label }}
      </label>

      <!-- Default label -->
      <label v-else class="nti-input__label nti-12">
        {{ $props.label }}
      </label>

    </div>
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
    accept: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    bicon: {
      type: String,
      default: '',
    },
    primary: {
      type: Boolean,
      default: false,
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
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.$emit('input', files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.nti-input {
  box-sizing: border-box;
  margin-bottom: 15px;

  &__container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid $neutral;
    transition: border ease-in-out .2s;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 0;
      height: 1px;
      background: #fff;
      transition: width ease-in-out .2s;
    }
    
  }

  &__bicon {
    margin-top: -1px;
    padding-right: 4px;
    height: 12px;
    color: $neutral;
    transition: color ease-in-out .2s;
  }

  &__label {
    order: -1;
    margin-bottom: -2px;
    color: $neutral;
    font-size: 13px;
    font-family: $bahnschrift;
    transition: color ease-in-out .2s;
  }

  &__field {
    margin: 0 0 2px -2px;
    flex: 1;
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

    .nti-input__container {

      &::after {
        width: 100%;
      }

      .nti-input__bicon {
        color: #fff;
      }

      .nti-input__label {
        color: #fff;
      }

    }

  }

  &--switch {
    
    .nti-input {

      &__container {
        border: none;
      }

      &__field {
        display: none;

        + .nti-input__label {
          display: block;
          margin-bottom: 23px;
          min-width: 70px;
          color: $neutralDarker;
          user-select: none;
        }

        &:checked {

          + .nti-input__label {

            &:after {
              background: $primaryLighter;
              cursor: pointer;
            }

            &:before {
              left: 30px;
              background: $primaryLight;
              cursor: pointer;
            }

          }

        }

        + .nti-input__label {

          &:after {
            z-index: 2;
            content: ' ';
            position: absolute;
            top: 16px;
            left: 0;
            width: 70px;
            height: 21px;
            border-radius: 15px;
            background: $secondaryLight;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
          }

          &:before {
            z-index: 3;
            content: ' ';
            position: absolute;
            top: 16px;
            left: 0;
            width: 40px;
            height: 21px;
            border-radius: 15px;
            background: $secondary;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
          }

        }

        &:disabled {

          + .nti-input__label {

              &:after { background: $neutralLighter; }
              &:before { background: $neutralDark; }

          }

          + .nti-input__label {

            &:after { background: $neutralLighter; }
            &:before { background: $neutralDark; }

          }

        }

      }

    }

  }

  &--primary {

    .nti-input {

      &__container {
        border-color: $neutralDarker;

        &::after {
          background: $primary;
        }

      }

      &__bicon {
        color: $neutralDarker;
      }

      &__label {
        color: $neutralDarker;
      }

      &__field {
        color: #000;

        &::placeholder {
          color: $neutralDarker;
        }

      }

    }

  }

  &--primary.nti-input--active {

    .nti-input__container {

      .nti-input__bicon,.nti-input__label {
        color: $primary;
      }

    }

  }

}
</style>
