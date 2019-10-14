import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'

// import o store e associar de app Vue

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')