<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        <!-- v-html para que o conteúdo seja renderizado de forma correta -->
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
// aplicar estilo no codigo do artigo
import 'highlightjs/styles/darcula.css'
// biblioteca do highlight
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data: function() {
        return {
            article: {},
        }
    },
    mounted() {
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    // quando um componente for feito um update
    updated() {
        // usando JS, selecionando todas as tags 'pre', e aplica essa biblioteca (highlighr)
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e =>{
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-content{
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    /* codigos serão exibidos dentro do pre */
    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: darkorchid
    }

    /* restrição de imagem dentro do conteúdo do artigo */
    .article-content img{
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>