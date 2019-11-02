<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <!-- classe css, se o menu não estiver visivel ou não tiver usuário, aplica automaticamente esse classe CSS-->
    <!-- :hideToggle interpretar o valor -->
    <Header
      title="Projeto de aplicação dos Conhecimentos - Cod3r"
      :hideToggle="!user"
      :hideUserDropdown="!user"
    />
    <!-- se não tiver usuário, esconde o toggle e o dropdown -->
    <Menu v-if="user" />
    <!-- Exibe o menu apenas se o usuário estiver logado-->
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
// importar o axios porque, vou validar o token no backend
import axios from "axios";
// userKey interagir que esta dentro do local storage
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";
// @ quer é a pasta raiz do projeto (src)
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Loading from "@/components/template/Loading";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]), //menu e usuário
  data: function() {
    // flag que vai dizer se está ou não validando o token, se der ok ele vai pra tela, senão volta pro login
    return {
      validatingToken: true
    };
  },
  methods: {
    // validar token
    async validateToken() {
      this.validatingToken = true;

      // pega o json que esta armazenado no local storage
      const json = localStorage.getItem(userKey);
      // se estiver setado transforma em dados do usuário
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null); // default o usuário é null

      // estando ok, seta o user na store
      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);

        // Vue MQ
        if (this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false); // se for dispositivo pequeno, fecha o menu automaticamente
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    }
  },
  // estando ok, seta o user na store
  created() {
    this.validateToken();
  }
};
</script>

<style>
/* fonte referenciada dentro de public/index.html */

* {
  font-family: "Lato", sans-serif;
}

body {
  /* tirar a margem padrão, para ocupar a pagina inteira */
  margin: 0;
}

/* id - app */
#app {
  /* suaviza no momento que renderizar as fontes */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* ocupa a tela inteira da aplicação */
  height: 100vh;
  display: grid;
  /* 3 linhas (60px - header da aplicação, 1 frame - conteúdo da página ocupa o maximo que der, 40px - o rodapé) */
  grid-template-rows: 60px 1fr 40px;
  /* 2 colunas, 300px - é onde vai ficar o menu da aplicação, e o 1fr o conteúdo da aplicação */
  grid-template-columns: 300px 1fr;
  /* definir as áreas e onde os componentes se encaixam, 1 linha o header - ocupar de ponta a ponta,
	2 linha o menu do lado esquerdo e o conteúdo do lado direito, e
	3 linha tem o menu com o footer*/
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

/* id app classe hide-menu */
#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
  /* define as areas - consegue esconder o menu da aplicação sem o sombreamento da area do menu*/
}
</style>