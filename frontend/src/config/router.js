import Vue from 'vue'
import VueRouter from 'vue-router'
// rota entre os componentes

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

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
    component: AdminPages,
    // propriedade, se não for admin, não consegue acessar a rota
    meta: { requiresAdmin: true }
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

const router = new VueRouter({
    // o modo no final da url pode ser hash também
    mode: 'history',
    routes
})

// evento que vai ser chamado sempre que for navegar de uma rota pra outra
router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)      // pega o json que esta no localStorage

    //se requer que o usuário seja administrador
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)   //Parse
        user && user.admin ? next() : next({ path: '/'})   // verifica se usuário esta setado e se é administrador, se for ele vai pro proximo
    } else {
        next()
    }
})

//instanciar o vue router
export default router