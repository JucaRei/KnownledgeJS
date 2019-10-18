// quando for pra produção substitui a api pelo endereço da produção
export const baseApiUrl = 'http://localhost:3000'

// quando tiver um catch exibir a mensagem de erro para o usuário
import Vue from 'vue'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })      // erro generico passando uma mensagem
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ mgs : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError }