<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <article class="news-card card-surface">
    <div
      class="news-card__photo photo-placeholder"
      role="img"
      :aria-label="item.photo_label"
    >
      <span>{{ item.photo_label }}</span>
    </div>
    <div class="news-card__body">
      <div class="news-card__meta">
        <span class="news-card__cat">{{ item.category }}</span>
        <time class="news-card__date">{{ item.date }}</time>
      </div>
      <h3 class="news-card__title">
        <RouterLink :to="`/noticias/${item.slug}`" class="news-card__title-link">
          {{ item.title }}
        </RouterLink>
      </h3>
      <p class="news-card__excerpt">{{ item.excerpt }}</p>
      <RouterLink class="text-link" :to="`/noticias/${item.slug}`">
        Ler notícia
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.news-card__photo {
  aspect-ratio: 16 / 10;
  width: 100%;
}

.news-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 18px 20px;
  flex: 1;
}

.news-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.news-card__cat {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(122, 36, 48, 0.1);
  color: var(--parish-maroon);
  font-size: 0.75rem;
  font-weight: 700;
}

.news-card__date {
  font-size: 0.82rem;
  color: var(--parish-muted);
}

.news-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.25;
}

.news-card__title-link {
  color: inherit;
  text-decoration: none;
}

.news-card__title-link:hover,
.news-card__title-link:focus-visible {
  color: var(--parish-maroon);
  outline: none;
}

.news-card__excerpt {
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--parish-muted);
}
</style>
