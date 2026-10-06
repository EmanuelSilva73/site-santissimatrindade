<script setup>
import { computed } from 'vue'
import { parocos, parocosPage, site } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const page = parocosPage

const breadcrumbs = [
  { label: 'Início', to: '/' },
  { label: page.breadcrumb_parent },
  { label: page.breadcrumb_label },
]

/** Trechos entre colchetes são placeholders (texto a confirmar). */
const isPlaceholder = (text) => typeof text === 'string' && text.includes('[')

/** Atual primeiro; depois anteriores pelo `sort` (mais recente → mais antigo). */
const sorted = computed(() =>
  [...parocos].sort((a, b) => Number(b.atual) - Number(a.atual) || a.sort - b.sort),
)
const atuais = computed(() => sorted.value.filter((p) => p.atual))
const anteriores = computed(() => sorted.value.filter((p) => !p.atual))

const nomeCompleto = (p) => [p.titulo, p.nome].filter(Boolean).join(' ')
const periodoFim = (p) => p.periodo_fim ?? page.atual_periodo_fim_label
const paragrafos = (p) => (Array.isArray(p.biografia) ? p.biografia : [p.biografia]).filter(Boolean)
</script>

<template>
  <section class="parocos-page">
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

      <template v-for="grupo in [{ id: 'atual', items: atuais }, { id: 'anteriores', items: anteriores }]" :key="grupo.id">
        <h2
          v-if="grupo.id === 'anteriores' && grupo.items.length"
          class="section-title parocos-subtitle"
        >
          {{ page.anteriores_title }}
        </h2>

        <article
          v-for="p in grupo.items"
          :key="p.id"
          class="paroco"
          :class="{ 'paroco--atual': p.atual }"
          :aria-label="nomeCompleto(p)"
        >
          <figure class="paroco-figure">
            <img
              v-if="p.foto_url"
              class="paroco-photo"
              :src="p.foto_url"
              :alt="p.foto_alt"
              loading="lazy"
            >
            <div v-else class="paroco-photo photo-placeholder" role="img" :aria-label="p.foto_alt">
              <v-icon icon="mdi-account" size="72" aria-hidden="true" />
              <span>{{ page.foto_placeholder_label }}</span>
            </div>
          </figure>

          <div class="paroco-copy">
            <div v-if="p.atual || p.tag" class="paroco-badges">
              <span v-if="p.atual" class="paroco-badge">
                <v-icon icon="mdi-cross" size="14" aria-hidden="true" />
                {{ page.atual_label }}
              </span>
              <span v-if="p.tag" class="paroco-badge paroco-badge--tag">
                <v-icon icon="mdi-star-four-points-outline" size="14" aria-hidden="true" />
                {{ p.tag }}
              </span>
            </div>

            <h3 class="paroco-nome" :class="{ 'is-placeholder': isPlaceholder(p.nome) }">
              {{ nomeCompleto(p) }}
            </h3>
            <p v-if="p.apelido" class="paroco-apelido">{{ p.apelido }}</p>

            <p class="paroco-periodo">
              <v-icon icon="mdi-calendar-range" size="16" aria-hidden="true" />
              <span class="paroco-periodo__label">{{ page.periodo_label }}:</span>
              <span>
                <span :class="{ 'is-placeholder': isPlaceholder(p.periodo_inicio) }">{{ p.periodo_inicio }}</span>
                –
                <span :class="{ 'is-placeholder': isPlaceholder(periodoFim(p)) }">{{ periodoFim(p) }}</span>
              </span>
              <span v-if="p.periodo_nota" class="paroco-periodo__nota">· {{ p.periodo_nota }}</span>
            </p>

            <div class="paroco-bio">
              <p
                v-for="(paragraph, i) in paragrafos(p)"
                :key="i"
                :class="{ 'is-placeholder': isPlaceholder(paragraph) }"
              >
                {{ paragraph }}
              </p>
            </div>

            <blockquote v-if="p.frase" class="paroco-quote">
              <p :class="{ 'is-placeholder': isPlaceholder(p.frase) }">“{{ p.frase }}”</p>
              <cite>{{ p.frase_fonte || nomeCompleto(p) }}</cite>
            </blockquote>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>

<style scoped>
.parocos-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 64px;
}

.paroco {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 40px;
  align-items: start;
  padding: 40px 0;
  border-top: 1px solid rgba(27, 42, 74, 0.1);
}

.paroco--atual {
  padding: 36px;
  border: 1px solid rgba(176, 138, 85, 0.28);
  border-radius: var(--radius-card);
  background: linear-gradient(180deg, rgba(176, 138, 85, 0.07), rgba(176, 138, 85, 0.02));
}

.parocos-subtitle {
  margin: 56px 0 8px;
}

.parocos-subtitle + .paroco {
  border-top: 0;
}

/* Foto redonda — mesmo estilo de /historia */
.paroco-figure {
  --photo-size: 220px;
  width: var(--photo-size);
  height: var(--photo-size);
  margin: 0;
}

.paroco-photo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow:
    0 0 0 2px rgba(176, 138, 85, 0.45),
    var(--parish-shadow);
}

.paroco-photo.photo-placeholder {
  padding: 28px;
  text-align: center;
  line-height: 1.3;
}

.paroco-photo.photo-placeholder .v-icon {
  opacity: 0.55;
}

.paroco-copy {
  min-width: 0;
  max-width: 820px;
}

.paroco-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.paroco-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: var(--parish-maroon);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.paroco-nome {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--parish-navy);
}

.paroco-badge--tag {
  background: rgba(176, 138, 85, 0.14);
  color: var(--parish-maroon);
  border: 1px solid rgba(176, 138, 85, 0.45);
}

.paroco-apelido {
  margin: -4px 0 12px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--parish-gold);
}

.paroco-periodo__nota {
  color: var(--parish-muted);
}

.paroco--atual .paroco-nome {
  font-size: clamp(1.9rem, 3.4vw, 2.5rem);
}

.paroco-periodo {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0 0 20px;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(176, 138, 85, 0.4);
  background: #fff;
  font-size: 0.92rem;
  color: var(--parish-navy);
}

.paroco-periodo .v-icon {
  color: var(--parish-gold);
}

.paroco-periodo__label {
  font-weight: 700;
}

.paroco-bio p {
  margin: 0 0 16px;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--parish-ink);
}

.is-placeholder {
  font-style: italic;
  color: var(--parish-muted) !important;
}

.paroco-bio p.is-placeholder {
  padding: 10px 14px;
  border-left: 3px dashed rgba(176, 138, 85, 0.6);
  background: rgba(176, 138, 85, 0.06);
  border-radius: 0 10px 10px 0;
  font-size: 1rem;
}

/* Citação — mesmo estilo de /historia */
.paroco-quote {
  margin: 24px 0 0;
  padding: 6px 0 6px 22px;
  border-left: 3px solid var(--parish-gold);
}

.paroco-quote p {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.4vw, 1.6rem);
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
  color: var(--parish-navy);
}

.paroco-quote cite {
  font-style: normal;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--parish-maroon);
}

@media (max-width: 960px) {
  .paroco {
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 28px;
  }

  .paroco-figure {
    --photo-size: 180px;
  }

  .paroco--atual {
    padding: 28px;
  }
}

@media (max-width: 600px) {
  .paroco {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 32px 0;
  }

  .paroco--atual {
    padding: 24px 18px;
  }

  .paroco-figure {
    --photo-size: 160px;
    margin-inline: auto;
  }

  .paroco-copy {
    text-align: left;
  }

  .paroco-badges {
    justify-content: center;
  }

  .paroco-nome,
  .paroco-apelido {
    text-align: center;
  }

  .paroco-periodo {
    display: flex;
    justify-content: center;
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    border-radius: 14px;
    text-align: center;
  }

  .parocos-subtitle {
    margin-top: 44px;
  }
}
</style>
