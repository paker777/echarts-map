import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

import Chart from '@/components/Chart/index.vue'
Vue.component(Chart.name, Chart)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
