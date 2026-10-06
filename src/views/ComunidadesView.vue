<script setup>
import { computed } from 'vue'
import { comunidades, comunidadesPage, contact, site } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const page = comunidadesPage

const breadcrumbs = [
  { label: 'Início', to: '/' },
  { label: page.breadcrumb_parent },
  { label: page.breadcrumb_label },
]

/** Trechos entre colchetes são placeholders (texto a confirmar). */
const isPlaceholder = (text) => typeof text === 'string' && text.includes('[')

const sorted = computed(() => [...comunidades].sort((a, b) => a.sort - b.sort))

const isMatriz = (c) => c.tipo === 'Igreja Matriz'

/** Sem maps_url → busca no Google Maps pelo nome + Teresina. */
const mapsUrl = (c) =>
  c.maps_url ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.nome} ${site.city} ${site.state}`)}`
</script>

<template>
  <section class="comunidades-page">
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

      <div class="comunidades">
        <article
          v-for="(c, i) in sorted"
          :id="c.slug"
          :key="c.id"
          class="comunidade card-surface"
          :class="{ 'comunidade--reverse': i % 2 === 1, 'comunidade--matriz': isMatriz(c) }"
        >
          <div class="comunidade-media">
            <img v-if="c.foto_url" :src="c.foto_url" :alt="c.foto_alt" loading="lazy">
            <div v-else class="comunidade-placeholder photo-placeholder" role="img" :aria-label="c.foto_alt">
              <v-icon :icon="c.icone" size="72" aria-hidden="true" />
              <span>{{ page.foto_placeholder_label }}</span>
            </div>
          </div>

          <div class="comunidade-body">
            <span class="tipo-chip" :class="{ 'tipo-chip--matriz': isMatriz(c) }">
              <v-icon :icon="isMatriz(c) ? 'mdi-cross' : 'mdi-church-outline'" size="14" aria-hidden="true" />
              {{ c.tipo }}
            </span>

            <h2 class="comunidade-nome">{{ c.nome }}</h2>
            <p v-if="c.padroeiro" class="comunidade-padroeiro">
              {{ page.padroeiro_label }}: {{ c.padroeiro }}
            </p>
            <p class="comunidade-desc" :class="{ 'is-placeholder': isPlaceholder(c.descricao) }">
              {{ c.descricao }}
            </p>

            <dl class="info-list">
              <div class="info-item">
                <dt>
                  <v-icon icon="mdi-map-marker-outline" size="18" aria-hidden="true" />
                  {{ page.endereco_label }}
                </dt>
                <dd :class="{ 'is-placeholder': isPlaceholder(c.endereco) }">
                  {{ c.endereco }}<template v-if="c.bairro"><br>{{ c.bairro }}</template>
                </dd>
              </div>

              <div class="info-item">
                <dt>
                  <v-icon icon="mdi-clock-outline" size="18" aria-hidden="true" />
                  {{ page.missas_label }}
                </dt>
                <dd>
                  <ul v-if="c.missas?.length" class="missas">
                    <li v-for="m in c.missas" :key="m.dia" :class="{ 'missas__item--vazio': m.sem_missa }">
                      <span class="missas__dia">{{ m.dia }}</span>
                      <span class="missas__hora">{{ m.horario }}</span>
                    </li>
                  </ul>
                  <span v-else class="is-placeholder">[A confirmar com a secretaria]</span>
                </dd>
              </div>

              <div class="info-item">
                <dt>
                  <v-icon icon="mdi-party-popper" size="18" aria-hidden="true" />
                  {{ page.festa_label }}
                </dt>
                <dd :class="{ 'is-placeholder': isPlaceholder(c.festa_padroeiro) }">
                  {{ c.festa_padroeiro }}
                </dd>
              </div>
            </dl>

            <div class="comunidade-actions">
              <v-btn
                :class="isMatriz(c) ? 'btn-primary' : 'btn-outline'"
                :variant="isMatriz(c) ? 'flat' : 'outlined'"
                size="large"
                prepend-icon="mdi-map-marker-radius-outline"
                :href="mapsUrl(c)"
                target="_blank"
                rel="noopener"
              >
                {{ page.maps_label }}
              </v-btn>
              <v-btn class="action-link" variant="text" size="large" :to="page.horarios_href">
                {{ page.horarios_label }}
              </v-btn>
            </div>
          </div>
        </article>
      </div>

      <aside class="cta-band" aria-labelledby="fale-secretaria">
        <div class="cta-band__copy">
          <h2 id="fale-secretaria" class="cta-band__title">{{ page.cta_title }}</h2>
          <p class="cta-band__text">{{ page.cta_text }}</p>
        </div>
        <v-btn
          class="btn-primary"
          variant="flat"
          size="large"
          prepend-icon="mdi-phone"
          :href="contact.phone_href"
        >
          {{ page.cta_label }}
        </v-btn>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.comunidades-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 64px;
}

.is-placeholder {
  font-style: italic;
  color: var(--parish-muted) !important;
}

.comunidades {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Mesmo padrão dos cards em destaque de /pastorais */
.comunidade {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  overflow: hidden;
  scroll-margin-top: calc(var(--navbar-height) + 16px);
}

.comunidade--reverse {
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
}

.comunidade--reverse .comunidade-media {
  order: 2;
}

.comunidade--matriz {
  border-color: rgba(176, 138, 85, 0.4);
}

.comunidade-media {
  min-height: 360px;
}

.comunidade-media img,
.comunidade-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comunidade-placeholder {
  flex-direction: column;
  gap: 10px;
}

.comunidade-placeholder .v-icon {
  opacity: 0.55;
}

.comunidade-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 40px;
}

.tipo-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(176, 138, 85, 0.45);
  background: rgba(176, 138, 85, 0.14);
  color: var(--parish-maroon);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tipo-chip--matriz {
  border-color: var(--parish-maroon);
  background: var(--parish-maroon);
  color: #fff;
}

.comunidade-nome {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--parish-navy);
}

.comunidade-padroeiro {
  margin: 0 0 12px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--parish-gold);
}

.comunidade-desc {
  margin: 0 0 20px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--parish-ink);
  max-width: 62ch;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 24px;
  width: 100%;
  margin: 0 0 24px;
  padding: 16px 0 0;
  border-top: 1px solid rgba(27, 42, 74, 0.1);
}

.info-item dt {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--parish-maroon);
}

.info-item dt .v-icon {
  color: var(--parish-gold);
}

.info-item dd {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--parish-navy);
}

.missas {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.missas li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.missas__dia {
  color: var(--parish-navy);
}

.missas__hora {
  font-weight: 700;
  color: var(--parish-maroon);
  white-space: nowrap;
}

.missas__item--vazio .missas__hora {
  font-weight: 400;
  font-style: italic;
  color: var(--parish-muted);
}

.comunidade-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.action-link.v-btn {
  font-weight: 600 !important;
  color: var(--parish-maroon) !important;
  letter-spacing: 0.01em !important;
  text-transform: none !important;
}

.action-link.v-btn:hover,
.action-link.v-btn:focus-visible {
  color: var(--parish-navy) !important;
}

/* CTA — mesmo padrão de /pastorais */
.cta-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px 40px;
  margin-top: 64px;
  padding: 32px 40px;
  border-radius: var(--radius-card);
  background: var(--parish-maroon);
  color: #fff;
}

.cta-band__title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 600;
  color: #fff8f0;
}

.cta-band__text {
  margin: 0;
  max-width: 60ch;
  font-size: 1.02rem;
  line-height: 1.6;
  color: rgba(255, 248, 240, 0.88);
}

.cta-band .btn-primary.v-btn {
  flex-shrink: 0;
  background: #fff !important;
  color: var(--parish-maroon) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18) !important;
}

@media (max-width: 1100px) {
  .info-list {
    grid-template-columns: 1fr;
  }

  .missas {
    max-width: 320px;
  }
}

@media (max-width: 960px) {
  .comunidade-body {
    padding: 28px;
  }
}

@media (max-width: 760px) {
  .comunidade,
  .comunidade--reverse {
    grid-template-columns: 1fr;
  }

  .comunidade--reverse .comunidade-media {
    order: 0;
  }

  .comunidade-media {
    min-height: 0;
    aspect-ratio: 16 / 9;
  }

  .cta-band {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
  }
}

@media (max-width: 600px) {
  .comunidade-body {
    padding: 22px 20px 24px;
  }

  .cta-band {
    margin-top: 48px;
  }
}
</style>
