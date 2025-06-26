<template>
  <v-container>
    <h2 class="text-h5 mb-4">Eventos Públicos</h2>

    <v-row>
      <v-col v-for="event in eventos" :key="event.id" cols="12" sm="6" md="4">
        <v-card>
          <!-- Imagem do evento -->
          <v-img :src="`/uploads/${event.id}.jpg`" height="200" cover class="rounded-t" @error="onImageError" />

          <v-card-title>{{ event.titulo }}</v-card-title>

          <v-card-subtitle>
            {{ event.descricao }}
          </v-card-subtitle>

          <v-card-text>
            <p><strong>Data:</strong> {{ formatDate(event.data) }}</p>
            <p><strong>Hora:</strong> {{ event.horaInicial }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn :to="`/agenda`" color="primary" variant="tonal">Adicionar a minha Agenda</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useFetch } from '#app'

const { data, error } = await useFetch('http://localhost:3030/eventos?tipoEvento=publico')

if (error.value) {
  console.error('Erro ao buscar eventos:', error.mensagem)
}
const eventos = computed(() => data.value?.data || [])

// Fallback se imagem não existir
function onImageError(e) {
  e.target.src = '/placeholder.jpg'
}

// Formata data para exibição
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR')
}
</script>
