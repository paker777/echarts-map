import * as echarts from 'echarts'
import geoJson from '@/assets/map/gd.json'

// 数据来自阿里云可视化平台 http://datav.aliyun.com/portal/school/atlas/area_selector
// 封装参考 https://juejin.cn/post/6995518429952212999?searchId=20230723070041D608BEDF797BBACDBF9B#heading-13
const gdMapOption = (data = []) => {
  // 加载地图数据
  if (!echarts.getMap('gd')) {
    echarts.registerMap('gd', geoJson)
  }

  let cityMap = data.length ? Math.max(...data.map(i=>i.value)) : 0
  let option = {
    title: {
      text: '广东省人口统计地图(2010)',
      subtext: '注意：点击标题返回省级地图',
      triggerEvent: false  // 点击可触发事件
    },
    tooltip: { 
      show: data.length,
      trigger: 'item',
      // formatter: '{b}<br/>约{c}万人',
      formatter: function(data) {
        return `${data.name }<br/>约${parseInt(data.value)}万人`;
      },
    },
    visualMap: {
      min: 0,
      max: cityMap,
      formatter: function(value) {
        return parseInt(value) + '万'; // 在这里添加单位
      },
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#aacbfc', '#367bff']
      }
    },
    series: [
      {
        name: '广东地图',
        type: 'map',
        mapType: 'gd',
        // roam: true, //支持拖拽缩放
        // scaleLimit: {
        //   //滚轮缩放的极限控制
        //   min: 0.8, //缩放最小大小
        //   max: 1.5, //缩放最大大小
        // },
        label: { // 设置文字
          show: true,
          fontSize: 12,
          borderRadius: 3,
          emphasis: {
            color: '#fff',  // 设置鼠标移入文字颜色
          },
          textStyle: { 
            color: '#fff',
            padding: 3,
            backgroundColor: '#8db5fd', // 设置文字背景颜色
            borderColor: '#fff',  // 设置地图文字边框颜色
            borderWidth: 0.2
          }
        },
        itemStyle: { //设置背景
          areaColor: '#a1c4fc',  // 设置地图背景颜色
          emphasis: {
            areaColor: '#367bff',  // 设置鼠标移入背景颜色
          },
          borderColor: '#367bff',  // 设置地图边框颜色
          normal: {
            borderColor: "rgba(0,63,140,0.2)",
            shadowColor: "rgba(0,63,140,0.2)",
            shadowOffsetX: 2,
            shadowBlur: 2,
          },
        },
        data
      }
    ]
  }

  return Object.assign({}, option)
}

export default {
  gdMapOption
}