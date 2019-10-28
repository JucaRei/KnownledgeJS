<template>
  <div class="auth-content">
    <!-- parecer um modal, que vai ter o formulário -->
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr>
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login'}}</div>
      <!-- input que só será exibido no cadastro -->
      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome" />
      <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
      <input v-model="user.password" name="password" type="password" placeholder="Senha" />
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirme a senha"
      />
      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>

      <!-- link que fica alterando o valor showsignup de falso para verdadeiro -->
      <!-- click prevent - previnir o comportamento padrão   -->
      <a href @click.prevent="showSignup = !showSignup">
          <span v-if="showSignup">Já tem cadastro? Faça o login!</span>
          <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
// vai servir tanto, para tela de cadastro, quanto para a de login

import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      // atributo, que vai servir como flag, para ficar alternando, entre a tela de cadastro e a tela de login
      showSignup: false, // falso - mostra o login, verdadeiro - mostra o signup
      user: {}
    };
  }, // metodos para logar
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user) // exatamento o usuário que vai enviar o post, para fazer o login do usuário
        .then(res => {
          // pega a resposta e seta tanto na store, quanto no local storage
          this.$store.commit("setUser", res.data); // pega o resultado da requisição e seta o usuário
          localStorage.setItem(userKey, JSON.stringify(res.data)); // salvar no localStorage, mas lá é salvo como string (por isso o stringfy)
          this.$router.push({ path: "/" }); // uma vez logado vai para a raiz da aplicação
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          // feito o cadastro, aparece cadastro realizado com sucesso
          this.$toasted.global.defaultSucess();
          this.user = {};
          this.showSignup = false; // cadastro foi completado, automaticamente muda pra tela de login
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  /* centralizar esse modal dentro da tela */
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background: #fff;
  width: 350px;
  /* padding interno, para os elementos não ficarem grudados nas laterais */
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title{
    font-size: 1.3rem;
    font-weight: 100;
    margin-top: 8px;
    margin-bottom: 15px;
}

.auth-modal input{
    border: 1px solid #BBB;
    width: 100%;
    margin-bottom: 12px;
    /* espaçamento tambem em relação ao texto interno */
    padding: 3px;
    /* tirar linha azul ao clicar */
    outline: none;
}

.auth-modal button{
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    /* aumentando o tamanho do botão */
    padding: 5px 15px;
    border-color: rgb(0, 0, 0, 0.1);
    border-radius: 5%;
    margin-top: 5px;
}

.auth-modal a{
    margin-top: 25px;
}

.auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>