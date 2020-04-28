<template>
  <header class="header" id="header">
    <div class="container">
      <div class="header__inner">
        <img src="/src/assets/images/logo.png" alt="logo" class="header__logo">
        <!-- Информация для авторизированных -->
        <nav class="header__nav">
          <button class="header__chat-btn">Чаты</button>
          <div class="header__search">
            <input class="search-txt" type="text" placeholder="Поиск" href=#>
            <img src="/src/assets/images/search-icon.png" alt="" class="search-btn">
          </div>
        </nav>
        <img src="/src/assets/images/user.jpg" alt="" class="header__user-icon">
        <!--- Отображать для неавторизированных
        <div class="header__start-info">
        <p>zakaz@text.com</p>
        <p>8-800-555-99-99</p>
        </div>
        -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Base',
}
</script>

<style lang="scss" scoped>

</style>