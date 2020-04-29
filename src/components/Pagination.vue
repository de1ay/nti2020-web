<template>
  <div class="nti-table__nav">
    <div class="nav-pages">
      <button class="nti-button nti-button--slim nti-button--white" 
        @click="updatePage(1)">
        Первая
      </button>
      <button class="nti-button nti-button--slim nti-button--white" 
        v-if="pagination.page - 1 > 0"
        @click="updatePage(pagination.page - 1)">
        {{ pagination.page - 1 }}
      </button>
      <button class="nti-button nti-button--slim nti-button--small">
        {{ pagination.page }}
      </button>
      <button class="nti-button nti-button--slim nti-button--white" 
        v-if="pagination.page + 1 <= pagination.total_pages"
        @click="updatePage(pagination.page + 1)">
        {{ pagination.page + 1 }}
      </button>
      <button class="nti-button nti-button--slim nti-button--white"
        @click="updatePage(pagination.total_pages)">
        Последняя
      </button>
    </div>
    <div class="nav-show">
      <i>Показывать по:</i>
      <button v-for="val in per_pages" :key="val" @click="updatePerPage(val)"
        class="nti-button nti-button--slim" :class="{
          'nti-button--white': pagination.per_page !== val,
          'nti-button--small': pagination.per_page === val }">
        {{val}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Pagination',
  props: {
    dataFunction: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      per_pages: [15, 50, 100],
    };
  },
  computed: {
    ...mapState('session', ['pagination']),
  },
  methods: {
    ...mapMutations('session', ['setPerPage', 'setPage']),
    updatePage(page) {
      this.$router.replace({
        name: this.$route.name,
        params: {
          page: page,
        },
      });
    },
    updatePerPage(perPage) {
      this.setPerPage(perPage);
      this.$props.dataFunction();
    },
  },
  watch: {
    $route(to, from) {
      this.setPage(Number(to.params.page));
      this.$props.dataFunction();
    }
  },
  mounted() {
    this.setPerPage(this.per_pages[0]);
    if (!this.$route.params || !this.$route.params.page) {
      this.updatePage(1);
    } else {
      this.setPage(Number(this.$route.params.page));
      this.$props.dataFunction();
    }
  },
}
</script>

<style lang="scss" scoped>
.nti-table__nav {
  margin: 30px 0;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-pages {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > button:not(:first-child) {
      margin-left: 10px;
    }

  }

  .nav-show {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > i {
      color: $surfaceDarker;
      font-size: 14px;
    }

    > button {
      margin-left: 10px;
    }

  }

}
</style>
