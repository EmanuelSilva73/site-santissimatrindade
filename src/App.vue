<script setup>
import AppNavbar from './components/AppNavbar.vue'
import HeroCarousel from './components/HeroCarousel.vue'
import NewsSection from './components/NewsSection.vue'
import DizimoSection from './components/DizimoSection.vue'
import MassesSection from './components/MassesSection.vue'
import SacramentsSection from './components/SacramentsSection.vue'
import CelebrationsSection from './components/CelebrationsSection.vue'
import HistorySection from './components/HistorySection.vue'
import PastoraisSection from './components/PastoraisSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <HeroCarousel />
      <NewsSection />
      <DizimoSection />
      <MassesSection />
      <SacramentsSection />
      <CelebrationsSection />
      <HistorySection />
      <PastoraisSection />
      <ContactSection />
      <AppFooter />
    </v-main>
  </v-app>
</template>
