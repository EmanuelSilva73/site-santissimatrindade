<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { news } from '../data/site'
import NewsCard from '../components/NewsCard.vue'

const route = useRoute()
const router = useRouter()

const perPage = news.per_page
const totalPages = computed(() => Math.max(1, Math.ceil(news.items.length / perPage)))

const page = ref(1)

function syncPageFromQuery() {
  const q = Number(route.query.page)
  if (Number.isFinite(q) && q >= 1 && q <= totalPages.value) {
    page.value = q
  } else {
    page.value = 1
  }
}

syncPageFromQuery()
watch(() => route.query.page, syncPageFromQuery)

const pageItems = computed(() => {
  const start = (page.value - 1) * perPage
  return news.items.slice(start, start + perPage)
})

function onPageChange(p) {
  page.value = p
  router.push({ name: 'noticias', query: p > 1 ? { page: String(p) } : {} })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="news-list">
    <div class="container">
      <nav class="breadcrumb" aria-label="Navegação estrutural">
        <RouterLink to="/">Início</RouterLink>
        <span aria-hidden="true">/</span>
        <span>Notícias</span>
      </nav>

      <header class="news-list__header">
        <h1 class="section-title">{{ news.title }}</h1>
        <p class="section-lead">{{ news.lead }}</p>
      </header>

      <v-row dense>
        <v-col
          v-for="item in pageItems"
          :key="item.id"
          cols="12"
          sm="6"
          lg="3"
        >
          <NewsCard :item="item" />
        </v-col>
      </v-row>

      <div v-if="totalPages > 1" class="news-list__pager">
        <v-pagination
          :model-value="page"
          :length="totalPages"
          :total-visible="7"
          active-color="maroon"
          rounded="circle"
          aria-label="Paginação das notícias"
          @update:model-value="onPageChange"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-list {
  background: #ffffff;
  min-height: 60vh;
  padding: 20px 0 56px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
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

.news-list__header {
  margin-bottom: 28px;
}

.news-list__header .section-title {
  margin-bottom: 8px;
}

.news-list__header .section-lead {
  margin-bottom: 0;
}

.news-list__pager {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
