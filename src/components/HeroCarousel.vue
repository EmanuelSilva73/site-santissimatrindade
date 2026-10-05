<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { heroCarousel } from '../data/site'

const slides = heroCarousel.slides
const current = ref(0)
const paused = ref(false)
const hovering = ref(false)
let timer = null

const slide = computed(() => slides[current.value])
const shouldRun = computed(() => !paused.value && !hovering.value)

function goTo(index) {
  current.value = (index + slides.length) % slides.length
  restartTimer()
}

function next() {
  goTo(current.value + 1)
}

function prev() {
  goTo(current.value - 1)
}

function togglePause() {
  paused.value = !paused.value
}

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartTimer() {
  clearTimer()
  if (shouldRun.value) {
    timer = setInterval(() => {
      current.value = (current.value + 1) % slides.length
    }, heroCarousel.autoplay_ms)
  }
}

watch(shouldRun, restartTimer)

onMounted(restartTimer)
onUnmounted(clearTimer)

function linkAttrs(btn) {
  if (!btn) return {}
  if (btn.external) {
    return { href: btn.href, target: '_blank', rel: 'noopener noreferrer' }
  }
  return { href: btn.href }
}
</script>

<template>
  <section
    id="inicio"
    class="hero section"
    aria-roledescription="carrossel"
    aria-label="Banners da paróquia"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="selo" :class="{ 'selo--solid': slide.id === 1 }">{{ slide.selo }}</span>
        <h1 class="hero-title">{{ slide.titulo }}</h1>
        <p class="hero-text">{{ slide.texto }}</p>

        <div class="hero-actions">
          <v-btn
            class="btn-primary"
            variant="flat"
            size="large"
            v-bind="linkAttrs(slide.botao_principal)"
          >
            {{ slide.botao_principal.label }}
          </v-btn>
          <v-btn
            class="btn-outline"
            variant="outlined"
            size="large"
            v-bind="linkAttrs(slide.botao_secundario)"
          >
            {{ slide.botao_secundario.label }}
          </v-btn>
        </div>

        <div class="hero-controls" role="group" aria-label="Controles do carrossel">
          <button type="button" class="ctrl-btn" aria-label="Banner anterior" @click="prev">
            <v-icon icon="mdi-chevron-left" size="22" />
          </button>
          <button type="button" class="ctrl-btn" aria-label="Próximo banner" @click="next">
            <v-icon icon="mdi-chevron-right" size="22" />
          </button>

          <div class="dots" role="tablist" aria-label="Selecionar banner">
            <button
              v-for="(s, i) in slides"
              :key="s.id"
              type="button"
              class="dot"
              :class="{ 'dot--active': i === current }"
              role="tab"
              :aria-selected="i === current"
              :aria-label="`Banner ${i + 1}: ${s.selo}`"
              @click="goTo(i)"
            />
          </div>

          <button
            type="button"
            class="ctrl-btn"
            :aria-label="paused ? 'Retomar carrossel' : 'Pausar carrossel'"
            @click="togglePause"
          >
            <v-icon :icon="paused ? 'mdi-play' : 'mdi-pause'" size="18" />
          </button>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-photo photo-placeholder" role="img" :aria-label="slide.foto.alt">
          <span>{{ slide.foto.label }}</span>
        </div>

        <aside class="hero-card card-surface" :aria-label="slide.cartao.destaque">
          <p class="hero-card__top">
            <span class="hero-card__dot" aria-hidden="true" />
            {{ slide.cartao.linha_cima }}
          </p>
          <h2 class="hero-card__title">{{ slide.cartao.destaque }}</h2>
          <p v-if="slide.cartao.complemento" class="hero-card__comp">
            {{ slide.cartao.complemento }}
          </p>
          <p v-if="slide.cartao.rotulo_info" class="hero-card__info">
            {{ slide.cartao.rotulo_info }}
          </p>
          <a
            v-if="slide.cartao.link"
            class="text-link hero-card__link"
            v-bind="linkAttrs(slide.cartao.link)"
          >
            {{ slide.cartao.link.label }}
          </a>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 40px;
  padding-bottom: 72px;
  background: var(--parish-cream);
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 48px;
  align-items: center;
}

.hero-copy {
  min-width: 0;
}

.hero-title {
  margin: 18px 0 16px;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.08;
  color: var(--parish-navy);
  white-space: pre-line;
}

.hero-text {
  margin: 0 0 28px;
  max-width: 38ch;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--parish-muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.hero-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(27, 42, 74, 0.18);
  background: transparent;
  color: var(--parish-navy);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.ctrl-btn:hover,
.ctrl-btn:focus-visible {
  border-color: var(--parish-maroon);
  color: var(--parish-maroon);
  outline: none;
}

.dots {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-inline: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #d8cfc0;
  cursor: pointer;
  transition: width 0.2s ease, background 0.2s ease, border-radius 0.2s ease;
}

.dot--active {
  width: 28px;
  border-radius: 999px;
  background: var(--parish-maroon);
}

.hero-visual {
  position: relative;
  min-height: 420px;
}

.hero-photo {
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  aspect-ratio: 4 / 5;
  border-radius: 220px 220px 28px 28px;
  box-shadow: 0 18px 40px rgba(27, 42, 74, 0.12);
}

.hero-card {
  position: absolute;
  left: 0;
  bottom: 24px;
  width: min(100%, 300px);
  padding: 20px 22px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
}

.hero-card__top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--parish-gold);
}

.hero-card__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--parish-maroon);
  flex-shrink: 0;
}

.hero-card__title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--parish-navy);
  line-height: 1.2;
}

.hero-card__comp,
.hero-card__info {
  margin: 0 0 8px;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--parish-muted);
}

.hero-card__link {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.92rem;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-visual {
    min-height: 0;
    max-width: 420px;
    margin-inline: auto;
    width: 100%;
  }

  .hero-photo {
    margin-inline: auto;
  }

  .hero-card {
    position: relative;
    left: auto;
    bottom: auto;
    width: 100%;
    margin-top: -48px;
    margin-inline: auto;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-top: 24px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .v-btn {
    width: 100%;
  }
}
</style>
