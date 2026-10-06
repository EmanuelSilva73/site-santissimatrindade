<script setup>
import { computed } from 'vue'
import { historyPage, site } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const page = historyPage

const breadcrumbs = [
  { label: 'Início', to: '/' },
  { label: page.breadcrumb_parent },
  { label: 'História' },
]

/** Trechos entre colchetes são placeholders (texto a confirmar). */
const isPlaceholder = (text) => typeof text === 'string' && text.trim().startsWith('[')

const timeline = computed(() => [...(page.timeline || [])].sort((a, b) => a.sort - b.sort))
</script>

<template>
  <section class="historia-page">
    <div class="container">
      <PageHeader
        :title="page.title"
        :excerpt="page.resumo"
        :breadcrumbs="breadcrumbs"
        back-to="/"
        :share-title="`${page.title} | ${site.name}`"
        :hero-icon="page.hero_icon"
        :hero-label="`Ilustração: ${page.title}`"
      />

      <article class="historia-main">
        <div class="historia-body">
          <figure class="historia-figure">
            <img
              v-if="page.photo_url"
              class="historia-photo"
              :src="page.photo_url"
              :alt="page.photo_alt"
              loading="lazy"
            >
            <div
              v-else
              class="historia-photo photo-placeholder"
              role="img"
              :aria-label="page.photo_alt"
            >
              <span>{{ page.photo_label }}</span>
            </div>
          </figure>

          <template v-for="(paragraph, i) in page.body" :key="i">
            <p :class="{ 'is-placeholder': isPlaceholder(paragraph) }">{{ paragraph }}</p>
            <blockquote v-if="page.quote && i === 1" class="historia-quote">
              <p>“{{ page.quote.text }}”</p>
              <cite>{{ page.quote.source }}</cite>
            </blockquote>
          </template>
        </div>
      </article>

      <section v-if="timeline.length" class="timeline-section" aria-labelledby="linha-do-tempo">
        <h2 id="linha-do-tempo" class="section-title">{{ page.timeline_title }}</h2>
        <p v-if="page.timeline_lead" class="section-lead">{{ page.timeline_lead }}</p>

        <ol class="timeline">
          <li v-for="item in timeline" :key="item.id" class="timeline-item">
            <span class="timeline-dot" aria-hidden="true" />
            <div class="timeline-card">
              <span class="timeline-year" :class="{ 'is-placeholder': isPlaceholder(item.year) }">
                {{ item.year }}
              </span>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-text" :class="{ 'is-placeholder': isPlaceholder(item.description) }">
                {{ item.description }}
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </section>
</template>

<style scoped>
.historia-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 64px;
}

.historia-main {
  min-width: 0;
}

/* Foto redonda (perfil) flutuando à esquerda; o texto contorna o círculo e segue abaixo dele. */
.historia-figure {
  --photo-size: 260px;
  float: left;
  width: var(--photo-size);
  height: var(--photo-size);
  margin: 4px 36px 20px 0;
  border-radius: 50%;
  shape-outside: circle(50%);
  shape-margin: 18px;
}

.historia-photo {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow:
    0 0 0 2px rgba(176, 138, 85, 0.45),
    var(--parish-shadow);
}

.historia-photo.photo-placeholder {
  padding: 36px;
  text-align: center;
  line-height: 1.4;
}

.historia-body {
  max-width: 900px;
}

.historia-body::after {
  content: '';
  display: table;
  clear: both;
}

.historia-body > p {
  margin: 0 0 18px;
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--parish-ink);
}

.historia-body > p:first-of-type::first-letter {
  float: left;
  margin: 6px 10px 0 0;
  font-family: var(--font-display);
  font-size: 3.6rem;
  font-weight: 600;
  line-height: 0.8;
  color: var(--parish-maroon);
}

.is-placeholder {
  font-style: italic;
  color: var(--parish-muted) !important;
}

.historia-body > p.is-placeholder {
  display: flow-root;
  padding: 10px 14px;
  border-left: 3px dashed rgba(176, 138, 85, 0.6);
  background: rgba(176, 138, 85, 0.06);
  border-radius: 0 10px 10px 0;
  font-size: 1rem;
}

.historia-quote {
  display: flow-root;
  margin: 30px 0 32px;
  padding: 6px 0 6px 22px;
  border-left: 3px solid var(--parish-gold);
}

.historia-quote p {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.6vw, 1.7rem);
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
  color: var(--parish-navy);
}

.historia-quote cite {
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--parish-maroon);
}

/* Linha do Tempo */
.timeline-section {
  margin-top: 56px;
  padding-top: 48px;
  border-top: 1px solid rgba(27, 42, 74, 0.1);
}

.timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--parish-gold), rgba(176, 138, 85, 0.25));
}

.timeline-item {
  position: relative;
  padding-top: 34px;
}

.timeline-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--parish-maroon);
  box-shadow: 0 0 0 4px #fff;
}

.timeline-year {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--parish-gold) !important;
}

.timeline-title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--parish-navy);
}

.timeline-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--parish-ink);
}

@media (max-width: 1100px) {
  .timeline {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 680px;
  }

  .timeline::before {
    top: 0;
    bottom: 0;
    left: 9px;
    right: auto;
    width: 2px;
    height: auto;
    background: linear-gradient(180deg, var(--parish-gold), rgba(176, 138, 85, 0.25));
  }

  .timeline-item {
    padding: 0 0 28px 40px;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }
}

@media (max-width: 960px) {
  .historia-figure {
    --photo-size: 200px;
    margin-right: 28px;
  }

  .historia-photo.photo-placeholder {
    padding: 28px;
    font-size: 0.75rem;
  }
}

@media (max-width: 600px) {
  .historia-figure {
    --photo-size: 160px;
    float: none;
    margin: 0 auto 24px;
    shape-outside: none;
  }

  .historia-photo.photo-placeholder {
    padding: 20px;
    font-size: 0.68rem;
  }

  .historia-body > p {
    font-size: 1.02rem;
  }

  .timeline-section {
    margin-top: 40px;
    padding-top: 36px;
  }
}
</style>
