<template>
  <div>
    <div :id="id" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import echarts from '../../../config/echartsConfig'
  export default {
    name: "base-echarts",
    props: {
      option: Object,
      id: String,
      width: {
        type: String,
        default: '700px'
      },
      height: {
        type: String,
        default: '500px'
      }
    },
    data() {
      return {

      }
    },
    methods: {
      drawLine(){
        let myChart = echarts.init(document.getElementById(this.id));

        // 绘制图表
        myChart.setOption(this.option);
      }
    },
    mounted() {
      this.drawLine();
    }
  }
</script>
