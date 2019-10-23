<template>
  <div class="article-by-category">
    <PageTitle icon="fa fa-folder-open" :main="category.name" sub="Categoria" />
    <ul>
        <!-- key é uma chave única -->
        <li v-for="article in articles" :key="article.id" >
            {{ article.name }}
        </li>
    </ul>
    <div class="load-more">
        <button v-if="loadMore" class="btn btn-lg btn-outline-info"
        @click="getArticles">
            Carregar Mais Artigos ...
        </button>
    </div>
  </div>
</template>

<script>
/* Navegação de Categorias e Artigos no navbar
 */
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle },
  data: function() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true // Botão para carregar mais artigos
    };
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      // axios executa essa requisição
      axios(url).then(res => (this.category = res.data))
    },
    getArticles(){
        const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
        axios(url).then(res => {
            this.articles = this.articles.concat(res.data)      // concat, para não substituir quando apertar o loadmore e sim acrescentar mais artigos
            this.page++

            if(res.data.length === 0) this.loadMore = false         // se não tiver mais dados, não aparece o loadmore
        })
    }
  }, //montar o componente para exibir na tela
  mounted() {
    //   console.log(this.$route.params.id)
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  }
};
</script>

<style>
    .article-by-category ul{
        list-style-type: none;
        padding: 0px;
    }

    .article-by-category .load-more{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>