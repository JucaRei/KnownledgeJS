import Vue from 'vue'
import VueRouter from 'vue-router'
// rota entre os componentes

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

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
},{
    name: 'articlesByCategory',
    path: '/categories/:id/articles',       //pega todos os artigos a partir de determinada categoria
    component: ArticlesByCategory
},{
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

//instanciar o vue router
export default new VueRouter({
    // o modo no final da url pode ser hash também
    mode: 'history',
    routes
})
