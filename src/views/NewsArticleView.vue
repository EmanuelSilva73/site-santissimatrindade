<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNewsBySlug, getRecentNews } from '../data/site'

const route = useRoute()
const article = computed(() => getNewsBySlug(route.params.slug))
const recent = computed(() => getRecentNews(route.params.slug, 5))

const snackbar = ref(false)
const snackMsg = ref('')

function articleUrl() {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

async function shareArticle() {
  const url = articleUrl()
  const title = article.value?.title || 'Notícia'
  const text = article.value?.excerpt || ''

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
    snackMsg.value = 'Link da notícia copiado.'
  } catch {
    snackMsg.value = 'Não foi possível compartilhar. Copie o endereço da barra do navegador.'
  }
  snackbar.value = true
}
</script>

<template>
  <section class="article-page">
    <div class="container">
      <template v-if="article">
        <div class="article-actions">
          <v-btn
            class="action-btn"
            variant="text"
            :to="'/noticias'"
            prepend-icon="mdi-arrow-left"
          >
            Voltar
          </v-btn>
          <v-btn
            class="action-btn"
            variant="text"
            prepend-icon="mdi-share-variant"
            type="button"
            @click="shareArticle"
          >
            Compartilhar
          </v-btn>
        </div>

        <header class="article-header">
          <div class="article-header__copy">
            <h1 class="article-title">{{ article.title }}</h1>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <p class="article-meta">
              <time>{{ article.time }} · {{ article.date }}</time>
              <span aria-hidden="true"> · </span>
              <span>Por {{ article.author }}</span>
            </p>
            <nav class="breadcrumb" aria-label="Navegação estrutural">
              <RouterLink to="/">Início</RouterLink>
              <span aria-hidden="true">/</span>
              <RouterLink to="/noticias">Notícias</RouterLink>
              <span aria-hidden="true">/</span>
              <span>{{ article.title }}</span>
            </nav>
          </div>

          <div
            class="header-hero"
            role="img"
            aria-label="Ilustração padrão de notícia"
          >
            <v-icon
              icon="mdi-newspaper-variant-outline"
              size="108"
              class="header-hero__icon"
              aria-hidden="true"
            />
          </div>
        </header>

        <div class="article-layout">
          <article class="article-main">
            <div
              class="article-photo photo-placeholder"
              role="img"
              :aria-label="article.photo_label"
            >
              <span>{{ article.photo_label }}</span>
            </div>

            <div class="article-body">
              <p v-for="(paragraph, i) in article.body" :key="i">
                {{ paragraph }}
              </p>
            </div>
          </article>

          <aside class="article-sidebar" aria-label="Notícias Recentes">
            <div class="sidebar-card card-surface">
              <h2 class="sidebar-title">Notícias Recentes:</h2>
              <ul class="sidebar-list">
                <li
                  v-for="item in recent"
                  :key="item.id"
                  class="sidebar-list__item"
                >
                  <RouterLink :to="`/noticias/${item.slug}`" class="sidebar-item">
                    <span class="sidebar-item__cat">{{ item.category }}</span>
                    <span class="sidebar-item__title">{{ item.title }}</span>
                    <span class="sidebar-item__meta">
                      {{ item.date }} · {{ item.time }}
                    </span>
                  </RouterLink>
                </li>
              </ul>
              <RouterLink class="text-link sidebar-all" to="/noticias">
                Ver todas
              </RouterLink>
            </div>
          </aside>
        </div>
      </template>

      <template v-else>
        <div class="article-actions">
          <v-btn
            class="action-btn"
            variant="text"
            :to="'/noticias'"
            prepend-icon="mdi-arrow-left"
          >
            Voltar
          </v-btn>
        </div>
        <div class="not-found card-surface">
          <h1 class="section-title">Notícia não encontrada</h1>
          <p class="section-lead">
            Não há publicação com o endereço
            <code>/noticias/{{ route.params.slug }}</code>.
          </p>
          <RouterLink class="text-link" to="/noticias">
            Ver todas as notícias
          </RouterLink>
        </div>
      </template>
    </div>

    <v-snackbar v-model="snackbar" :timeout="2800" color="primary" location="bottom">
      {{ snackMsg }}
    </v-snackbar>
  </section>
</template>

<style scoped>
.article-page {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 56px;
}

.article-actions {
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

.article-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px 28px;
  align-items: center;
  margin-bottom: 28px;
}

.article-header__copy {
  min-width: 0;
}

.article-title {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.15;
}

.article-meta {
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

.article-excerpt {
  margin: 0 0 12px;
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--parish-muted);
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

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 20px;
  align-items: start;
}

.article-photo {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  margin: 0 0 28px;
}

.article-body p {
  margin: 0 0 18px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--parish-ink);
}

.article-sidebar {
  position: sticky;
  top: calc(var(--navbar-height) + 16px);
}

.sidebar-card {
  padding: 22px 20px;
}

.sidebar-title {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.sidebar-list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-list__item {
  border-bottom: 1px solid rgba(27, 42, 74, 0.1);
}

.sidebar-list__item:last-child {
  border-bottom: 0;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 4px;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
  border-radius: 8px;
}

.sidebar-item:hover,
.sidebar-item:focus-visible {
  background: rgba(176, 138, 85, 0.1);
  outline: none;
}

.sidebar-item__cat {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--parish-maroon);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.sidebar-item__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.25;
}

.sidebar-item__meta {
  font-size: 0.8rem;
  color: var(--parish-muted);
}

.sidebar-all {
  font-size: 0.92rem;
}

.not-found {
  padding: 40px 28px;
  max-width: 640px;
}

.not-found code {
  font-size: 0.9em;
  word-break: break-all;
}

@media (max-width: 960px) {
  .article-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .header-hero {
    width: 132px;
    height: 132px;
    order: -1;
  }

  .article-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .article-sidebar {
    position: static;
  }
}
</style>
