<script setup>
import { ref } from 'vue'
import { dizimo } from '../data/site'

const snackbar = ref(false)
const snackMsg = ref('')

async function copyPix() {
  try {
    await navigator.clipboard.writeText(dizimo.pix_key)
    snackMsg.value = 'Chave PIX copiada.'
  } catch {
    snackMsg.value = 'Não foi possível copiar. Selecione e copie manualmente.'
  }
  snackbar.value = true
}
</script>

<template>
  <section id="dizimo" class="section section--maroon dizimo">
    <div class="container">
      <v-row align="center">
        <v-col cols="12" md="6">
          <h2 class="section-title">{{ dizimo.title }}</h2>
          <p class="dizimo-text">{{ dizimo.text }}</p>
          <blockquote class="dizimo-quote">
            <p>“{{ dizimo.quote }}”</p>
            <cite>{{ dizimo.quote_ref }}</cite>
          </blockquote>
        </v-col>

        <v-col cols="12" md="6">
          <div class="pix-card card-surface">
            <p class="pix-card__label">{{ dizimo.pix_label }}</p>
            <div class="pix-card__key" aria-label="Chave PIX">
              {{ dizimo.pix_key }}
            </div>
            <v-btn class="btn-primary" variant="flat" block size="large" @click="copyPix">
              {{ dizimo.copy_label }}
            </v-btn>
            <p class="pix-card__note">{{ dizimo.pix_note }}</p>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar" :timeout="2800" color="primary" location="bottom">
      {{ snackMsg }}
    </v-snackbar>
  </section>
</template>

<style scoped>
.dizimo-text {
  margin: 0 0 28px;
  max-width: 42ch;
  font-size: 1.08rem;
  line-height: 1.65;
  color: rgba(255, 248, 240, 0.9);
}

.dizimo-quote {
  margin: 0;
  padding: 0;
  border: 0;
}

.dizimo-quote p {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
  color: #fff8f0;
}

.dizimo-quote cite {
  font-style: normal;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--parish-gold);
}

.pix-card {
  padding: 28px 26px;
  max-width: 420px;
  margin-left: auto;
}

.pix-card__label {
  margin: 0 0 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--parish-gold);
}

.pix-card__key {
  margin-bottom: 16px;
  padding: 14px 16px;
  border: 1.5px dashed rgba(27, 42, 74, 0.25);
  border-radius: 12px;
  background: var(--parish-cream);
  color: var(--parish-navy);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.95rem;
  word-break: break-all;
}

.pix-card__note {
  margin: 14px 0 0;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--parish-muted);
  text-align: center;
}

@media (max-width: 960px) {
  .pix-card {
    margin-inline: auto;
  }
}
</style>
