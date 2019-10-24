<template>
  <aside class="menu" v-show="isMenuVisible">
    <!-- filtro -->
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder="digite para filtrar..."
        v-model="treeFilter" class="filter-field">
    </div>
    <!-- referência do componente tree / ref referenciar a arvore -->
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" />
  </aside>
</template>

<script>
// importar uma função dentro do vuex, mapear um atributo da store dentro do componente
import { mapState } from "vuex";
// arvore de categorias com artigos
import Tree from "liquor-tree";
// acessar o backend
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data: function() {
    return {
      treeFilter: '',
      // renderiza a árvore
      treeData: this.getTreeData(),
      // mudar o nome do campo que será exibido na árvore
      treeOptions: {
        // treeOptions espera receber uma propriedade chamada text e não name
        propertyNames: { text: "name" },
        filter: {
        // quando fizer uma pesquisa e o resultado for vazio
          emptyText: 'Categoria não encontrada'
        }
      }
    };
  },
  // obter dados da árvore
  methods: {
    getTreeData() {
      // trazer as categorias num formato de árvore
      const url = `${baseApiUrl}/categories/tree`;
      // retorna uma promise
      return axios.get(url).then(res => res.data);
    },
    onNodeSelect(node) {   // pegar o id do node e setar a rota, que diz respeito ao id da categoria
      // adicionar uma nova rota no router
      this.$router.push({
        name: 'articlesByCategory',
        // id da categoria é o mesmo id do nó
        params: { id: node.id }
      })
    }
  },
  mounted() {
    // refs acessar a referência de algum elemento que esta dentro do template, on é vincular o evento
    this.$refs.tree.$on('node:selected', this.onNodeSelect) // para cada evento da árvore vai ser vinculado o evento nodeSelected, e automaticamente chama a função nodeSelectd
  }
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

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

/* tree node é uma classe criada pela árvore */
.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
/* deixar a seta mais viva */
.tree-arrow.has-child {
  filter: brightness(2);
}
.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}
.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}
.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
  margin-left: 20px;
}
</style>