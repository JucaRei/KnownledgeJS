<template>
    <div class="user-dropdown"><!-- mostrar o dropdown -->
        <div class="user-button">  <!-- 3 elementos: nome do usuário, imagem do usuário e o icone pra mostrar que esta usando dropdown -->
            <span class="d-none d-sm-block">{{ user.name }}</span>  <!-- Propriedades bootstrop - usuario dependendo do tamanho da tela eu não quero que apareça -->
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User" /> <!-- Avatar do usuario(store.js) -->
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <!-- itens -->
        <div class="user-dropdown-content">
            <!-- link router , ao clicar em administração ele vai pra pagina-->
            <router-link to="/admin">
                <i class="fa fa-cogs">Administração</i>
            </router-link>
            <a href><i class="fa fa-sign-out">Sair</i></a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    // poder usar dentro do template
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0 20px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    /* arrumando imagem  */
    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }

    /* conteudo  */
    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        /* sombreamento */
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        /* possa aparecer na frente de outras coisas */
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* começa escondido */
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;

    }
        /* mostrar quando fazer um hover */
    .user-dropdown:hover .user-dropdown-content {
            visibility: visible;
            opacity: 1;
    }
    /* tirar o azul dos links */
    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 7px;
    }

    /* ao fazer um hover emcima do componente ele muda o background */
    .user-dropdown-content a:hover {
        text-decoration: none;
        color: #000;
        background-color: rgba(95, 99, 93, 0.185);
    }

</style>