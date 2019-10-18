<template>
  <div class="stat">
      <div class="stat-icon">
          <!-- style - resolve para o style computed, para resolver a cor do ícone -->
          <i :class="icon" :style="style"></i>
      </div>
      <div class="stat-info">
          <span class="stat-title">{{ title }}</span>
          <span class="stat-value">{{ value }}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    //retornar a cor que foi passada como propriedade no ícone
    computed: {
        style () {
            return "color: " + (this.color || "#000")
            // se a cor não foi setada, a padrão assume (preta)
        }
    }
}
</script>

<style>
    .stat{
        /* crescer de acordo com a necessidade */
        flex: 1;
        display: flex;
        border-radius: 8px;
        /* não ficar grudado um ao outro */
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: rgb(213, 219, 224);
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        /* sombreamento */
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat-icon{
        display: flex;
        align-items: center;
    }

    .stat-icon i{
        font-size: 4.8rem;
    }

    .stat-info{
        /* (flex: 1) componente vai crescer dentro de um flex container */
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end
    }

    .stat-title{
        font-size: 1.2rem;
    }

    .stat-value{
        font-size: 3rem;
    }

</style>