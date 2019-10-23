<template>
    <div class="home">
        <PageTitle icon="fa fa-tachometer" main="Dashboard" sub="Base de Conhecimento" />
        <!-- icones stats da aplicação -->
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories"
            icon="fa fa-database" color="#db100d" />
            <Stat title="Artigos" :value="stat.articles"
            icon="fa fa-file-text" color="#5620e8" />
            <Stat title="Usuários" :value="stat.users"
            icon="fa fa-users" color="#9d0ddb" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'    //importa o axios porque faz uma requisição para o backend
import { baseApiUrl } from '@/global'    // importar o global para fazer as requisições

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    //precisa de um estado interno (lembrando: data no contexto de componente no vue ele é uma função, que retorna um objeto)
    data: function() {
        return {
            // retorna a quantidade de usuários, categorias, artigos
            stat: {}
        }
    },
    methods: {
        // onde de fato faz a requisição pro backend
        getStats(){
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)  // setado para retornar os valores no data
            // exatamente a url definida para voltar as estatísticas no sistema
        }
    }, // mounted - assim que o componente for montado ele, faz a requisição
    mounted() {
        this.getStats()
    }
}
</script>

<style>

    .stats {
        display: flex;
        /* cada item ocupa seu canto */
        justify-content: space-between;
        /* quebra se ele não conseguir renderizar todos os componentes na mesma linha */
        flex-wrap: wrap;
    }
</style>
