<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
// importar uma função dentro do vuex, mapear um atributo da store dentro do componente
import { mapState } from 'vuex'

export default {
  name: "Menu",
  computed: mapState(['isMenuVisible'])
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, rgba(38, 38, 39, 0.9), #193335);

  display: flex;
  /* direção na coluna */
  flex-direction: column;
  /* permitir quebra de linha */
  flex-wrap: wrap;
}
</style>