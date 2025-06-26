<template>
  <!-- section (Banner) -->
  <v-container class="text-center py-16">
    <h1 class="text-h2 font-weight-bold mb-4">Organize seus Eventos com Facilidade!</h1>
    <p class="text-subtitle-1 mb-6">
      Controle sua agenda, crie eventos, convide participantes e visualize tudo de forma prática.
    </p>
    <v-btn color="primary" class="mr-4" to="/eventos">Ver Meus Eventos</v-btn>
    <!--<v-btn outlined color="primary" to="/agenda">Minha Agenda</v-btn>-->
  </v-container>

  <!-- section cards -->
  <v-container class="my-16">
    <v-row>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>Criar Eventos</v-card-title>
          <v-card-text>Cadastre eventos com detalhes personalizados.</v-card-text>
          <NuxtLink to="/criarEvento">
             <v-btn color="primary" class="mb-4">+ Criar Evento</v-btn>
          </NuxtLink>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>Convidar Participantes</v-card-title>
          <v-card-text>Envie convites para usuários da plataforma.</v-card-text>
          <NuxtLink to="/convidar">
             <v-btn color="primary" class="mb-4">+ Enviar Convites</v-btn>
          </NuxtLink>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>Visualizar Agenda</v-card-title>
          <v-card-text>Tenha uma visão clara dos seus compromissos.</v-card-text>
          <NuxtLink to="/agenda">
            <v-btn color="primary" class="mb-4">+ Minha AGenda </v-btn>
          </NuxtLink>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
