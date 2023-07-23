<template>
  <div id="app">
    <!-- 地图 -->
    <chart-view
      class="map-view"
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
export default {
  name: 'App',
  data() {
    return {
      mapOption: mapOptions.gdMapOption(), // 如果要有数据才显示,设置空对象 {}
      pieOption: pieOptions.testPie(),
      testMapList: [
        {
          name: '广州市',
          value: 12700800,
        },
        {
          name: '深圳市',
          value: 10357938,
        },
        {
          name: '珠海市',
          value: 1560229,
        },
        {
          name: '汕头市',
          value: 5391028,
        },
        {
          name: '佛山市',
          value: 7194311,
        },
        {
          name: '韶关市',
          value: 2826612,
        },
        {
          name: '河源市',
          value: 2953019,
        },
        {
          name: '梅州市',
          value: 4240139,
        },
        {
          name: '惠州市',
          value: 4597002,
        },
        {
          name: '汕尾市',
          value: 2935717,
        },
        {
          name: '东莞市',
          value: 8220237,
        },
        {
          name: '中山市',
          value: 3120884,
        },
        {
          name: '江门市',
          value: 4448871,
        },
        {
          name: '阳江市',
          value: 2421812,
        },
        {
          name: '湛江市',
          value: 6993304,
        },
        {
          name: '茂名市',
          value: 5817753,
        },
        {
          name: '肇庆市',
          value: 3918085,
        },
        {
          name: '清远市',
          value: 3698394,
        },
        {
          name: '潮州市',
          value: 2669844,
        },
        {
          name: '揭阳市',
          value: 5877025,
        },
        {
          name: '云浮市',
          value: 2360128,
        },
      ],
      testPieList:[
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接' },
          { value: 580, name: '邮箱' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ]
    }
  },
  created(){
    this.initMap()
  },
  methods: {
    initMap() {
      // 模拟请求
      setTimeout(()=>{
        // 地图
        let data = this.testMapList.map(i => ({ ...i, value: parseInt(i.value / 10000)}))
        this.mapOption = mapOptions.gdMapOption(data)
        // 饼图
        this.pieOption = pieOptions.testPie(this.testPieList)
      },3000)
    },
    // 点击获取数据
    handleMapClick(data){
      // 注意：数据没获取到时value是NAN
      console.log(data);
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