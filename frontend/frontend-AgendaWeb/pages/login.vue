<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <!-- section form login -->
            <v-form @submit.prevent="submitLogin" ref="form">
              <v-text-field v-model="email" label="Email" type="email" required />
              <v-text-field v-model="senha" label="Senha" type="password" required />
              <v-btn type="submit" color="primary" class="mt-4" block>
                Entrar
              </v-btn>
              <!-- alert error -->
              <v-alert v-if="erro" type="error" class="mt-2">
                {{ erro }}
              </v-alert>
            </v-form>
            <!-- opcao para ir para cadastro-->
            <v-card-actions>
              <v-btn text color="primary" @click="$router.push('/cadastro')">
                Não possui conta? Cadastre-se!
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

const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()
const { login } = useAuth()

const submitLogin = async () => {
  erro.value = ''

  try {
    const response = await fetch('http://localhost:3030/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, senha: senha.value })
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro desconhecido')
    }

    if (data.usuario) {
      login(data.usuario)
      router.push('/home')
    } else {
      throw new Error('Usuário não retornado.')
    }


  } catch (err) {
    erro.value = err.message
  }
}
</script>
