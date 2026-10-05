<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getNewsBySlug } from '../data/site'

const route = useRoute()
const article = computed(() => getNewsBySlug(route.params.slug))
</script>

<template>
  <section class="section article-page">
    <div class="container article-wrap">
      <template v-if="article">
        <nav class="breadcrumb" aria-label="Navegação estrutural">
          <RouterLink to="/">Início</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink to="/noticias">Notícias</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ article.title }}</span>
        </nav>

        <article>
          <header class="article-header">
            <div class="article-meta">
              <span class="article-cat">{{ article.category }}</span>
              <time class="article-date">{{ article.date }}</time>
            </div>
            <h1 class="article-title">{{ article.title }}</h1>
            <p class="article-excerpt">{{ article.excerpt }}</p>
          </header>

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

          <p class="article-back">
            <RouterLink class="text-link" to="/noticias">
              ← Voltar para todas as notícias
            </RouterLink>
          </p>
        </article>
      </template>

      <template v-else>
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
}

.article-wrap {
  max-width: 760px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
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

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.article-cat {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(122, 36, 48, 0.1);
  color: var(--parish-maroon);
  font-size: 0.75rem;
  font-weight: 700;
}

.article-date {
  font-size: 0.9rem;
  color: var(--parish-muted);
}

.article-title {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.15;
}

.article-excerpt {
  margin: 0 0 28px;
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--parish-muted);
}

.article-photo {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  margin-bottom: 32px;
}

.article-body p {
  margin: 0 0 18px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--parish-ink);
}

.article-back {
  margin: 36px 0 0;
}

.not-found {
  padding: 40px 28px;
}

.not-found code {
  font-size: 0.9em;
  word-break: break-all;
}
</style>
