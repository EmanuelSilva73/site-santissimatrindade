<script setup>
import { site } from '../data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <v-icon icon="mdi-cross" size="22" class="footer-icon" />
        <span>{{ site.name }}</span>
      </div>
      <p class="footer-copy">© {{ year }} {{ site.name }}. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--parish-navy);
  color: rgba(255, 255, 255, 0.85);
  padding: 28px 0;
  border-top: 1px solid rgba(201, 168, 76, 0.25);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
}

.footer-icon {
  color: var(--parish-gold) !important;
}

.footer-copy {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}
</style>
