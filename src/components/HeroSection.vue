<script setup>
import { site } from '../data/site'
</script>

<template>
  <section id="home" class="hero section">
    <div class="container hero-inner">
      <p class="hero-kicker">Paróquia · {{ site.city }}</p>
      <h1 class="hero-title">{{ site.name }}</h1>
      <p class="hero-subtitle">{{ site.tagline }}</p>
      <div class="hero-actions">
        <v-btn :href="site.cta.href" class="btn btn--primary" variant="flat" size="large">
          {{ site.cta.label }}
        </v-btn>
        <v-btn href="#contato" class="btn btn--outline" variant="outlined" size="large">
          Fale conosco
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  align-items: center;
  background:
    linear-gradient(135deg, rgba(27, 42, 74, 0.92), rgba(61, 90, 128, 0.85)),
    radial-gradient(ellipse at 70% 30%, rgba(201, 168, 76, 0.2), transparent 55%);
  background-color: var(--parish-navy);
  color: #ffffff;
}

.hero-inner {
  padding-block: 48px;
}

.hero-kicker {
  margin: 0 0 16px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--parish-gold);
}

.hero-title {
  margin: 0 0 18px;
  max-width: 16ch;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 600;
  line-height: 1.1;
}

.hero-subtitle {
  margin: 0 0 36px;
  max-width: 36ch;
  font-size: 1.25rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.85);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
</style>
