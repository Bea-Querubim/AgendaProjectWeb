<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Cadastro</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitCadastro" ref="form">
              <v-text-field v-model="nome" label="Nome Completo" required />
              <v-text-field v-model="email" label="Email" type="email" required />
              <v-text-field v-model="senha" label="Senha" type="password" required />
              <v-btn type="submit" color="primary" class="mt-4" block>
                Cadastrar
              </v-btn>
              <!-- alert error -->
              <v-alert v-if="erro" type="error" class="mt-3">
                {{ erro }}
              </v-alert>

              <!-- alert sucess -->
              <v-alert v-if="sucesso" type="success" class="mt-3">
                {{ sucesso }}
              </v-alert>

            </v-form>
            <!-- opcao para ir para login-->
            <v-card-actions>
            <v-btn text color="primary" @click="$router.push('/login')">
              Já tem conta? Faça login
            </v-btn>
          </v-card-actions>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nome = ref('')
const email = ref('')
const senha = ref('')
const erro = ref('')
const sucesso = ref('')
const router = useRouter()
const form = ref(null)
const { login } = useAuth()


const submitCadastro = async () => {
  erro.value = ''
  sucesso.value = ''

  if (!form.value.validate()) return;

  try {
    const response = await fetch('http://localhost:3030/usuarios', {
      method: 'POST',
      body: JSON.stringify({ nome: nome.value, email: email.value, senha: senha.value }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.mensagem || data);
    sucesso.value = 'Cadastro realizado com sucesso!';

    login(data.usuario)
    setTimeout(() => router.push('/home'), 1500);

  } catch (err) {
    erro.value = err.message;
  }
};
</script>
