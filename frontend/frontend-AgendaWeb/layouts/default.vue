<template>
  <v-app>
    <!-- Top Navigation -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Agenda Web</v-toolbar-title>
      <v-spacer />
      <!-- exibe login e cadastro caso o usuario nao esteja logado -->
      <template v-if="!user">
        <v-btn text to="/" tag="NuxtLink">Inicio</v-btn>
        <v-btn text to="/login" tag="NuxtLink">Login</v-btn>
        <v-btn text to="/cadastro" tag="NuxtLink">Cadastro</v-btn>
      </template>

      <!-- exibe perfil e air caso o usuario esteja logado -->
      <template v-else>
        <v-btn text to="/home" tag="NuxtLink">Inicio</v-btn>
        <v-btn text to="/perfil" tag="NuxtLink">Ver Perfil</v-btn>
        <v-btn text to="/agenda" tag="NuxtLink">Minha Agenda</v-btn>
        <v-btn text @click="logout">Sair</v-btn>
      </template>

    </v-app-bar>

    <!-- Conteúdo da página -->
    <v-main>
      <NuxtPage />
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <v-col class="text-center">
        © 2025 - Agenda Web
      </v-col>
    </v-footer>
  </v-app>
</template>

<!-- usa o login pelo state() do Nuxt3-->
<script setup>
  const { user, logout } = useAuth()
</script>