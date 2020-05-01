<template>
    <Plotly v-if="ActiveData" :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
</template>

<script>
    import { Plotly } from 'vue-plotly'
    import { mapState } from 'vuex';

    export default {
        name: "TemperatureGraph",
        components: {
            Plotly,
        },
        data: () => {return{
            layout:{
                title: "График температуры",
                shapes: [
                    {
                        type: 'line',
                        xref: 'paper',
                        x0: 0,
                        y0: 45,
                        x1: 1,
                        y1: 45,
                        line:{
                            color: 'rgb(255, 100, 0)',
                            width: 4,
                            dash:'dot'
                        }
                    },
                    {
                        type: 'line',
                        xref: 'paper',
                        x0: 0,
                        y0: 50,
                        x1: 1,
                        y1: 50,
                        line:{
                            color: 'rgb(255, 0, 0)',
                            width: 4,
                            dash:'dot'
                        }
                    }
                ]
            },
        }},
        computed: {
            ...mapState('monitor', ['ActiveData']),
            data() {if (this.ActiveData) {return[{
                x: this.ActiveData.map(a => a.date_captured),
                y: this.ActiveData.map(a => a.temperature),
                type: 'scatter',
            }]
            }}
        }
    }
</script>

<style scoped>

</style>