<script setup>
import { site } from '../data/site'
</script>

<template>
  <section id="sobre" class="section about">
    <div class="container">
      <h2 class="section-title">Sobre a Paróquia</h2>
      <p class="section-lead">
        Conheça a história e a missão da {{ site.name }} em {{ site.city }}.
      </p>

      <v-row>
        <v-col cols="12" md="6">
          <div class="about-card">
            <v-icon icon="mdi-church" size="36" class="about-icon" />
            <h3>Nossa missão</h3>
            <p>
              Placeholder: texto sobre a missão pastoral, acolhimento da comunidade e vida
              sacramental da paróquia.
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="about-card">
            <v-icon icon="mdi-hand-heart" size="36" class="about-icon" />
            <h3>Nossa comunidade</h3>
            <p>
              Placeholder: descrição das pastorais, grupos e atividades que animam a vida da
              comunidade paroquial.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: #ffffff;
}

.about-card {
  height: 100%;
  padding: 28px;
  border: 1px solid rgba(27, 42, 74, 0.08);
  border-radius: 12px;
  background: var(--parish-cream);
}

.about-icon {
  color: var(--parish-gold) !important;
  margin-bottom: 14px;
}

.about-card h3 {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--parish-navy);
}

.about-card p {
  margin: 0;
  line-height: 1.65;
  color: var(--parish-muted);
}
</style>
