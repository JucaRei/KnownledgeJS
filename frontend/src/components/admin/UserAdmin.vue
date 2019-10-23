<template>
    <div class="user-admin">
        <b-form>
          <!-- se o usuario estiver setado -->
            <input id="user-id" type="hidden" v-model="user.id" />
            <!-- linha do formulário -->
            <b-row>
              <!-- essa linha vai ocupar 6 colunas nos dispositivos médios e 12 nos dispositivos pequenos( disp moveis) -->
                <b-col md="6" sm="12">
                  <!-- readonly se for para o modo exclusão -->
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <!-- essa linha vai ocupar 6 colunas nos dispositivos médios e 12 nos dispositivos pequenos( disp moveis) -->
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <!-- mt3 (margin top 3) bt3 (margin bottom 3) -->
            <!-- linha do formulário -->
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Usuário é Administrador?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <!-- essa linha vai ocupar 6 colunas nos dispositivos médios e 12 nos dispositivos pequenos( disp moveis) -->
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                        label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <!-- botão vai aparecer em suas próprias linhas -->
            <b-row>
                <b-col xs="12">
                    <!-- botões de ação(salvar, excluir, etc) -->
                    <!-- esse botão vai apenas estar disponivel, quando o modo for save -->
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <!-- Excluir, so aparece SE estiver com o modo remove -->
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                        <!-- Botão de resetar o formulário, (ml-2 - margin left 2) -->
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <!-- hover com tabela zebrada(striped) -->
        <b-table hover striped :items="users" :fields="fields">
          <!-- relacionado aos actions -->
            <template slot="actions" slot-scope="data">
              <!-- botões para mudar ou excluir usuario -->
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
// acessar o backend com axios
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  // lembrando que o componente data, aponta para uma função que retorna 1 objeto
  data: function() {
    return {
      mode: "save", // mode: troca entre o modo de exclusão e o modo save
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        }, // formatador para admin true or false, retorna Sim ou Não
        { key: "actions", label: "Ações" }
        // ações de alterar e excluir o usuário
      ]
    };
  },
  methods: {
    // carregar a lista de usuários do backend
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
        // console.log(this.users)
      });
    },
    //  resetar o campo
    reset() {
      this.mode = "save"; // voltar pro modo save, que é o modo padrão
      this.user = {}; // zero o usuário
      this.loadUsers();
    },
    // salvar
    save() {
      // verificar se é o metodo post ou put, verifica o id do usuário, caso o id ja esteja setado o método é put, senão post
      const method = this.user.id ? "put" : "post";
      // se ja estiver setado coloca no final da url, senão coloca vazio
      const id = this.user.id ? `/${this.user.id}` : "";
      // acessando um método a partir de uma string (post ou put)
      axios[method](`${baseApiUrl}/users${id}`, this.user) // this.user vai ser mandado pro backend
        .then(() => {
          // dando certo manda uma mensagem de sucesso
          this.$toasted.global.defaultSuccess();
          this.reset(); // traz nova lista de usuários
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    //  mudar o modo do formulário
    loadUser(user, mode = "save") {
      // por padrão recebe o modo save
      this.mode = mode;
      this.user = { ...user }; //carregando o usuário que foi passado, pra assumir o this.user
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>