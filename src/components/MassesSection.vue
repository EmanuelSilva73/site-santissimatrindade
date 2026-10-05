<script setup>
import { massSchedule } from '../data/site'
</script>

<template>
  <section id="missas" class="section masses">
    <div class="container">
      <h2 class="section-title">Missas</h2>
      <p class="section-lead">Horários semanais de celebração (placeholder — confirme na secretaria).</p>

      <v-row>
        <v-col v-for="item in massSchedule" :key="item.day" cols="12" sm="6" md="4">
          <v-card class="mass-card" variant="flat">
            <v-card-text>
              <div class="mass-day">{{ item.day }}</div>
              <ul class="mass-times">
                <li v-for="time in item.times" :key="time">
                  <v-icon icon="mdi-clock-outline" size="18" />
                  {{ time }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.masses {
  background: var(--parish-cream);
}

.mass-card {
  height: 100%;
  border-radius: 12px !important;
  border: 1px solid rgba(27, 42, 74, 0.1);
  background: #ffffff !important;
}

.mass-day {
  margin-bottom: 14px;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.mass-times {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mass-times li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 1.05rem;
  color: var(--parish-muted);
}

.mass-times .v-icon {
  color: var(--parish-gold) !important;
}
</style>
