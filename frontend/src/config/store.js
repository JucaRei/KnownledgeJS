import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// criar dados e as funções que vão manipular os dados, as mutations
export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'mock@cod3r.com.br'
        }
    },
    mutations: {       // estado do menu (toggle)
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            // console.log('toggleMenu =' +state.isMenuVisible)
        }
    }
})