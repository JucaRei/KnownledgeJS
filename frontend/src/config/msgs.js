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
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

//erro
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)