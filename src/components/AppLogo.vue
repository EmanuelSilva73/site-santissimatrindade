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
      height="72"
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
  max-width: min(320px, 62vw);
  object-fit: contain;
}

.app-logo--footer .app-logo__img {
  height: 40px;
  max-width: min(220px, 70vw);
}

@media (max-width: 600px) {
  .app-logo--nav .app-logo__img {
    height: 48px;
    max-width: min(220px, 54vw);
  }
}
</style>
