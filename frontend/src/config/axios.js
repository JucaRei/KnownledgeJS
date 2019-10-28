import axios from 'axios'

const success = res => res
const error = err => {
    if (401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)

// import axios from 'axios'
// /* função que serão aplicadas sempre que acontecer um sucesso ou um erro (interceptar de forma generica)*/

// const success = res => res
// const error = err => {
//     if (401 === err.response.status) {
//         window.location = '/'    // via javascript ele vai mandar pra raiz
//     } else {
//         return Promise.reject(err)
//     }
// }

// //cadastrar para o axios usar
// axios.interceptors.response.use(success, error)