import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'  //(vuex)  import o store e associar de app Vue
import './config/bootstrap'   // carregar o arquivo de configuração
import router from './config/router'  //rotas


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')