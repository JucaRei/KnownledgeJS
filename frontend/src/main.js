import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/msgs'
import store from './config/store'  //(vuex)  import o store e associar de app Vue
import './config/bootstrap'   // carregar o arquivo de configuração
import router from './config/router'  //rotas


Vue.config.productionTip = false

// TEMPORÁRIO! (token no header na requisição) (qualquer requisição que o axios fizer dentro do sistema, autmoticamente tera uma header Autorization)
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcxMjcwNzA4LCJleHAiOjE1NzE1Mjk5MDh9.cp0o2KESIme9Cgh0Sngl7a2ZdiwhZ_Ys4w1YJKZjq2Q'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')