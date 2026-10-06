<script setup>
import { history } from '../data/site'
</script>

<template>
  <section id="a-paroquia" class="section section--maroon history">
    <div class="container history-grid">
      <div class="history-photo photo-placeholder" role="img" :aria-label="history.photo_alt">
        <span class="history-photo__label">{{ history.photo_label }}</span>
      </div>

      <div class="history-copy">
        <h2 class="section-title">{{ history.title }}</h2>
        <p v-for="(p, i) in history.paragraphs" :key="i" class="history-text">
          {{ p }}
        </p>

        <div class="pastor-pill">
          <span class="pastor-pill__icon" aria-hidden="true">
            <v-icon icon="mdi-account" size="20" />
          </span>
          <span>
            <strong>{{ history.pastor_label }}</strong>
            {{ history.pastor_name }}
          </span>
        </div>

        <v-btn
          class="btn-outline-light"
          variant="outlined"
          size="large"
          v-bind="history.cta.href.startsWith('/') && !history.cta.href.startsWith('/#')
            ? { to: history.cta.href }
            : { href: history.cta.href }"
        >
          {{ history.cta.label }}
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style scoped>
.history-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 48px;
  align-items: center;
}

.history-photo {
  position: relative;
  aspect-ratio: 4 / 5;
  max-width: 420px;
  border-radius: 220px 220px 28px 28px;
  width: 100%;
}

.history-photo__label {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--parish-navy);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-text {
  margin: 0 0 16px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 248, 240, 0.9);
  max-width: 48ch;
}

.pastor-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 24px;
  padding: 10px 18px 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  color: #fff;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.06);
}

.pastor-pill__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.pastor-pill strong {
  font-weight: 700;
  margin-right: 4px;
}

@media (max-width: 960px) {
  .history-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .history-photo {
    margin-inline: auto;
  }
}
</style>
