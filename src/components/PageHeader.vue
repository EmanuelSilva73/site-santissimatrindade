<script setup>
/**
 * Topo padrão das páginas internas (notícia, História, Pároco…):
 * Voltar + Compartilhar · título · resumo · [meta] · breadcrumb · selo ilustrativo.
 *
 * breadcrumbs: [{ label: 'Início', to: '/' }, { label: 'A Paróquia' }, { label: 'História' }]
 * Itens sem `to` aparecem como texto (último item = página atual).
 */
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  breadcrumbs: { type: Array, default: () => [] },
  backTo: { type: [String, Object], default: '/' },
  backLabel: { type: String, default: 'Voltar' },
  share: { type: Boolean, default: true },
  shareTitle: { type: String, default: '' },
  shareText: { type: String, default: '' },
  shareCopiedMessage: { type: String, default: 'Link da página copiado.' },
  heroIcon: { type: String, default: '' },
  heroLabel: { type: String, default: '' },
})

const snackbar = ref(false)
const snackMsg = ref('')

function pageUrl() {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

async function sharePage() {
  const url = pageUrl()
  const title = props.shareTitle || props.title
  const text = props.shareText || props.excerpt || ''

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url })
      return
    } catch (err) {
      if (err && err.name === 'AbortError') return
    }
  }

  try {
    await navigator.clipboard.writeText(url)
    snackMsg.value = props.shareCopiedMessage
  } catch {
    snackMsg.value = 'Não foi possível compartilhar. Copie o endereço da barra do navegador.'
  }
  snackbar.value = true
}
</script>

<template>
  <div class="page-actions">
    <v-btn
      class="action-btn"
      variant="text"
      :to="backTo"
      prepend-icon="mdi-arrow-left"
    >
      {{ backLabel }}
    </v-btn>
    <v-btn
      v-if="share"
      class="action-btn"
      variant="text"
      prepend-icon="mdi-share-variant"
      type="button"
      @click="sharePage"
    >
      Compartilhar
    </v-btn>
  </div>

  <header class="page-header" :class="{ 'page-header--no-hero': !heroIcon && !$slots.hero }">
    <div class="page-header__copy">
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="excerpt" class="page-excerpt">{{ excerpt }}</p>
      <p v-if="$slots.meta" class="page-meta">
        <slot name="meta" />
      </p>
      <nav v-if="breadcrumbs.length" class="breadcrumb" aria-label="Navegação estrutural">
        <template v-for="(crumb, i) in breadcrumbs" :key="`${i}-${crumb.label}`">
          <span v-if="i > 0" aria-hidden="true">/</span>
          <RouterLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</RouterLink>
          <span v-else :aria-current="i === breadcrumbs.length - 1 ? 'page' : undefined">
            {{ crumb.label }}
          </span>
        </template>
      </nav>
    </div>

    <div v-if="heroIcon || $slots.hero" class="header-hero-wrap">
      <slot name="hero">
        <div class="header-hero" role="img" :aria-label="heroLabel || title">
          <v-icon :icon="heroIcon" size="108" class="header-hero__icon" aria-hidden="true" />
        </div>
      </slot>
    </div>
  </header>

  <v-snackbar v-model="snackbar" :timeout="2800" color="primary" location="bottom">
    {{ snackMsg }}
  </v-snackbar>
</template>

<style scoped>
.page-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-bottom: 18px;
}

.action-btn.v-btn {
  font-weight: 600 !important;
  color: var(--parish-maroon) !important;
  letter-spacing: 0.01em !important;
  text-transform: none !important;
  padding-inline: 10px !important;
}

.action-btn.v-btn:hover,
.action-btn.v-btn:focus-visible {
  color: var(--parish-navy) !important;
  background: rgba(122, 36, 48, 0.06) !important;
}

.page-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 24px 20px;
  align-items: center;
  margin-bottom: 28px;
}

.page-header--no-hero {
  grid-template-columns: minmax(0, 1fr);
}

.page-header__copy {
  min-width: 0;
}

.page-title {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.15;
}

.page-excerpt {
  margin: 0 0 12px;
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--parish-muted);
}

.page-meta {
  margin: 0 0 10px;
  font-size: 0.95rem;
  color: var(--parish-muted);
  line-height: 1.45;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  font-size: 0.9rem;
  color: var(--parish-muted);
}

.breadcrumb a {
  color: var(--parish-gold);
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb a:hover,
.breadcrumb a:focus-visible {
  color: var(--parish-maroon);
  outline: none;
}

.header-hero-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.header-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 148px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f3ebe0 0%, #e8dcc8 55%, #ddcfb6 100%);
  box-shadow: inset 0 0 0 1px rgba(27, 42, 74, 0.06);
  flex-shrink: 0;
}

.header-hero__icon {
  color: var(--parish-navy) !important;
  opacity: 0.85;
}

@media (max-width: 960px) {
  .page-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .header-hero {
    width: 132px;
    height: 132px;
    order: -1;
  }
}
</style>
