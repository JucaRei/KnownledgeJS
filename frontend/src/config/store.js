import axios from 'axios'    // importa o axios para poder setar dentro dos headers do axios o Autorization
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// criar dados e as funções que vão manipular os dados, as mutations
export default new Vuex.Store({
    state: {
        isMenuVisible: false,   // por padrão o usuário começa deslogado
        user: null
    },
    mutations: {       // estado do menu (toggle)
        toggleMenu(state, isVisible) {
            // evitar que o menu aparece quando o usuário não estiver setado
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            // console.log('toggleMenu =' +state.isMenuVisible)
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`     //se o usuário foi setado, pegar o token do usuário e setar dentro do axios
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})

