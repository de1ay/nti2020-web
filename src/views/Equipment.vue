<template>
  <div class="equipment">
    <h1>Оборудование тест</h1>
    <span>Дата начала</span><datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.min_date_captured"></datetime>
    <span>Дата конца</span> <datetime value-zone="local" :minute-step="15" type="datetime" v-model="params.max_date_captured"></datetime>
    <button v-on:click="dispatch">Загрузить</button>
    <Plotly :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
  </div>
</template>

<script>
  import { Plotly } from 'vue-plotly'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import {mapActions, mapState} from "vuex";

  export default {
    components: {
      Datetime,
      Plotly,
    },
    name: 'Equipment',
    data: () => {return{
      params: {
        machine_id: 1,
        min_date_captured: '2020-03-01T00:00:00.000+03:00',
        max_date_captured: '2020-03-02T00:00:00.000+03:00',
      },
      layout:{
        title: "График тест"
      },
    }},
    methods: {
      ...mapActions('monitor', ['getMonitorData']),
      async dispatch() {
        this.getMonitorData(this.params)
      }
    },
    computed: {
      ...mapState('monitor', ['ActiveData']),
      data() {if (this.ActiveData) {return[{
          x: this.ActiveData.map(a => a.date_captured),
          y: this.ActiveData.map(a => a.temperature),
          type: 'scatter',
        }]
      }}
    }
  };
</script>

<style lang="scss" scoped>

</style>