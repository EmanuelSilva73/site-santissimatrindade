<script setup>
import { pastorais } from '../data/site'
</script>

<template>
  <section id="pastorais" class="section pastorais">
    <div class="container">
      <div class="pastorais-card card-surface">
        <h2 class="section-title">{{ pastorais.title }}</h2>
        <p class="section-lead" style="margin-bottom: 12px">{{ pastorais.lead }}</p>
        <p class="pastorais-note">{{ pastorais.note }}</p>
        <a class="text-link" href="#contato">Falar com a secretaria</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pastorais {
  background: var(--parish-cream);
  padding-block: 40px;
}

.pastorais-card {
  padding: 32px 28px;
  max-width: 720px;
}

.pastorais-note {
  margin: 0 0 16px;
  color: var(--parish-muted);
  line-height: 1.55;
}
</style>
