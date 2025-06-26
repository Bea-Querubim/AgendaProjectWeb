<template>
  <v-container>
    <h2 class="text-h5 mb-4">Criar Novo Evento</h2>

    <v-form @submit.prevent="submitEvento">
      <v-text-field v-model="form.titulo" label="Título" required />
      <v-textarea v-model="form.descricao" label="Descrição" />
      <v-select
        v-model="form.tipoEvento"
        label="Tipo de Evento"
        :items="['publico', 'privado', 'academico']"
        required
      />
      <v-select
        v-model="form.tipoLocal"
        label="Tipo de Local"
        :items="['1-Presencial', '2-Online']"
        required
      />
      <v-text-field v-model="form.endereco" label="Endereço ou Link" />
      <v-text-field v-model="form.data" label="Data" type="date" required />
      <v-text-field v-model="form.horaInicial" label="Hora Inicial" type="time" required />
      <v-text-field v-model="form.duracao" label="Duração (hh:mm:ss)" type="time" required />

      <v-textarea
        v-model="form.participantes"
        label="Emails dos Participantes (separados por vírgula)"
        placeholder="ex: joao@email.com, maria@email.com"
      />

      <v-btn type="submit" color="primary" class="mt-4">Salvar Evento</v-btn>

      <v-alert v-if="erro" type="error" class="mt-2"> {{ erro }}</v-alert>
      <v-alert v-if="sucesso" type="success" class="mt-2"> Evento salvo com sucesso!</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

const erro = ref('')
const sucesso = ref(false)
const resposta = ref(null)

const form = ref({
  titulo: '',
  descricao: '',
  tipoEvento: '',
  tipoLocal: '',
  endereco: '',
  data: '',
  horaInicial: '',
  duracao: '',
  participantes: ''
})
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const submitEvento = async () => {
  erro.value = ''
  sucesso.value = false
  resposta.value = null



  try {
    const formatTime = (timeStr) => {
      return timeStr.length === 5 ? `${timeStr}:00` : timeStr
    }

    const payload = {
      ...form.value,
      horaInicial: formatTime(form.value.horaInicial),
      duracao: formatTime(form.value.duracao),
      organizador: user.value.email,
      participantes: form.value.participantes
        ? form.value.participantes.split(',').map(p => p.trim())
        : []
    }

    console.log('Payload enviado:', payload)

    const { data, error: fetchError } = await useFetch(`${apiBase}/eventos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (fetchError.value) {
      throw new Error(fetchError.value.messagem || 'Erro ao salvar evento')
    }

    if (data.value) {
      sucesso.value = true
      resposta.value = JSON.stringify(data.value, null, 2)
      console.log(resposta.value)
    }
    setTimeout(() =>   navigateTo('/agenda'), 1500);


  } catch (err) {
    erro.value = err.message
  }
}
</script>
