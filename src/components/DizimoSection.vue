<script setup>
import { dizimo } from '../data/site'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section id="dizimo" class="section section--maroon dizimo">
    <div class="container dizimo-inner">
      <img
        class="dizimo-watermark"
        :src="`${base}dizimo-watermark.png`"
        alt=""
        aria-hidden="true"
        width="822"
        height="694"
      >
      <v-row align="start">
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
            <div class="pix-qr">
              <img
                v-if="dizimo.pix_qr_url"
                class="pix-qr__img"
                :src="dizimo.pix_qr_url"
                :alt="dizimo.pix_qr_alt"
                width="200"
                height="200"
              >
              <div
                v-else
                class="pix-qr__placeholder"
                role="img"
                :aria-label="`${dizimo.pix_qr_label} (a confirmar)`"
              >
                <v-icon icon="mdi-qrcode" size="96" aria-hidden="true" />
                <span>{{ dizimo.pix_qr_label }}</span>
              </div>
            </div>
            <p class="pix-card__hint">{{ dizimo.pix_qr_hint }}</p>

            <p v-if="dizimo.pix_favorecido" class="pix-card__favorecido">
              Favorecido: <strong>{{ dizimo.pix_favorecido }}</strong>
            </p>
            <p class="pix-card__note">{{ dizimo.pix_note }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style scoped>
.dizimo {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* Marca d'água: coração com cruz, silhueta clara em baixa opacidade.
   Desktop: centralizada no vão entre o texto (≈346px a partir da borda do container)
   e o card do QR (420px de largura, alinhado à direita) → centro = 50% − 37px. */
.dizimo-watermark {
  position: absolute;
  top: 50%;
  left: calc(50% - 37px);
  width: min(380px, calc(100% - 746px));
  height: auto;
  opacity: 0.09;
  transform: translate(-50%, -50%) rotate(-8deg);
  pointer-events: none;
  user-select: none;
  z-index: -1;
}

.dizimo-inner {
  position: relative;
}

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

.pix-qr {
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0 auto 10px;
  padding: 12px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(27, 42, 74, 0.1);
  box-shadow: 0 4px 14px rgba(27, 42, 74, 0.06);
}

.pix-qr__img {
  display: block;
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.pix-qr__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 200px;
  height: 200px;
  border: 2px dashed rgba(27, 42, 74, 0.25);
  border-radius: 10px;
  color: var(--parish-navy);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pix-qr__placeholder .v-icon {
  opacity: 0.7;
}

.pix-card__hint {
  margin: 0 0 20px;
  font-size: 0.85rem;
  color: var(--parish-muted);
  text-align: center;
}

.pix-card__favorecido {
  margin: 0;
  text-align: center;
  font-size: 0.85rem;
  color: var(--parish-muted);
}

.pix-card__favorecido strong {
  color: var(--parish-navy);
  font-weight: 600;
}

.pix-card__note {
  margin: 14px 0 0;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--parish-muted);
  text-align: center;
}

/* Entre 960px e 1100px o vão fica estreito demais: oculta. */
@media (max-width: 1100px) {
  .dizimo-watermark {
    display: none;
  }
}

/* Mobile (colunas empilhadas): discreta, atrás do topo do conteúdo. */
@media (max-width: 960px) {
  .pix-card {
    margin-inline: auto;
  }

  .dizimo-watermark {
    display: block;
    top: -20px;
    left: 50%;
    width: min(300px, 80%);
    opacity: 0.06;
    transform: translateX(-50%) rotate(-8deg);
  }
}
</style>
