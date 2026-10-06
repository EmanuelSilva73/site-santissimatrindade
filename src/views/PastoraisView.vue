<script setup>
import { computed } from 'vue'
import { contact, pastorais, pastoraisPage, site } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const page = pastoraisPage

const breadcrumbs = [
  { label: 'Início', to: '/' },
  { label: page.breadcrumb_parent },
  { label: page.breadcrumb_label },
]

/** Trechos entre colchetes são placeholders (texto a confirmar). */
const isPlaceholder = (text) => typeof text === 'string' && text.includes('[')

const sorted = computed(() => [...pastorais].sort((a, b) => a.sort - b.sort))
const destaques = computed(() => sorted.value.filter((p) => p.destaque))
const demais = computed(() => sorted.value.filter((p) => !p.destaque))

const infoFields = (p) => [
  { key: 'coordenador', icon: 'mdi-account-tie-outline', label: page.coordenador_label, value: p.coordenador },
  { key: 'encontros', icon: 'mdi-calendar-clock', label: page.encontros_label, value: p.encontros },
  { key: 'local', icon: 'mdi-map-marker-outline', label: page.local_label, value: p.local },
].filter((f) => f.value)

/** Link interno (/rota ou /#ancora) usa o router; tel:, http… usam href. */
const linkProps = (href) => (href.startsWith('/') ? { to: href } : { href })

const contato = (p) =>
  p.contato_href
    ? { label: p.contato_label || page.contato_fallback_label, href: p.contato_href }
    : { label: page.contato_fallback_label, href: contact.phone_href }
</script>

<template>
  <section class="pastorais-page">
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

      <!-- Destaques: cards largos, na largura do site -->
      <div class="destaques">
        <article
          v-for="(p, i) in destaques"
          :id="p.slug"
          :key="p.id"
          class="destaque card-surface"
          :class="{ 'destaque--reverse': i % 2 === 1 }"
        >
          <div class="destaque-media">
            <img v-if="p.foto_url" :src="p.foto_url" :alt="p.foto_alt" loading="lazy">
            <div v-else class="destaque-placeholder photo-placeholder" role="img" :aria-label="p.foto_alt">
              <v-icon :icon="p.icone" size="72" aria-hidden="true" />
              <span>Foto da pastoral</span>
            </div>
          </div>

          <div class="destaque-body">
            <span class="destaque-icon" aria-hidden="true">
              <v-icon :icon="p.icone" size="22" />
            </span>
            <h2 class="destaque-nome">{{ p.nome }}</h2>
            <p class="destaque-desc" :class="{ 'is-placeholder': isPlaceholder(p.descricao) }">
              {{ p.descricao }}
            </p>

            <dl class="info-list">
              <div v-for="f in infoFields(p)" :key="f.key" class="info-item">
                <dt>
                  <v-icon :icon="f.icon" size="18" aria-hidden="true" />
                  {{ f.label }}
                </dt>
                <dd :class="{ 'is-placeholder': isPlaceholder(f.value) }">{{ f.value }}</dd>
              </div>
            </dl>

            <v-btn
              class="btn-outline destaque-btn"
              variant="outlined"
              size="large"
              v-bind="linkProps(contato(p).href)"
            >
              {{ contato(p).label }}
            </v-btn>
          </div>
        </article>
      </div>

      <!-- Demais pastorais: grade de cards menores -->
      <section v-if="demais.length" class="demais" aria-labelledby="demais-pastorais">
        <h2 id="demais-pastorais" class="section-title">{{ page.demais_title }}</h2>
        <p v-if="page.demais_lead" class="section-lead">{{ page.demais_lead }}</p>

        <div class="demais-grid">
          <article v-for="p in demais" :id="p.slug" :key="p.id" class="pastoral-card card-surface">
            <div class="pastoral-card__head">
              <img
                v-if="p.foto_url"
                class="pastoral-card__thumb"
                :src="p.foto_url"
                :alt="p.foto_alt"
                loading="lazy"
              >
              <span v-else class="pastoral-card__icon" aria-hidden="true">
                <v-icon :icon="p.icone" size="26" />
              </span>
              <h3 class="pastoral-card__nome">{{ p.nome }}</h3>
            </div>
            <p class="pastoral-card__desc" :class="{ 'is-placeholder': isPlaceholder(p.descricao) }">
              {{ p.descricao }}
            </p>
            <p v-if="p.encontros" class="pastoral-card__meta">
              <v-icon icon="mdi-calendar-clock" size="16" aria-hidden="true" />
              <span class="pastoral-card__meta-label">{{ page.encontros_label }}:</span>
              <span :class="{ 'is-placeholder': isPlaceholder(p.encontros) }">{{ p.encontros }}</span>
            </p>
            <RouterLink
              v-if="p.contato_href && p.contato_href.startsWith('/')"
              class="text-link pastoral-card__link"
              :to="p.contato_href"
            >
              {{ p.contato_label }}
            </RouterLink>
            <a v-else-if="p.contato_href" class="text-link pastoral-card__link" :href="p.contato_href">
              {{ p.contato_label }}
            </a>
          </article>
        </div>
      </section>

      <!-- Faixa de chamada -->
      <aside class="cta-band" aria-labelledby="quer-participar">
        <div class="cta-band__copy">
          <h2 id="quer-participar" class="cta-band__title">{{ page.cta_title }}</h2>
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
.pastorais-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 64px;
}

.is-placeholder {
  font-style: italic;
  color: var(--parish-muted) !important;
}

/* Destaques */
.destaques {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.destaque {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  overflow: hidden;
  scroll-margin-top: calc(var(--navbar-height) + 16px);
}

.destaque--reverse {
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
}

.destaque--reverse .destaque-media {
  order: 2;
}

.destaque-media {
  min-height: 340px;
}

.destaque-media img,
.destaque-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.destaque-placeholder {
  flex-direction: column;
  gap: 10px;
}

.destaque-placeholder .v-icon {
  opacity: 0.55;
}

.destaque-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 40px;
}

.destaque-icon,
.pastoral-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(176, 138, 85, 0.14);
  color: var(--parish-maroon);
}

.destaque-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
}

.destaque-nome {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--parish-navy);
}

.destaque-desc {
  margin: 0 0 20px;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--parish-ink);
  max-width: 62ch;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 20px;
  width: 100%;
  margin: 0 0 24px;
  padding: 16px 0 0;
  border-top: 1px solid rgba(27, 42, 74, 0.1);
}

.info-item dt {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
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

.destaque-btn {
  margin-top: auto;
}

/* Demais */
.demais {
  margin-top: 64px;
}

.demais-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.pastoral-card {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 20px;
  scroll-margin-top: calc(var(--navbar-height) + 16px);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.pastoral-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(27, 42, 74, 0.12);
}

.pastoral-card__head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.pastoral-card__icon,
.pastoral-card__thumb {
  width: 52px;
  height: 52px;
}

.pastoral-card__thumb {
  border-radius: 50%;
  object-fit: cover;
}

.pastoral-card__nome {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--parish-navy);
}

.pastoral-card__desc {
  margin: 0 0 14px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--parish-ink);
}

.pastoral-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: auto 0 0;
  padding-top: 12px;
  border-top: 1px solid rgba(27, 42, 74, 0.08);
  font-size: 0.88rem;
  color: var(--parish-navy);
}

.pastoral-card__meta .v-icon {
  color: var(--parish-gold);
}

.pastoral-card__meta-label {
  font-weight: 700;
}

.pastoral-card__link {
  margin-top: 10px;
  font-size: 0.92rem;
}

/* CTA */
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
}

@media (max-width: 960px) {
  .demais-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .destaque-body {
    padding: 28px;
  }
}

@media (max-width: 760px) {
  .destaque,
  .destaque--reverse {
    grid-template-columns: 1fr;
  }

  .destaque--reverse .destaque-media {
    order: 0;
  }

  .destaque-media {
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
  .demais-grid {
    grid-template-columns: 1fr;
  }

  .destaque-body {
    padding: 22px 20px 24px;
  }

  .demais,
  .cta-band {
    margin-top: 48px;
  }
}
</style>
