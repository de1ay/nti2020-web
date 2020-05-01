<template>
    <div>
        <h1>Машины с критическими ситуациями<router-link style="margin-left: 80px;" :to="{name:'equipment'}">Назад</router-link></h1>
        <h2>Период: {{$route.query.start}} - {{$route.query.end}}</h2>
        <h2 v-if="loading">Подождите, идет постройка</h2>
        <NtiTable :columns-defs="columnsDefs" :data="dat"></NtiTable>
    </div>
</template>

<script>
    import NtiTable from "../components/NtiTable";
    import {mapActions} from "vuex";


    export default {
        name: "Critical",
        components: {
            NtiTable,
        },
        data: () => {return{
            dat: [],
            columnsDefs: [
                {
                    name: 'id',
                    title: 'Machine ID',
                    prop: 'id',
                },
                {
                    name: 'type',
                    title: 'Параметр',
                    prop: 'type'
                },
                {
                    name: 'date',
                    title: 'Когда (в последний раз)',
                    prop: 'date',
                },
                {
                    name: 'value',
                    prop: 'value',
                    title: 'Последнее превышенное значение',
                }
            ],
            loading: true,
        }},
        methods: {
            ...mapActions('monitor', ['getMonitorData']),
        },
        async mounted() {
            let mahines = 12
            for (let machine_id = 1; machine_id<=mahines; machine_id++) {
                let params = {
                    machine_id: machine_id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_temperature: 50,
                }
                let temp = await this.getMonitorData(params);
                if (temp.length > 0) {
                    this.dat.push({
                        id: machine_id,
                        type: 'Температура',
                        date: temp[temp.length - 1].date_captured,
                        value: temp[temp.length - 1].temperature,
                    })
                }

                params = {
                    machine_id: machine_id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_vibration: 1,
                }
                temp = await this.getMonitorData(params);
                if (temp.length > 0) {
                    this.dat.push({
                        id: machine_id,
                        type: 'Вибрация',
                        date: temp[temp.length - 1].date_captured,
                        value: temp[temp.length - 1].vibration,
                    })
                }

                params = {
                    machine_id: machine_id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_power: 0.75,
                }
                temp = await this.getMonitorData(params);
                if (temp.length > 0) {
                    this.dat.push({
                        id: machine_id,
                        type: 'Потребление',
                        date: temp[temp.length - 1].date_captured,
                        value: temp[temp.length - 1].power,
                    })
                }

                params = {
                    machine_id: machine_id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_system_load: 95,
                }
                temp = await this.getMonitorData(params);
                if (temp.length > 0) {
                    this.dat.push({
                        id: machine_id,
                        type: 'Нагрузка',
                        date: temp[temp.length - 1].date_captured,
                        value: temp[temp.length - 1].system_load,
                    })
                }

                params = {
                    machine_id: machine_id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_work_time: 85000,
                }
                temp = await this.getMonitorData(params);
                if (temp.length > 0) {
                    this.dat.push({
                        id: machine_id,
                        type: 'Время работы',
                        date: temp[temp.length - 1].date_captured,
                        value: temp[temp.length - 1].work_time,
                    })
                }
            }
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>