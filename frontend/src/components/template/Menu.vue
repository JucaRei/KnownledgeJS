<template>
  <aside class="menu"></aside>
</template>

<script>
export default {
  name: "Menu"
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #2d3031, #255688);

  display: flex;
  /* direção na coluna */
  flex-direction: column;
  /* permitir quebra de linha */
  flex-wrap: wrap;
}
</style>