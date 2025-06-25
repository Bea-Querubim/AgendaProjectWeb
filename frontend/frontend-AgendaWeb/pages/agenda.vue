<template>
  <v-container>
    <v-row>
      <!-- Coluna principal -->
      <v-col cols="12" md="8">
        <h2 class="text-h5 mb-4">Minha Agenda</h2>
        <p>Os eventos criados ou que você participa aparecerão ao lado.</p>
        <br>
        <v-divider horizontal />
        <br>
        <v-select v-model="type" :items="types" label="Visualização" variant="outlined" hide-details dense />
        <v-calendar expanded :model-value="[focus]" :view-mode="type" show-more>

          <template #event="{ event }">
            <v-tooltip activator="parent" location="top">
              {{ event.titulo }}
            </v-tooltip>
          </template>
        </v-calendar>
      </v-col>

      <v-divider vertical />

      <!-- Coluna lateral com eventos -->
      <v-col cols="12" md="4">
        <v-date-picker v-model="selectedDate" locale="pt-BR" :max="maxDate" :min="minDate" color="primary"/>
        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>

        <NuxtLink to="/criarEvento">
          <v-btn color="primary" class="mb-4">+ Criar Evento</v-btn>
        </NuxtLink>
        <v-divider horizontal />
        <br>
        <h3 class="text-h6 mb-2">Eventos do Usuário</h3>

        <v-list v-if="events.length">
          <v-list-item v-for="(event, index) in events" :key="index">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ event.titulo }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ event.descricao }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                📅 {{ formatarData(event.data) }} às {{ event.horaInicial }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <p v-else>Nenhum evento encontrado.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

import { ref, computed, watch, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const events = ref([])
const error = ref(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const focus = ref(selectedDate.value)
const type = ref('month')
const types = ['month', 'week', 'day']

const minDate = '2020-01-01'
const maxDate = '2030-12-31'


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
      events.value = data.value.data
    } else {
      error.value = 'Formato inesperado da resposta da API.'
    }
  } catch (err) {
    error.value = 'Erro na requisição: ' + err.message
  }
})

function formatarData(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}

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
</script>
