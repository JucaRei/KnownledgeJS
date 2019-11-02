<template>
  <footer class="footer">
    <span>
      Copyright
      <strong>Juca</strong> © 2019-2022
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  /* alinhar do lado direito da tela */
  justify-content: flex-end;
  padding-right: 10px;
}
</style>