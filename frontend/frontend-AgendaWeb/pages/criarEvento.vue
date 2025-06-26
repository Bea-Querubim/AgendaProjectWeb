<template>
  <FormEvento />
</template>

<script setup>
import FormEvento from '~/components/FormEvento.vue'

definePageMeta({
  middleware: ['auth']
})
</script>
