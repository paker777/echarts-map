<template>
  <div id="app">
    <!-- 地图 -->
    <chart-view
      class="map-view"
      ref="MapView"
      id="MapView"
      :option="mapOption"
      height="650px"
      width="650px"
      @click="handleMapClick" 
    />

    <!-- 饼图测试 -->
    <chart-view
      class="pie-view"
      :option="pieOption"
      height="650px"
      width="650px"
    />
  </div>
</template>

<script>

import mapOptions from '@/components/Chart/options/map/index'
import pieOptions from '@/components/Chart/options/pie/index'
import { testMapList, gdList, gzMapList, testPieList } from '@/data/index'
import gdMapJson from '@/assets/map/gd.json' 
export default {
  name: 'App',
  data() {
    return {
      mapOption: mapOptions.gdMapOption(), // 如果要有数据才显示,设置空对象 {}
      pieOption: pieOptions.testPie(),
      testMapList,
      testPieList,
    }
  },
  mounted(){
    this.initMap()
  },
  methods: {
    initMap() { 
      // 调用showLoading方法
      this.$refs.MapView.chart.showLoading()
      // 模拟请求
      setTimeout(()=>{
        // 地图
        let data = this.testMapList.map(i => ({ ...i, value: parseInt(i.value / 10000)}))
        // setOption前隐藏loading事件 
        this.$refs.MapView.chart.hideLoading();
        this.mapOption = mapOptions.gdMapOption(data)
        // 饼图
        this.pieOption = pieOptions.testPie(this.testPieList)
      },2000)
    },
    // 点击获取数据
    handleMapClick(params){
      gdList.forEach((item) => {
        params.name === item.name && this.renderMap(item)
      })
      
      // 点击标题返回省地图
      if (params.componentType === 'title') { // 确认点击部分为title
        // 替换数据
        let data = this.testMapList.map(i => ({ ...i, value: parseInt(i.value / 10000)}))
        this.$echarts.registerMap('gd', gdMapJson)
        this.mapOption = mapOptions.gdMapOption(data)
        this.mapOption.title.text = `广东省人口统计地图(2010)`
      }
    },
    // 地图下钻渲染
    async renderMap(params) {
      fetch(params.url).then(async(res) => {
        // 获取在线地图json数据
        const json = await res.json()
        // 获取请求添加数据
        setTimeout(() => {
          let data = []
          // 模拟对后端发送对应的字段获取数据 例如 广州 guangzhou
          if(params.shorthand === 'guangzhou'){
            data = gzMapList.map(i => ({ ...i, value: parseInt(i.value / 10000)}))
          }
          this.$echarts.registerMap('gd', JSON.stringify(json))
          this.mapOption = mapOptions.gdMapOption(data)
          this.mapOption.title.text = `${params.name}人口统计地图(2010)`
          this.mapOption.title.triggerEvent = true  // 下钻后允许点击标题返回
        })
      })
    }
  }
}
</script>

<style>
#app{
  display: flex;
  justify-content: center;
}
</style>