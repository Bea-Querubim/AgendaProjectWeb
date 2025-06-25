<template>
  <v-container>

    <h3>Usuário atual:</h3>
    <pre>{{ user }}</pre>
    <h2>Debug da API de eventos</h2>

    <v-alert type="error" v-if="error">Erro: {{ error }}</v-alert>
    <pre v-if="responseRaw">{{ responseRaw }}</pre>
    <p v-else>Carregando...</p>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const responseRaw = ref(null)
const error = ref(null)

watch(
  () => user.value?.email,
  async (email) => {
    if (!email) return

    try {
      const { data, error: fetchError } = await useFetch(`http://localhost:3030/usuario/${email}/eventos`)

      if (fetchError.value) {
        error.value = fetchError.value.message
        return
      }

      console.log('Resposta da API:', data.value)
      responseRaw.value = JSON.stringify(data.value, null, 2)

    } catch (err) {
      error.value = err.message
    }
  },
  { immediate: true }
)
</script>
