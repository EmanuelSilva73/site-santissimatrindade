<script setup>
import { news, getHomepageNews } from '../data/site'
import NewsCard from './NewsCard.vue'

const items = getHomepageNews()
</script>

<template>
  <section id="noticias" class="section news">
    <div class="container">
      <div class="news-header">
        <div>
          <h2 class="section-title">{{ news.title }}</h2>
          <p class="section-lead" style="margin-bottom: 0">{{ news.lead }}</p>
        </div>
        <RouterLink class="text-link news-all" :to="news.view_all.to">
          {{ news.view_all.label }}
        </RouterLink>
      </div>

      <v-row dense>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          lg="3"
        >
          <NewsCard :item="item" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.news {
  background: var(--parish-cream);
  padding-top: 24px;
}

.news-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.news-all {
  flex-shrink: 0;
  margin-bottom: 4px;
}
</style>
