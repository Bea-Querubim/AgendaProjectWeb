<template>
  <v-container>
    <h2 class="text-h5 mb-4">Sua lista de Eventos</h2>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-row>
      <v-col v-for="event in eventos" :key="event.id" cols="12" sm="6" md="4">
        <v-card>
          <!-- Imagem do evento -->
          <v-img
            :src="`/uploads/${event.id}.jpg`"
            height="200"
            cover
            class="rounded-t"
            @error="onImageError"
          />

          <v-card-title>{{ event.titulo }}</v-card-title>

          <v-card-subtitle>
            {{ event.descricao }}
          </v-card-subtitle>

          <v-card-text>
            <p><strong>Data:</strong> {{ formatDate(event.data) }}</p>
            <p><strong>Hora:</strong> {{ event.horaInicial }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const eventos = ref([])
const error = ref('')

function onImageError(e) {
  e.target.src = '/placeholder.jpg'
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR')
}

onMounted(async () => {
  if (!user.value?.email) {
    error.value = 'Usuário não autenticado.'
    return
  }

  try {
    const { data, error: fetchError } = await useFetch(
      `http://localhost:3030/usuario/${user.value.email}/eventos`
    )

    if (fetchError.value) {
      error.value = fetchError.value.message
      return
    }

    if (data.value && Array.isArray(data.value.data)) {
      eventos.value = data.value.data
    } else {
      error.value = 'Formato inesperado da resposta da API.'
    }
  } catch (err) {
    error.value = 'Erro na requisição: ' + err.message
  }
})
</script>
