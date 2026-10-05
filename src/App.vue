<script setup>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>
