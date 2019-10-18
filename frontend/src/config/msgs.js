// vue toasted
import Vue from 'vue'
import Toasted from 'vue-toasted'


Vue.use(Toasted, {     // biblioteca de icones font awesome
    iconPack: 'fontawesome',
    duration: 3000      // dura 3 segundos
})

//mensagem padrão de sucesso ou de erro
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    // 'Operação realizada com sucesso',
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    // erro
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type: 'error', icon: 'times' }
)