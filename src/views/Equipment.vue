<template>
  <div class="equipment">
    <h1>Просмотор статистики по машине {{$route.params.id}}<router-link style="margin-left: 80px;" :to="{name:'equipment'}">Назад</router-link></h1>
    <span>Дата начала</span><datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.min_date_captured"></datetime>
    <span>Дата конца</span> <datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.max_date_captured"></datetime>
    <span style="display: inline-flex;">
    <button class="nti-button" v-on:click="dispatch">Показать графики за период</button>
    <router-link style="margin-left: 30px;" class="nti-button" :to="{
      name:'alerts',
      params: {id:$route.params.id},
      query: {
        start:params.min_date_captured,
        end: params.max_date_captured,
        }}">Показать оповещения за период</router-link>
      </span>
    <TemperatureGraph></TemperatureGraph>
    <VibrationGraph></VibrationGraph>
    <WorkGraph></WorkGraph>
    <LoadGraph></LoadGraph>
    <PowerGraph></PowerGraph>
  </div>
</template>

<script>
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import { mapActions } from 'vuex';
  import TemperatureGraph from "@/components/graphs/TemperatureGraph";
  import VibrationGraph from "@/components/graphs/VibrationGraph";
  import WorkGraph from "@/components/graphs/WorkGraph";
  import LoadGraph from "@/components/graphs/LoadGraph";
  import PowerGraph from "@/components/graphs/PowerGraph";

  export default {
    components: {
      Datetime,
      TemperatureGraph,
      VibrationGraph,
      WorkGraph,
      LoadGraph,
      PowerGraph,
    },
    name: 'Equipment',
    data: () => {return{
      params: {
        machine_id: null,
        min_date_captured: '2020-03-01T00:00:00.000+03:00',
        max_date_captured: '2020-03-31T23:59:00.000+03:00',
      },
    }},
    methods: {
      ...mapActions('monitor', ['getMonitorData']),
      async dispatch() {
        this.params.machine_id = this.$route.params.id;
        this.getMonitorData(this.params)
      }
    },
    watch: {
      $route() {
        this.params.machine_id = this.$route.params.id;
      }
    },
    mounted() {
      this.params.machine_id = this.$route.params.id;
      this.getMonitorData(this.params)
    },
  };
</script>

<style lang="scss" scoped>

</style>