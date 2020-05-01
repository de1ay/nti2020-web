<template>
    <section class="t-system">
        <div class="container">
            <div class="t-system__inner">
                <div class="t-system__header">
                    <span class="title">
                        Система телеметрии
                    </span>
                        <button class="nti-button"
                             v-on:click="dispatch_add_user_in_group()">
                            Подписатся на уведомления
                        </button>
                </div>
                <div class="device-container">
                    <div v-for="machine in LastData" :key="machine.machine_id" class="device">
                        <p class="device__title">
                            Машина {{machine.machine_id}}
                        </p>
                        <hr class="hr">
                        <div class="info-blocks">
                            <div class="info-block">
                                <span class="block__parameter">
                                    Температура:
                                </span>
                                <span class="block__info" :style="{color: (machine.temperature > 50) ? (machine.temperature > 45) ? 'red': 'orange': 'green'}">
                                    {{machine.temperature}}°C
                                </span>
                            </div>
                            <div class="info-block">
                                <span class="block__parameter">
                                    Уровень вибрации:
                                </span>
                                <span class="block__info" :style="{color: (machine.vibration > 0.75) ? (machine.vibration > 1) ? 'red': 'orange': 'green'}">
                                    {{machine.vibration}} м/с2
                                </span>
                            </div>
                            <div class="info-block">
                                <span class="block__parameter">
                                    Потребление:
                                </span>
                                <span class="block__info" :style="{color: (machine.power > 0.65) ? (machine.power > 0.7) ? 'red': 'orange': 'green'}">
                                    {{machine.power}} КВатт
                                </span>
                            </div>
                            <div class="info-block">
                                <span class="block__parameter">
                                    Загрузка системы:
                                </span>
                                <span class="block__info" :style="{color: (machine.system_load > 80) ? (machine.system_load > 95) ? 'red': 'orange': 'green'}">
                                    {{machine.system_load}} %
                                </span>
                            </div>
                            <div class="info-block">
                                <span class="block__parameter">
                                    Время работы:
                                </span>
                                <span class="block__info" :style="{color: (machine.work_time > 70000) ? (machine.work_time > 85000) ? 'red': 'orange': 'green'}">
                                    {{machine.work_time}} Часов
                                </span>
                            </div>
                            <div class="info-block">
                                <span class="block__parameter">
                                    Последнее обновление:
                                </span>
                                <span class="block__info">
                                    {{machine.date_captured}}
                                </span>
                            </div>
                            <router-link class="nti-button"
                                    :to="{name: 'equipment-page', params: {id: machine.machine_id}}">
                                Подробнее
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="t-system__header"><h1>Построение отчетов</h1></div>
                <h1>
                    <br/>
                    <span>Дата начала</span><datetime value-zone="local" :minute-step="15" type="datetime" v-model="start"></datetime>
                    <span>Дата конца</span> <datetime value-zone="local" :minute-step="15" type="datetime" v-model="end"></datetime>
                    <br/>
                    <router-link :to="{name: 'machines-with-warnings', query: {start: start, end: end}}">Построение отчета о предупреждениях по всем машинам</router-link>
                    <br/>
                    <br/>
                    <router-link :to="{name: 'machines-with-critical', query: {start: start, end: end}}">Построение отчета о критических ситуациях по всем машинам</router-link>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </h1>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import axios from 'axios';
    import {Datetime} from "vue-datetime";

    export default {
        name: "Dashboard",
        components: {
            Datetime,
        },
        data: () => {return{
            start: '2020-03-01T00:00:00.000+03:00',
            end:   '2020-03-31T23:59:00.000+03:00',
        }},
        methods: {
            ...mapActions('monitor', ['getLastData']),
            async dispatch_add_user_in_group() {
                await axios({
                    url: '/mon/receive/',
                    method: 'POST',
                    data: {
                        user: this.me.id
                    }
                }).then(async resp => {
                    if (resp.data.error !== undefined) {
                        alert(data.user);
                        return Promise.reject(resp.data.error);
                    }
                    alert('Успешно подписались!');
                    return Promise.resolve(resp.data);
                }).catch(err => {
                    const data = err.response.data;
                    if (data.detail) {
                        alert(data.detail);
                        return Promise.reject(data.detail);
                    }
                    alert('Вы уже подписаны!');
                    return Promise.reject(data);
                });
            }
        },
        computed: {
            ...mapState('monitor', ['LastData']),
            ...mapState('session', {me: 'user'}),
        },
        created() {
            this.getLastData()
        }
    }
</script>

<style scoped>
    @import '../assets/css/header.css';
    /* t-system */
    .t-system{
        padding-top: 80px;
        width: 100%;
        height: 100vh;
    }

    .t-system__inner{
        width: 100%;
    }


    .t-system__header {
        width: 100%;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border-radius: 20px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .title {
        width: 100%;
        font-size: 18px;
        text-align: center;
    }

    .device-container{
        width: 100%;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .device{
        width: 30%;
        background: white;
        border-radius: 20px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        margin: 10px;
    }


    .order {
        min-height: 10px;
        margin: 10px 0;
        width: 90%;
        padding: 10px 0;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .device__title {
        width: 100%;
        font-size: 15px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hr {
        margin: 0;
        background-color: black;
        color: #000000;
        width: 100%;
    }

    .info-blocks {
        widows: 100%;
    }

    .info-block {
        width: 100%;
        margin: 10px 0;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
    }

    .block__parameter {
        color: #727272;
        width: 200px;
        font-size: 16px;
    }

    .block__info {
        width: 90%;
        text-align: justify;
        font-size: 16px;
    }
</style>