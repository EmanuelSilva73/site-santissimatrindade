<script setup>
import { eventsPlaceholder } from '../data/site'
</script>

<template>
  <section id="eventos" class="section events">
    <div class="container">
      <h2 class="section-title">Eventos</h2>
      <p class="section-lead">Próximas celebrações e atividades da comunidade (conteúdo placeholder).</p>

      <v-row>
        <v-col v-for="event in eventsPlaceholder" :key="event.title" cols="12" md="4">
          <v-card class="event-card" variant="flat">
            <v-card-text>
              <span class="event-date">{{ event.date }}</span>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.events {
  background: #ffffff;
}

.event-card {
  height: 100%;
  border-radius: 12px !important;
  border-top: 3px solid var(--parish-gold);
  border: 1px solid rgba(27, 42, 74, 0.08);
  border-top: 3px solid var(--parish-gold);
  background: var(--parish-cream) !important;
}

.event-date {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--parish-blue);
}

.event-card h3 {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--parish-navy);
}

.event-card p {
  margin: 0;
  line-height: 1.6;
  color: var(--parish-muted);
}
</style>
