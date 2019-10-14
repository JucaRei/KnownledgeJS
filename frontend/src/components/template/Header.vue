<template>
  <header class="header">
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
          <!-- font-awesome, propriedade disponivel dentro do componente -->
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <!-- referenciando o title de app.vue -->
      <h1 class="title">
          {{ title }}
      </h1>
  </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
        // toogle não vai aparecer
        hideToggle: Boolean
    },
    // icone toggle do font awesome
    computed: {
        icon() {
            // return "fa-angle-left"
            // alternando o icone (um animação simple, de quando mostra ou não o menu)
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    // clicando no icone chama a função
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')    // acessa a store e comita essa alteração
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, rgb(71, 29, 143), rgb(125, 49, 145));

        display: flex;
        /* display flex por padrão ele é na linha(row), justificando o conteudo na linha */
        justify-content: center;
        align-items: center
    }

    .title {
        font-size: 1.2rem;
        color: rgb(138, 255, 255);
        /* fonte ficar mais fina */
        font-weight: 100;
        /* título possa crescer dentro do flex-container */
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        /* tirar a cor dos links padrão que é azul */
        color: #FFF;
        /* quando colocar o mouse por cima não ficar com nenhuma cara de link */
        text-decoration: none;
    }

    /* estilo do toogleMenu */
    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: rgb(253, 249, 0);
        justify-self: self-start;
        text-decoration: none;

        /* centralizar o icone */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* hover ao passar o mouse em cima do toggle */
    header.header > a.toggle:hover {
        background-color: rgba(51, 48, 48, 0.733)
    }
</style>