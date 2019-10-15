import Vue from 'vue'
import VueRouter from 'vue-router'
// rota entre os componentes

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'


//registrar o vue router dentro do vue
Vue.use(VueRouter)

//Rotas
const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}]

//instanciar o vue router
export default new VueRouter({
    // o modo no final da url pode ser hash também
    mode: 'history',
    routes
})
