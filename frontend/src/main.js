import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/msgs'
import store from './config/store'  //(vuex)  import o store e associar de app Vue
import './config/bootstrap'   // carregar o arquivo de configuração
import router from './config/router'  //rotas
import './config/axios'
import './config/mq'

Vue.config.productionTip = false

// TEMPORÁRIO! (token no header na requisição) (qualquer requisição que o axios fizer dentro do sistema, autmoticamente tera uma header Autorization)
// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imp1Y2EiLCJlbWFpbCI6Imp1Y2FAdGVzdC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcyMDE1OTI1LCJleHAiOjE1NzIyNzUxMjV9.LWRWSgKLp4CWIMzpKfFiQRh50UKfF9aLWxBCqZlxPPE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')