<template>
  <router-link :to="{ name: $props.to, params: $props.params }" 
    class="menu-item" active-class="menu-item--active">
    {{ $props.text }}
  </router-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    to: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  margin: 0 10px;
  padding: 0 1px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $neutral;
  font-family: $bahnschrift;
  font-size: 16px;
  text-decoration: none;
  transition: color ease-in-out .2s;

  &::after {
    content: '';
    position: absolute;
    top: calc(50% + 9px);
    left: 0;
    width: 0;
    height: 2px;
    background: $primary;
    border-radius: 5px;
    transition: width ease-in-out .2s;
  }

  &:hover {
    color: $primary;
    cursor: pointer;
  }

  &--active {
    color: $primary;

    &::after {
      width: 100%;
    }

  }

}
</style>
