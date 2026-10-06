<script setup>
import { site } from '../data/site'

defineProps({
  /** Visual size variant */
  size: {
    type: String,
    default: 'nav', // 'nav' | 'footer'
  },
})
</script>

<template>
  <RouterLink to="/" class="app-logo" :class="`app-logo--${size}`">
    <img
      src="/logo-paroquia.png"
      :alt="site.name"
      class="app-logo__img"
      width="280"
      height="80"
      decoding="async"
    >
  </RouterLink>
</template>

<style scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  line-height: 0;
}

.app-logo__img {
  display: block;
  width: auto;
  height: 64px;
  max-width: min(300px, 54vw);
  object-fit: contain;
}

.app-logo--footer .app-logo__img {
  height: 48px;
  max-width: min(240px, 70vw);
}

@media (max-width: 800px) {
  .app-logo--nav .app-logo__img {
    height: 46px;
    max-width: min(180px, 46vw);
  }
}
</style>
