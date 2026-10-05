<script setup>
import { sacraments } from '../data/site'
</script>

<template>
  <section id="sacramentos" class="section section--maroon sacraments">
    <div class="container">
      <h2 class="section-title">{{ sacraments.title }}</h2>
      <p class="section-lead">{{ sacraments.lead }}</p>

      <v-row>
        <v-col
          v-for="item in sacraments.items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
          <article class="sac-card card-surface">
            <div class="sac-card__icon" aria-hidden="true">
              <v-icon :icon="item.icon" size="22" />
            </div>
            <h3 class="sac-card__title">{{ item.title }}</h3>
            <p class="sac-card__text">{{ item.text }}</p>
            <a class="text-link" :href="item.link.href">{{ item.link.label }}</a>
          </article>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.sac-card {
  height: 100%;
  padding: 24px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sac-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(176, 138, 85, 0.18);
  color: var(--parish-gold);
}

.sac-card__title {
  margin: 4px 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.sac-card__text {
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--parish-muted);
}
</style>
