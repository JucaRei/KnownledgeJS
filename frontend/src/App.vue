<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">	<!-- classe css, se o menu não estiver visivel aplica altomaticamente esse classe CSS-->
		<!-- :hideToggle interpretar o valor -->
		<Header title="Projeto de aplicação dos Conhecimentos - Cod3r" :hideToggle="false"/>
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'
// @ quer é a pasta raiz do projeto (src)
import Header from '@/components/template/Header'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

export default {
	name: "App",
	components: {Header, Menu, Content, Footer},
	computed: mapState(['isMenuVisible'])
}
</script>

<style>
	* {
		/* fonte referenciada dentro de public/index.html */
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
	#app.hide-menu{
		grid-template-areas:
			"header header"
			"content content"
			"footer footer"
		/* define as areas - consegue esconder o menu da aplicação sem o sombreamento da area do menu*/
	}
</style>