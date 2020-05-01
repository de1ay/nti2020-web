<template>
    <div>
        <h1>Отчет о нештатных ситуациях по машине {{$route.params.id}}<router-link style="margin-left: 80px;" :to="{name:'equipment'}">Назад</router-link></h1>
        <h2>Период: {{$route.query.start}} - {{$route.query.end}}</h2>
        <NtiTable :columns-defs="columnsDefs" :data="dat"></NtiTable>
    </div>
</template>

<script>
    import NtiTable from "../components/NtiTable";
    import {mapActions} from "vuex";


    export default {
        name: "Alerts",
        components: {
            NtiTable,
        },
        data: () => {return{
            dat: [],
            columnsDefs: [
                {
                    name: 'id',
                    title: 'ID',
                    prop: 'id',
                },
                {
                    name: 'date_captured',
                    title: 'Время снятия',
                    prop: 'date_captured'
                },
                {
                    name: 'temperature',
                    title: 'Температура',
                    prop: 'temperature',
                },
                {
                    name: 'vibration',
                    prop: 'vibration',
                    title: 'Вибрация',
                },
                {
                    name: 'power',
                    prop: 'power',
                    title: 'Потребление',
                },
                {
                    name: 'system_load',
                    prop: 'system_load',
                    title: 'Загрузка',
                },
                {
                    name: 'work_time',
                    prop: 'work_time',
                    title: 'Время работы',
                },
                {
                    name: 'type',
                    prop: 'type',
                    title: 'Тип уведомления',
                },
                {
                    name: 'date_received',
                    title: 'Время получения',
                    prop: 'date_received',
                },
            ]
        }},
        methods: {
            ...mapActions('monitor', ['getMonitorData']),
        },
        async mounted() {
            let params = {
                machine_id: this.$route.params.id,
                    min_date_captured: this.$route.query.start,
                    max_date_captured: this.$route.query.end,
                    min_temperature: 45,
            }
            let temp = await this.getMonitorData(params);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].temperature >= 50) {
                    temp[i].type = 'Критическая температура'
                } else {
                    temp[i].type = 'Предупреждение: температура'
                }
            }
            if (temp.length > 0) this.dat.push(...temp)

            params = {
                machine_id: this.$route.params.id,
                min_date_captured: this.$route.query.start,
                max_date_captured: this.$route.query.end,
                min_vibration: 0.75,
            }
            temp = await this.getMonitorData(params);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].vibration >= 1) {
                    temp[i].type = 'Критическая вибрация'
                } else {
                    temp[i].type = 'Предупреждение: вибрация'
                }
            }
            if (temp.length > 0) this.dat.push(...temp)

            params = {
                machine_id: this.$route.params.id,
                min_date_captured: this.$route.query.start,
                max_date_captured: this.$route.query.end,
                min_power: 0.65,
            }
            temp = await this.getMonitorData(params);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].power >= 7) {
                    temp[i].type = 'Критическое потребление'
                } else {
                    temp[i].type = 'Предупреждение: потребление'
                }
            }
            if (temp.length > 0) this.dat.push(...temp)

            params = {
                machine_id: this.$route.params.id,
                min_date_captured: this.$route.query.start,
                max_date_captured: this.$route.query.end,
                min_system_load: 80,
            }
            temp = await this.getMonitorData(params);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].system_load >= 95) {
                    temp[i].type = 'Критическая нагрузка'
                } else {
                    temp[i].type = 'Предупреждение: нагрузка'
                }
            }
            if (temp.length > 0) this.dat.push(...temp)

            params = {
                machine_id: this.$route.params.id,
                min_date_captured: this.$route.query.start,
                max_date_captured: this.$route.query.end,
                min_work_time: 70000,
            }
            temp = await this.getMonitorData(params);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].work_time >= 85000) {
                    temp[i].type = 'Критическое время работы'
                } else {
                    temp[i].type = 'Предупреждение: время работы'
                }
            }
            if (temp.length > 0) this.dat.push(...temp)
            this.dat.sort((a, b) => a.id - b.id);
        }
    }
</script>

<style scoped>

</style>