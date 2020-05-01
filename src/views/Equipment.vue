<template>
  <div class="equipment">
    <h1>Оборудование тест</h1>
    <span>Дата начала</span><datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.min_date_captured"></datetime>
    <span>Дата конца</span> <datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.max_date_captured"></datetime>
    <button v-on:click="dispatch">Загрузить</button>
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
        machine_id: 2,
        min_date_captured: '2020-03-01T00:00:00.000+03:00',
        max_date_captured: '2020-03-30T00:00:00.000+03:00',
      },
    }},
    methods: {
      ...mapActions('monitor', ['getMonitorData']),
      async dispatch() {
        this.getMonitorData(this.params)
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>