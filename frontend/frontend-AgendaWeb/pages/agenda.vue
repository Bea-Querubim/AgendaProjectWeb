<template>
  <v-container>
    <v-row>{{ data.value }}</v-row>
    <v-row>
      <!-- Coluna do calendário -->
      <v-col cols="12" md="8" class="mb-4">
        <v-select v-model="type" :items="types" label="Visualização" variant="outlined" hide-details dense />
        <v-calendar expanded :model-value="[focus]" @update:model-value="val => onFocusChange(val[0])" :events="events"
          :view-mode="type" color="primary" show-more>
          <template #event="{ event }">
            <v-tooltip activator="parent" location="top">
              {{ event.title }}
            </v-tooltip>
          </template>
        </v-calendar>
      </v-col>

      <!-- Coluna lateral: date-picker e lista -->
      <v-col cols="10" md="3">
        <v-date-picker v-model="selectedDate" locale="pt-BR" :max="maxDate" :min="minDate" color="primary"
          class="mb-4" />

        <h3 class="text-h6 mb-2">Eventos em {{ selectedDateFormatted }}</h3>

        <v-list v-if="filteredEvents.length">
          <v-list-item v-for="(event, index) in filteredEvents" :key="index">
            <v-list-item-icon>
              <v-icon :color="event.color">mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ event.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <p v-else>Nenhum evento neste dia.</p>

        <p v-if="error" style="color:red;">Erro: {{ error }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref, computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

const selectedDate = ref(new Date().toISOString().split('T')[0])
const focus = ref(selectedDate.value)
const type = ref('month')
const types = ['month', 'week', 'day']
const events = ref([])
const eventos = ref([])
const error = ref(null)

const minDate = '2020-01-01'
const maxDate = '2030-12-31'

// Atualiza eventos quando o email do usuário estiver disponível
watch(
  () => user.value?.email,
  async (email) => {
    if (!email) return
    error.value = null
    try {
      const { data, error: fetchError } = await useFetch(`http://localhost:3030/usuario/${email}/eventos`)
      eventos.value = data.value.data

      if (fetchError.value) {
        error.value = fetchError.value.message || 'Erro desconhecido ao buscar eventos'
        return
      }
      if (data.value && Array.isArray(data.value.data)) {
        events.value = data.value.data.map(e => {
          const start = `${e.data}T${e.horaInicial}`
          const end = calcularFim(e.data, e.horaInicial, e.duracao)
          return {
            title: e.titulo,
            start,
            end,
            color: 'primary'
          }
        });
      }
    } catch (err) {
      error.value = err.message
    }
  },
  { immediate: true }
)

watch(selectedDate, (newDate) => {
  focus.value = newDate
})

watch(focus, (newFocus) => {
  selectedDate.value = newFocus
})

const filteredEvents = computed(() => {
  const sel = new Date(selectedDate.value)
  sel.setHours(0, 0, 0, 0)

  return events.value.filter(e => {
    const start = new Date(e.start)
    const end = new Date(e.end)
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    return sel >= start && sel <= end
  })
})

const selectedDateFormatted = computed(() => {
  return new Date(selectedDate.value).toLocaleDateString('pt-BR')
})

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function calcularFim(data, horaInicial, duracao) {
  const [h1, m1, s1] = horaInicial.split(':').map(Number)
  const [dh, dm, ds] = duracao.split(':').map(Number)

  const inicio = new Date(`${data}T${horaInicial}`)
  inicio.setHours(h1 + dh)
  inicio.setMinutes(m1 + dm)
  inicio.setSeconds(s1 + (ds || 0))

  return inicio.toISOString()
}

function onFocusChange(val) {
  focus.value = val
}
</script>
