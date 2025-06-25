<template>
  <v-card class="pa-4">
    <v-form @submit.prevent="handleSubmit" ref="formRef">
      <v-text-field v-model="evento.titulo" label="Título" required />
      <v-textarea v-model="evento.descricao" label="Descrição" required />

      <v-select
        v-model="evento.tipoEvento"
        label="Tipo de Evento"
        :items="['publico', 'privado', 'academico']"
        required
      />

      <v-select
        v-model="evento.tipoLocal"
        label="Local"
        :items="['1- Presencial', '2- Online']"
        required
      />

      <v-text-field v-model="evento.endereco" label="Endereço" />
      <v-text-field v-model="evento.data" label="Data" type="date" required />
      <v-text-field v-model="evento.horaInicial" label="Hora Inicial" type="time" required />
      <v-text-field v-model="evento.duracao" label="Duração (hh:mm)" type="time" required />
      <v-text-field
        v-model="participantesInput"
        label="E-mails dos participantes (separados por vírgula)"
        hint="Ex: maria@email.com, joao@email.com"
      />

      <v-file-input
        label="Imagem do evento"
        accept="image/*"
        @change="file => eventoImagem = file"
      />

      <v-btn type="submit" color="primary" class="mt-4">Salvar Evento</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['eventoSalvo'])

const evento = ref({
  titulo: '',
  descricao: '',
  tipoEvento: '',
  tipoLocal: '',
  endereco: '',
  data: '',
  horaInicial: '',
  duracao: '',
  participantes: [],
})

const participantesInput = ref('')
const eventoImagem = ref(null)
const formRef = ref(null)

const handleSubmit = async () => {
  // processa lista de participantes
  if (participantesInput.value) {
    evento.value.participantes = participantesInput.value.split(',').map(p => p.trim())
  }

  // envia o evento
  const res = await fetch('http://localhost:3030/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento.value)
  })

  const novoEvento = await res.json()

  emit('eventoSalvo', novoEvento)
  formRef.value.reset()
}
</script>
