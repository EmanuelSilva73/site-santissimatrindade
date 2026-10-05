<script setup>
import AppNavbar from './components/AppNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import MassesSection from './components/MassesSection.vue'
import EventsSection from './components/EventsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppNavbar />

    <v-main>
      <HeroSection />
      <AboutSection />
      <MassesSection />
      <EventsSection />
      <ContactSection />
      <AppFooter />
    </v-main>
  </v-app>
</template>
