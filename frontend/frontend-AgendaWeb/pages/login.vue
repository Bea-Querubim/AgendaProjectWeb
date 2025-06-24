<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <!-- section form login -->
            <v-form @submit.prevent="submitLogin" ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              />
              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                required
              />
              <v-btn type="submit" color="primary" class="mt-4" block>
                Entrar
              </v-btn>
              <v-alert
                v-if="erro"
                type="error"
                class="mt-2"
              >
                {{ erro }}
              </v-alert>
            </v-form>
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

const submitLogin = async () => {
  erro.value = ''

  try {
    const response = await fetch('http://localhost:3030/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, senha: senha.value })
    })

    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro ao fazer login.')
    }

    router.push('/')
  } catch (err) {
    erro.value = err.message
  }
}
</script>
