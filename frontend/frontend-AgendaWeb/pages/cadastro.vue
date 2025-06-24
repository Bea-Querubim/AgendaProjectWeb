<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Cadastro</v-card-title>
          <v-card-text>
            <!-- section form cadastro -->
            <v-form @submit.prevent="submitCadastro" ref="form">
              <v-text-field v-model="nome" label="Nome" required />
              <v-text-field v-model="email" label="Email" type="email" required />
              <v-text-field v-model="senha" label="Senha" type="password" required />
              <v-btn type="submit" color="primary" class="mt-4" block>
                Cadastrar
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="$router.push('/login')">
              Já tem conta? Faça login
            </v-btn>
          </v-card-actions>
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
const router = useRouter()
const form = ref(null)


async function submitCadastro() {
  if (!form.value.validate()) return

  try {
    const response = await fetch('http://localhost:3030/usuarios', {
      method: 'POST',
      body: JSON.stringify({ nome: nome.value, email: email.value, senha: senha.value }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data.mensagem || data)

    router.push('/')
  } catch (err) {
    erro.value = err.message
  }
}
</script>
