<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { navLinks, site } from '../data/site'

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeMenu() {
  menuOpen.value = false
}

function isActive(link) {
  if (link.href === '/noticias') {
    return route.path.startsWith('/noticias')
  }
  if (link.href === '/#inicio' || link.href === '/') {
    return route.path === '/' && (!route.hash || route.hash === '#inicio')
  }
  if (link.href.startsWith('/#')) {
    return route.path === '/' && route.hash === link.href.slice(1)
  }
  return route.path === link.href
}

const links = computed(() => navLinks)
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="container navbar-inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <span class="brand-line1">{{ site.logo_line1 }}</span>
        <span class="brand-line2">{{ site.logo_line2 }}</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Navegação principal">
        <RouterLink
          v-for="link in links"
          :key="link.id"
          :to="link.href"
          :class="{ 'nav-links__active': isActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="menu-toggle__label">{{ menuOpen ? 'Fechar' : 'Menu' }}</span>
        <v-icon :icon="menuOpen ? 'mdi-close' : 'mdi-menu'" size="24" />
      </button>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" class="mobile-menu" aria-label="Navegação principal (mobile)">
        <RouterLink
          v-for="link in links"
          :key="link.id"
          :to="link.href"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.navbar--scrolled {
  border-bottom-color: var(--parish-card-border);
  box-shadow: 0 4px 20px rgba(27, 42, 74, 0.06);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--navbar-height);
  gap: 24px;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-line1 {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--parish-gold);
  letter-spacing: 0.02em;
}

.brand-line2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--parish-navy);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links a {
  position: relative;
  color: var(--parish-navy);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding-bottom: 4px;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--parish-maroon);
  outline: none;
}

.nav-links__active {
  color: var(--parish-maroon) !important;
}

.nav-links__active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--parish-maroon);
  border-radius: 2px;
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding: 8px 12px;
  color: var(--parish-navy);
  background: none;
  border: 1px solid var(--parish-card-border);
  border-radius: 10px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
}

.menu-toggle__label {
  display: inline;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 24px 20px;
  border-top: 1px solid var(--parish-card-border);
  background: #fff;
}

.mobile-menu a {
  padding: 12px 4px;
  color: var(--parish-navy);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(27, 42, 74, 0.06);
}

.mobile-menu a:hover,
.mobile-menu a:focus-visible {
  color: var(--parish-maroon);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 960px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }
}
</style>
