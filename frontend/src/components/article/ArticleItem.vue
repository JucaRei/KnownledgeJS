<template>
  <div class="article-item">
      <!-- todo item será um link/ id como parâmetro para articleById -->
    <router-link :to="{ name: 'articleById', params: { id: article.id } }">
        <!-- se a imagem for muito pequena (disp móveis), ela some, exibe a partir de sm -->
        <div class="article-item-image d-none d-sm-block">
            <!-- exibe se o artigo image Url estiver setado /  lembrando que o : significa que é interpretado -->
            <img v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150" alt="Article">
            <!-- caso a imagem não esteja setada, exibe a imagem padrão -->
            <img v-else src="@/assets/article.png" height="150" width="150" alt="Article">
        </div>
        <!-- parte específica que é informação do arquivo -->
        <div class="article-item-info">
            <h2>{{ article.name }}</h2>
            <p>{{ article.description }}</p>
            <span class="article-item-author">
                <strong>Autor: </strong>{{ article.author }}
            </span>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['article']
}
</script>

<style>
.article-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }
    .article-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }
    .article-item-info h2 {
        font-size: 1.7rem;
    }
    .article-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }
    /* borda na imagem */
    .article-item-image img {
        border-radius: 6px;
    }
    .article-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }
    /* crescer o p */
    .article-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>