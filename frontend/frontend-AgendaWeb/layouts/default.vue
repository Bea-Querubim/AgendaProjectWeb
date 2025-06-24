<template>
  <v-app>
    <!-- Top Navigation -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Agenda Web</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/cadastro">Cadastro</v-btn>
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
