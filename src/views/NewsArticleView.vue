<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getNewsBySlug, getRecentNews } from '../data/site'

const route = useRoute()
const article = computed(() => getNewsBySlug(route.params.slug))
const recent = computed(() => getRecentNews(route.params.slug, 5))
</script>

<template>
  <section class="article-page">
    <div class="container">
      <template v-if="article">
        <div class="article-top">
          <nav class="breadcrumb" aria-label="Navegação estrutural">
            <RouterLink to="/">Início</RouterLink>
            <span aria-hidden="true">/</span>
            <RouterLink to="/noticias">Notícias</RouterLink>
            <span aria-hidden="true">/</span>
            <span>{{ article.title }}</span>
          </nav>

          <v-btn
            class="btn-outline back-btn"
            variant="outlined"
            :to="'/noticias'"
            prepend-icon="mdi-arrow-left"
          >
            Voltar
          </v-btn>
        </div>

        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <time class="article-time">{{ article.time }}</time>
            <p class="article-byline">
              Publicado por <strong>{{ article.author }}</strong>
              <span class="article-meta-sep" aria-hidden="true">·</span>
              <time class="article-date">{{ article.date }}</time>
            </p>
          </div>
          <p class="article-excerpt">{{ article.excerpt }}</p>
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

          <aside class="article-sidebar" aria-label="Notícias recentes">
            <div class="sidebar-card card-surface">
              <h2 class="sidebar-title">Notícias recentes</h2>
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
        <div class="article-top">
          <nav class="breadcrumb" aria-label="Navegação estrutural">
            <RouterLink to="/">Início</RouterLink>
            <span aria-hidden="true">/</span>
            <RouterLink to="/noticias">Notícias</RouterLink>
            <span aria-hidden="true">/</span>
            <span>Não encontrada</span>
          </nav>

          <v-btn
            class="btn-outline back-btn"
            variant="outlined"
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
  </section>
</template>

<style scoped>
.article-page {
  background: var(--parish-cream);
  min-height: 60vh;
  padding: 20px 0 56px;
}

.article-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 22px;
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

.back-btn.v-btn {
  min-width: 110px;
  font-weight: 600 !important;
}

.article-header {
  max-width: calc(100% - 332px);
  margin-bottom: 28px;
}

.article-title {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.15;
}

.article-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.article-time {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.article-date {
  font-size: 0.95rem;
  color: var(--parish-muted);
}

.article-meta-sep {
  margin: 0 6px;
  color: var(--parish-muted);
}

.article-byline {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0;
  font-size: 0.95rem;
  color: var(--parish-muted);
}

.article-byline strong {
  color: var(--parish-navy);
  font-weight: 600;
}

.article-excerpt {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--parish-muted);
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 32px;
  align-items: start;
}

.article-photo {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  margin-bottom: 28px;
}

.article-body p {
  margin: 0 0 18px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--parish-ink);
}

.sidebar-card {
  padding: 22px 20px;
  position: sticky;
  top: calc(var(--navbar-height) + 16px);
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
    max-width: none;
  }

  .article-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .sidebar-card {
    position: static;
  }
}
</style>
