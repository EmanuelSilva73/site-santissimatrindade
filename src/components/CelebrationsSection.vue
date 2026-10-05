<script setup>
import { celebrations } from '../data/site'
</script>

<template>
  <section id="celebracoes" class="section celebrations">
    <div class="container">
      <h2 class="section-title">{{ celebrations.title }}</h2>
      <p class="section-lead">{{ celebrations.lead }}</p>

      <div class="celeb-grid">
        <article
          v-for="item in celebrations.items"
          :key="item.id"
          class="celeb-card card-surface"
        >
          <p class="celeb-card__date">
            <span class="celeb-card__day">{{ item.day }}</span>
            <span class="celeb-card__month">{{ item.month }}</span>
          </p>
          <h3 class="celeb-card__title">{{ item.title }}</h3>
          <p class="celeb-card__note">{{ item.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.celebrations {
  background: var(--parish-cream);
}

.celeb-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.celeb-card {
  padding: 22px 16px 20px;
  text-align: left;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.celeb-card__date {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0 0 14px;
}

.celeb-card__day {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--parish-navy);
}

.celeb-card__month {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--parish-gold);
}

.celeb-card__title {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.25;
}

.celeb-card__note {
  margin: 0;
  margin-top: auto;
  font-size: 0.88rem;
  line-height: 1.4;
  color: var(--parish-muted);
}

@media (max-width: 1100px) {
  .celeb-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .celeb-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .celeb-grid {
    grid-template-columns: 1fr;
  }
}
</style>
