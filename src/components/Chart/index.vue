<template>
  <div ref="chart" :style="{ height, width }" />
</template>
<script>
// 参考 https://juejin.cn/post/6995518429952212999?searchId=20230723070041D608BEDF797BBACDBF9B#heading-13
import * as echarts from 'echarts'
export default {
  name: 'ChartView',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: { // 自适应
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      handler(newVal) {
        this.setOptions(newVal)
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      window.addEventListener('resize', this.chart.resize)
    }
  },
  // 销毁前清除
  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener('resize', this.chart.resize)
    }
    this.chart.dispose()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
      // 添加点击事件传递给父组件
      this.chart.on('click', this.handleClick)
    },
    handleClick(params) {
      this.$emit('click', params)
    },
    // 设置配置
    setOptions(option) {
      this.clearChart()
      this.chart.resize()
      if (this.chart) {
        this.chart.setOption(option)
      }
    },
    // 刷新
    refresh() {
      this.setOptions(this.option)
    },
    // 清除
    clearChart() {
      this.chart && this.chart.clear()
    }
  }
}
</script>
