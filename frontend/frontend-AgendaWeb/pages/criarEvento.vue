<template>
  <FormEvento />
</template>

<script setup>
import FormEvento from '~/components/formEvento.vue'

definePageMeta({
  middleware: ['auth']
})
</script>
