<template>
    <Plotly v-if="ActiveData" :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
</template>

<script>
    import { Plotly } from 'vue-plotly'
    import { mapState } from 'vuex';

    export default {
        name: "VibrationGraph",
        components: {
            Plotly,
        },
        data: () => {return{
            layout:{
                title: "График вибраций",
                shapes: [
                    {
                        type: 'line',
                        xref: 'paper',
                        x0: 0,
                        y0: 0.75,
                        x1: 1,
                        y1: 0.75,
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
                        y0: 1,
                        x1: 1,
                        y1: 1,
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
                y: this.ActiveData.map(a => a.vibration),
                type: 'scatter',
            }]
            }}
        }
    }
</script>

<style scoped>

</style>