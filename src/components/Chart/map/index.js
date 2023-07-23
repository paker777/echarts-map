import * as echarts from 'echarts'
import geoJson from '@/assets/map/GD.json'
// 数据来自阿里云可视化平台 http://datav.aliyun.com/portal/school/atlas/area_selector
// 封装参考 https://juejin.cn/post/6995518429952212999?searchId=20230723070041D608BEDF797BBACDBF9B#heading-13
const gdMapOption = (data = []) => {
  // 加载地图数据
  if (!echarts.getMap('GD')) {
    echarts.registerMap('GD', geoJson)
  }

  let option = {
    title: {
      text: '广东省人口统计地图(2010)',
      subtext: '数据来自百度百科',
      sublink:
        'https://baike.baidu.com/item/%E5%B9%BF%E4%B8%9C%E7%9C%812010%E5%B9%B4%E7%AC%AC%E5%85%AD%E6%AC%A1%E5%85%A8%E5%9B%BD%E4%BA%BA%E5%8F%A3%E6%99%AE%E6%9F%A5%E4%B8%BB%E8%A6%81%E6%95%B0%E6%8D%AE%E5%85%AC%E6%8A%A5/15888662?fromModule=search-result_lemma-recommend'
    },
    tooltip: { 
      show: data.length,
      trigger: 'item',
      // formatter: '{b}<br/>约{c}万人',
      formatter: function(data) {
        return `${data.name }<br/>约${parseInt(data.value)}万人`;
      },
    },
    geo:{
      map: 'GD',
      itemStyle: { //设置背景
        normal: {
          borderColor: "rgba(0,63,140,0.2)",
          shadowColor: "rgba(0,63,140,0.2)",
          shadowOffsetX: 10,
          shadowBlur: 2,
        },
      }
    },
    visualMap: {
      min: 0,
      max: 2000,
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
        mapType: 'GD',
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