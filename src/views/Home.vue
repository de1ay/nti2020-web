<template>
  <div class="home">
    <div class="nti-card">CRM</div>
    <div class="nti-card">Корпоративный HR попощник</div>
    <div class="nti-card">Узнать состояние оборудования</div>
    <div class="nti-card">Узнать где сотрудник</div>
    <div class="nti-card">Склад</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  .nti-card {
    margin-bottom: 30px;
    width: 280px;
    height: 100px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-family: $bahnschrift;
    font-size: 20px;

    &:not(:nth-child(3)) {
      margin-right: 30px;
    }

  }

}
</style>