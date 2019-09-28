<template>
	<div id="app">
		<!-- :hideToggle interpretar o valor -->
		<Header title="Projeto de aplicação dos Conhecimentos - Cod3r" :hideToggle="false"/>
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
// @ quer é a pasta raiz do projeto (src)
import Header from '@/components/template/Header'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

export default {
	name: "App",
	components: {Header, Menu, Content, Footer}
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

	#app {
		/* suaviza no momento que renderizar as fontes */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		/* ocupa a tela inteira da aplicação */
		height: 100vh;
		display: grid;
		/* 3 linhas (60px - header da aplicação, 1 frame - conteúdo da página ocupa o maximo que der, 40px - o rodapé) */
		grid-template-rows: 60px 1fr 40px;
		/* 2 colunas */
		grid-template-columns: 300px 1fr;
		/* definir as áreas e onde os componentes se encaixam, ocupar de ponta a ponta*/ 
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer";
	}
</style>