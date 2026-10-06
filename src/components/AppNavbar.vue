<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navLinks, site, contact, news } from '../data/site'
import AppLogo from './AppLogo.vue'

const STORAGE_KEY = 'pst-a11y'

const route = useRoute()
const router = useRouter()

const menuOpen = ref(false)
const scrolled = ref(false)
const hidden = ref(false)
const lastScrollY = ref(0)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const a11yOpen = ref(false)

// Desktop dropdowns (key = link.id) and mobile groups
const openDropdown = ref(null)
const dropdownPinned = ref(false) // opened by click/keyboard (not just hover)
const dropdownRefs = {}
const mobileGroupsOpen = ref({})
let hoverCloseTimer = null

const fontScale = ref(100)
const highContrast = ref(false)
const underlineLinks = ref(false)

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 8

  // Keep header visible while overlays/menus are open
  if (menuOpen.value || searchOpen.value || a11yOpen.value) {
    hidden.value = false
    lastScrollY.value = y
    return
  }

  if (y < 10) {
    hidden.value = false
  } else if (y > lastScrollY.value && y > 80) {
    // Scrolling down past threshold — hide whole sticky header
    hidden.value = true
  } else if (y < lastScrollY.value) {
    // Scrolling up — reveal
    hidden.value = false
  }

  lastScrollY.value = y
}

function applyA11y() {
  const root = document.documentElement
  root.dataset.fontScale = String(fontScale.value)
  root.classList.toggle('a11y-contrast', highContrast.value)
  root.classList.toggle('a11y-underline-links', underlineLinks.value)
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        fontScale: fontScale.value,
        highContrast: highContrast.value,
        underlineLinks: underlineLinks.value,
      }),
    )
  } catch {
    /* ignore quota / private mode */
  }
}

function loadA11y() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if ([100, 115, 130].includes(data.fontScale)) fontScale.value = data.fontScale
    highContrast.value = Boolean(data.highContrast)
    underlineLinks.value = Boolean(data.underlineLinks)
  } catch {
    /* ignore */
  }
}

function increaseFont() {
  if (fontScale.value < 130) {
    fontScale.value = fontScale.value === 100 ? 115 : 130
    applyA11y()
  }
}

function decreaseFont() {
  if (fontScale.value > 100) {
    fontScale.value = fontScale.value === 130 ? 115 : 100
    applyA11y()
  }
}

function toggleContrast() {
  highContrast.value = !highContrast.value
  applyA11y()
}

function toggleUnderline() {
  underlineLinks.value = !underlineLinks.value
  applyA11y()
}

function resetA11y() {
  fontScale.value = 100
  highContrast.value = false
  underlineLinks.value = false
  applyA11y()
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (openDropdown.value) {
      const id = openDropdown.value
      closeDropdown()
      dropdownRefs[id]?.querySelector('.nav-dropdown__trigger')?.focus()
    } else if (searchOpen.value) closeSearch()
    else if (a11yOpen.value) a11yOpen.value = false
    else if (menuOpen.value) menuOpen.value = false
  }
}

function onHeaderFocusIn() {
  // Keyboard / assistive tech: if focus lands in the header while hidden, reveal it
  if (hidden.value) hidden.value = false
}

watch([menuOpen, searchOpen, a11yOpen], ([menu, search, a11y]) => {
  if (menu || search || a11y) hidden.value = false
})

onMounted(() => {
  loadA11y()
  applyA11y()
  lastScrollY.value = window.scrollY
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  clearTimeout(hoverCloseTimer)
})

function closeMenu() {
  menuOpen.value = false
}

async function openSearch() {
  closeDropdown()
  searchOpen.value = true
  menuOpen.value = false
  a11yOpen.value = false
  await nextTick()
  searchInput.value?.focus()
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}

function toggleA11y() {
  a11yOpen.value = !a11yOpen.value
  if (a11yOpen.value) {
    menuOpen.value = false
    searchOpen.value = false
  }
}

/** Follows simple string redirects declared in the router (e.g. /pastorais -> /#pastorais). */
function resolveHref(href) {
  const record = router.getRoutes().find((r) => r.path === href)
  return typeof record?.redirect === 'string' ? record.redirect : href
}

function isActive(link) {
  if (link.children?.length) {
    return link.children.some((child) => isActive(child))
  }
  if (!link.href) return false
  const href = resolveHref(link.href)
  if (href !== link.href) return isActive({ ...link, href })
  if (link.href === '/noticias') {
    return route.path.startsWith('/noticias')
  }
  if (link.href === '/#inicio' || link.href === '/') {
    return route.path === '/' && (!route.hash || route.hash === '#inicio')
  }
  // Âncoras da home não ficam marcadas como ativas (evita destaque "preso"
  // no último item clicado, ex.: Contato). O destaque fixo é via `highlight`.
  if (link.href.startsWith('/#')) return false
  return route.path === link.href || route.path.startsWith(`${link.href}/`)
}

const links = computed(() => navLinks)

/** Flat list of navigable entries (parents with children are expanded). */
const flatLinks = computed(() =>
  navLinks.flatMap((link) => {
    if (!link.children?.length) return [{ ...link, parentLabel: null }]
    return [
      // Parent itself is searchable and leads to its first child
      { id: link.id, label: link.label, href: link.children[0].href, parentLabel: null },
      ...link.children.map((child) => ({ ...child, parentLabel: link.label })),
    ]
  }),
)

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function dropdownId(link) {
  return `nav-dropdown-${link.id}`
}

function openDropdownFor(link, { pinned = false } = {}) {
  clearTimeout(hoverCloseTimer)
  openDropdown.value = link.id
  dropdownPinned.value = pinned
}

function closeDropdown() {
  clearTimeout(hoverCloseTimer)
  openDropdown.value = null
  dropdownPinned.value = false
}

function toggleDropdown(link) {
  if (openDropdown.value === link.id && dropdownPinned.value) {
    closeDropdown()
  } else {
    // Clicking while hover-opened "pins" it open instead of closing it
    openDropdownFor(link, { pinned: true })
  }
}

function onDropdownEnter(link) {
  if (openDropdown.value === link.id) {
    clearTimeout(hoverCloseTimer)
    return
  }
  openDropdownFor(link)
}

function onDropdownLeave(link) {
  if (openDropdown.value !== link.id || dropdownPinned.value) return
  clearTimeout(hoverCloseTimer)
  hoverCloseTimer = setTimeout(() => {
    if (openDropdown.value === link.id && !dropdownPinned.value) closeDropdown()
  }, 160)
}

function onDropdownFocusOut(link, e) {
  const wrapper = dropdownRefs[link.id]
  if (wrapper && e.relatedTarget && !wrapper.contains(e.relatedTarget)) {
    if (openDropdown.value === link.id) closeDropdown()
  }
}

function focusDropdownItem(link, index) {
  nextTick(() => {
    const items = dropdownRefs[link.id]?.querySelectorAll('.nav-dropdown__item')
    if (!items?.length) return
    const i = (index + items.length) % items.length
    items[i].focus()
  })
}

function onTriggerKeydown(link, e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    openDropdownFor(link, { pinned: true })
    focusDropdownItem(link, 0)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    openDropdownFor(link, { pinned: true })
    focusDropdownItem(link, -1)
  }
}

function onItemKeydown(link, index, e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusDropdownItem(link, index + 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusDropdownItem(link, index - 1)
  } else if (e.key === 'Home') {
    e.preventDefault()
    focusDropdownItem(link, 0)
  } else if (e.key === 'End') {
    e.preventDefault()
    focusDropdownItem(link, -1)
  }
}

function onDocumentPointerDown(e) {
  if (!openDropdown.value) return
  const wrapper = dropdownRefs[openDropdown.value]
  if (wrapper && !wrapper.contains(e.target)) closeDropdown()
}

function setDropdownRef(link, el) {
  if (el) dropdownRefs[link.id] = el
  else delete dropdownRefs[link.id]
}

function isMobileGroupOpen(link) {
  const state = mobileGroupsOpen.value[link.id]
  return state === undefined ? isActive(link) : state
}

function toggleMobileGroup(link) {
  mobileGroupsOpen.value = {
    ...mobileGroupsOpen.value,
    [link.id]: !isMobileGroupOpen(link),
  }
}

const searchResults = computed(() => {
  const q = normalize(searchQuery.value.trim())
  if (!q) return []

  const sectionHits = flatLinks.value
    .filter((link) =>
      link.href &&
      normalize(`${link.label} ${link.parentLabel || ''} ${link.keywords || ''}`).includes(q),
    )
    .map((link) => ({
      id: `nav-${link.id}`,
      type: 'section',
      typeLabel: 'Seção',
      title: link.label,
      excerpt: link.parentLabel ? `${link.parentLabel} › ${link.label}` : 'Navegação do site',
      to: link.href,
    }))

  const newsHits = (news.items || [])
    .filter((item) => normalize(`${item.title} ${item.excerpt || ''} ${item.category || ''}`).includes(q))
    .slice(0, 8)
    .map((item) => ({
      id: `news-${item.id}`,
      type: 'news',
      typeLabel: 'Notícia',
      title: item.title,
      excerpt: item.excerpt || '',
      to: `/noticias/${item.slug}`,
    }))

  return [...sectionHits, ...newsHits]
})

function goToResult(to) {
  closeSearch()
  closeMenu()
  router.push(to)
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
    closeSearch()
    closeDropdown()
    mobileGroupsOpen.value = {}
    a11yOpen.value = false
  },
)
</script>

<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': scrolled, 'navbar--hidden': hidden }"
    @focusin="onHeaderFocusIn"
  >
    <div class="preheader">
      <div class="container preheader-inner">
        <span class="preheader-name">{{ site.name }}</span>
        <div class="preheader-actions">
          <a
            v-if="contact.instagram_url"
            class="preheader-icon"
            :href="contact.instagram_url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="contact.instagram_label || 'Instagram'"
            :title="contact.instagram_label || 'Instagram'"
          >
            <v-icon icon="mdi-instagram" size="20" />
          </a>
          <a
            v-if="contact.youtube_url"
            class="preheader-icon"
            :href="contact.youtube_url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="contact.youtube_label || 'YouTube'"
            :title="contact.youtube_label || 'YouTube'"
          >
            <v-icon icon="mdi-youtube" size="22" />
          </a>
          <button
            class="preheader-a11y"
            type="button"
            :aria-expanded="a11yOpen"
            aria-controls="a11y-panel"
            @click="toggleA11y"
          >
            <v-icon icon="mdi-human" size="18" />
            <span>Acessibilidade</span>
          </button>
        </div>
      </div>
    </div>

    <div class="navbar-main">
      <div class="container navbar-inner">
        <div class="navbar-start">
          <AppLogo size="nav" @click="closeMenu" />
        </div>

        <nav class="nav-links" aria-label="Navegação principal">
          <template v-for="link in links" :key="link.id">
            <div
              v-if="link.children?.length"
              :ref="(el) => setDropdownRef(link, el)"
              class="nav-dropdown"
              :class="{ 'nav-dropdown--open': openDropdown === link.id }"
              @mouseenter="onDropdownEnter(link)"
              @mouseleave="onDropdownLeave(link)"
              @focusout="onDropdownFocusOut(link, $event)"
            >
              <button
                type="button"
                class="nav-dropdown__trigger"
                :class="{ 'nav-links__active': isActive(link) }"
                :aria-expanded="openDropdown === link.id"
                :aria-controls="dropdownId(link)"
                @click="toggleDropdown(link)"
                @keydown="onTriggerKeydown(link, $event)"
              >
                <span>{{ link.label }}</span>
                <v-icon icon="mdi-chevron-down" size="18" class="nav-dropdown__chevron" aria-hidden="true" />
              </button>
              <Transition name="dropdown">
                <ul
                  v-show="openDropdown === link.id"
                  :id="dropdownId(link)"
                  class="nav-dropdown__panel"
                >
                  <li v-for="(child, i) in link.children" :key="child.id">
                    <RouterLink
                      :to="child.href"
                      class="nav-dropdown__item"
                      :class="{ 'nav-dropdown__item--active': isActive(child) }"
                      :aria-current="isActive(child) ? 'page' : undefined"
                      @click="closeDropdown"
                      @keydown="onItemKeydown(link, i, $event)"
                    >
                      {{ child.label }}
                    </RouterLink>
                  </li>
                </ul>
              </Transition>
            </div>
            <RouterLink
              v-else
              :to="link.href"
              :class="{ 'nav-links__active': isActive(link) && !link.highlight, 'nav-links__cta': link.highlight }"
            >
              {{ link.label }}
            </RouterLink>
          </template>
        </nav>

        <div class="navbar-end">
          <button
            class="icon-btn"
            type="button"
            aria-label="Buscar no site"
            :aria-expanded="searchOpen"
            @click="openSearch"
          >
            <v-icon icon="mdi-magnify" size="24" />
          </button>
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
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" class="mobile-menu" aria-label="Navegação principal (mobile)">
        <template v-for="link in links" :key="link.id">
          <div v-if="link.children?.length" class="mobile-group">
            <button
              type="button"
              class="mobile-group__trigger"
              :class="{ 'mobile-group__trigger--active': isActive(link) }"
              :aria-expanded="isMobileGroupOpen(link)"
              :aria-controls="`mobile-group-${link.id}`"
              @click="toggleMobileGroup(link)"
            >
              <span>{{ link.label }}</span>
              <v-icon icon="mdi-chevron-down" size="20" class="mobile-group__chevron" aria-hidden="true" />
            </button>
            <ul
              v-show="isMobileGroupOpen(link)"
              :id="`mobile-group-${link.id}`"
              class="mobile-group__list"
            >
              <li v-for="child in link.children" :key="child.id">
                <RouterLink
                  :to="child.href"
                  class="mobile-group__item"
                  :class="{ 'mobile-menu__active': isActive(child) }"
                  :aria-current="isActive(child) ? 'page' : undefined"
                  @click="closeMenu"
                >
                  {{ child.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <RouterLink
            v-else
            :to="link.href"
            :class="{ 'mobile-menu__active': isActive(link) && !link.highlight, 'mobile-menu__cta': link.highlight }"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
        </template>
      </nav>
    </Transition>

    <!-- Accessibility panel -->
    <Transition name="panel">
      <div
        v-if="a11yOpen"
        id="a11y-panel"
        class="a11y-panel"
        role="dialog"
        aria-label="Opções de acessibilidade"
      >
        <div class="container a11y-panel-inner">
          <div class="a11y-panel-head">
            <strong>Acessibilidade</strong>
            <button type="button" class="icon-btn" aria-label="Fechar" @click="a11yOpen = false">
              <v-icon icon="mdi-close" size="20" />
            </button>
          </div>
          <div class="a11y-controls">
            <div class="a11y-group">
              <span class="a11y-label">Tamanho da fonte</span>
              <div class="a11y-font-btns">
                <button type="button" class="a11y-btn" :disabled="fontScale <= 100" @click="decreaseFont">
                  A−
                </button>
                <span class="a11y-scale">{{ fontScale }}%</span>
                <button type="button" class="a11y-btn" :disabled="fontScale >= 130" @click="increaseFont">
                  A+
                </button>
              </div>
            </div>
            <button
              type="button"
              class="a11y-btn a11y-btn--toggle"
              :class="{ 'a11y-btn--on': highContrast }"
              :aria-pressed="highContrast"
              @click="toggleContrast"
            >
              <v-icon icon="mdi-contrast-circle" size="18" />
              Alto contraste
            </button>
            <button
              type="button"
              class="a11y-btn a11y-btn--toggle"
              :class="{ 'a11y-btn--on': underlineLinks }"
              :aria-pressed="underlineLinks"
              @click="toggleUnderline"
            >
              <v-icon icon="mdi-format-underline" size="18" />
              Sublinhado em links
            </button>
            <button type="button" class="a11y-btn a11y-btn--reset" @click="resetA11y">
              Restaurar padrão
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search overlay -->
    <Teleport to="body">
      <Transition name="search">
        <div
          v-if="searchOpen"
          class="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Buscar no site"
          @click.self="closeSearch"
        >
          <div class="search-dialog">
            <div class="search-dialog-head">
              <v-icon icon="mdi-magnify" size="22" class="search-dialog-icon" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                class="search-input"
                placeholder="Buscar no site…"
                aria-label="Buscar no site"
                autocomplete="off"
              >
              <button type="button" class="icon-btn" aria-label="Fechar busca" @click="closeSearch">
                <v-icon icon="mdi-close" size="22" />
              </button>
            </div>

            <div class="search-results" role="listbox">
              <template v-if="searchQuery.trim() && searchResults.length">
                <button
                  v-for="item in searchResults"
                  :key="item.id"
                  type="button"
                  class="search-result"
                  role="option"
                  @click="goToResult(item.to)"
                >
                  <span class="search-result-type">{{ item.typeLabel }}</span>
                  <span class="search-result-title">{{ item.title }}</span>
                  <span v-if="item.excerpt" class="search-result-excerpt">{{ item.excerpt }}</span>
                </button>
              </template>
              <p v-else-if="searchQuery.trim()" class="search-empty">
                Nenhum resultado
              </p>
              <p v-else class="search-hint">
                Digite para buscar seções e notícias.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
  /* Soft shade cast onto the hero / content below */
  box-shadow:
    0 10px 28px rgba(27, 42, 74, 0.1),
    0 2px 8px rgba(27, 42, 74, 0.06);
  transform: translateY(0);
  transition:
    transform 0.28s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  will-change: transform;
}

.navbar--scrolled {
  border-bottom-color: var(--parish-card-border);
  box-shadow:
    0 12px 32px rgba(27, 42, 74, 0.14),
    0 4px 12px rgba(27, 42, 74, 0.08);
}

.navbar--hidden {
  transform: translateY(-100%);
  box-shadow: none;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .navbar {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
}

/* —— Pre-header —— */
.preheader {
  background: var(--parish-navy);
  color: #f5efe6;
  min-height: var(--preheader-height);
}

.preheader-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: var(--preheader-height);
  padding-block: 4px;
}

.preheader-name {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preheader-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.preheader-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #f5efe6;
  transition: background 0.15s ease, color 0.15s ease;
}

.preheader-icon:hover,
.preheader-icon:focus-visible {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  outline: none;
}

.preheader-a11y {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
  padding: 5px 12px;
  border: 1px solid rgba(245, 239, 230, 0.35);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.06);
  color: #f5efe6;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.preheader-a11y:hover,
.preheader-a11y:focus-visible {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(245, 239, 230, 0.6);
  outline: none;
}

/* —— Main bar —— */
.navbar-main {
  background: rgba(255, 255, 255, 0.96);
  /* Small gap so the logo does not sit flush against the pre-header */
  padding-top: var(--navbar-main-pad-top, 8px);
}

.navbar-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: var(--navbar-main-height);
  gap: 16px;
}

.navbar-start {
  justify-self: start;
  min-width: 0;
}

.navbar-end {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-links > a,
.nav-dropdown__trigger {
  position: relative;
  color: var(--parish-navy);
  font-size: 1.02rem;
  font-weight: 500;
  text-decoration: none;
  padding-bottom: 4px;
  white-space: nowrap;
}

.nav-links > a:hover,
.nav-links > a:focus-visible,
.nav-dropdown__trigger:hover,
.nav-dropdown--open .nav-dropdown__trigger {
  color: var(--parish-maroon);
  outline: none;
}

.nav-links > a:focus-visible,
.nav-dropdown__trigger:focus-visible {
  outline: 2px solid var(--parish-maroon);
  outline-offset: 4px;
  border-radius: 4px;
}

/* —— Desktop dropdown —— */
.nav-dropdown {
  position: relative;
}

.nav-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  background: none;
  border: none;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
}

.nav-dropdown__chevron {
  transition: transform 0.2s ease;
}

.nav-dropdown--open .nav-dropdown__chevron {
  transform: rotate(180deg);
}

.nav-dropdown__panel {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 10;
  min-width: 210px;
  margin: 0;
  /* margin gap is bridged by padding so hover is not lost between trigger and panel */
  padding: 8px;
  list-style: none;
  background: #fff;
  border: 1px solid var(--parish-card-border);
  border-radius: 14px;
  box-shadow:
    0 14px 34px rgba(27, 42, 74, 0.14),
    0 3px 10px rgba(27, 42, 74, 0.06);
  transform: translate(-50%, 10px);
}

.nav-dropdown__panel::before {
  /* invisible hover bridge above the panel */
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -12px;
  height: 12px;
}

.nav-dropdown__item {
  display: block;
  padding: 10px 14px;
  border-radius: 10px;
  color: var(--parish-navy);
  font-size: 0.97rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.12s ease, color 0.12s ease;
}

.nav-dropdown__item:hover,
.nav-dropdown__item:focus-visible {
  background: rgba(122, 36, 48, 0.07);
  color: var(--parish-maroon);
  outline: none;
}

.nav-dropdown__item--active {
  color: var(--parish-maroon);
  font-weight: 600;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
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

.nav-links a.nav-links__cta {
  padding: 8px 18px;
  color: #fff;
  background: var(--parish-maroon);
  border-radius: var(--radius-pill);
  font-weight: 600;
  transition: background 0.15s ease, box-shadow 0.15s ease;
}

.nav-links a.nav-links__cta:hover,
.nav-links a.nav-links__cta:focus-visible {
  color: #fff;
  background: #641d27;
  box-shadow: 0 6px 16px rgba(122, 36, 48, 0.25);
}

.mobile-menu a.mobile-menu__cta {
  margin-top: 10px;
  padding: 12px 16px;
  color: #fff;
  text-align: center;
  background: var(--parish-maroon);
  border-bottom: none;
  border-radius: var(--radius-pill);
  font-weight: 600;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  color: var(--parish-navy);
  background: none;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.icon-btn:hover,
.icon-btn:focus-visible {
  background: rgba(27, 42, 74, 0.06);
  border-color: var(--parish-card-border);
  outline: none;
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 8px;
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

.mobile-menu__active {
  color: var(--parish-maroon) !important;
  font-weight: 600 !important;
}

/* —— Mobile expandable group —— */
.mobile-group__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 4px;
  color: var(--parish-navy);
  background: none;
  border: none;
  border-bottom: 1px solid rgba(27, 42, 74, 0.06);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}

.mobile-group__trigger:hover,
.mobile-group__trigger:focus-visible,
.mobile-group__trigger--active {
  color: var(--parish-maroon);
}

.mobile-group__chevron {
  transition: transform 0.2s ease;
}

.mobile-group__trigger[aria-expanded='true'] .mobile-group__chevron {
  transform: rotate(180deg);
}

.mobile-group__list {
  margin: 0;
  padding: 2px 0 6px;
  list-style: none;
}

.mobile-menu .mobile-group__item {
  display: block;
  padding: 10px 4px 10px 20px;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(27, 42, 74, 0.04);
  border-left: 2px solid rgba(122, 36, 48, 0.18);
  margin-left: 6px;
}

/* —— A11y panel —— */
.a11y-panel {
  border-top: 1px solid var(--parish-card-border);
  background: #fff;
  box-shadow: 0 12px 28px rgba(27, 42, 74, 0.08);
}

.a11y-panel-inner {
  padding-block: 14px 18px;
}

.a11y-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--parish-navy);
  font-size: 0.95rem;
}

.a11y-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.a11y-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 4px;
}

.a11y-label {
  font-size: 0.85rem;
  color: var(--parish-muted);
  font-weight: 600;
}

.a11y-font-btns {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.a11y-scale {
  min-width: 3.2rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--parish-navy);
}

.a11y-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--parish-card-border);
  border-radius: 10px;
  background: #fff;
  color: var(--parish-navy);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.a11y-btn:hover:not(:disabled),
.a11y-btn:focus-visible:not(:disabled) {
  border-color: var(--parish-maroon);
  color: var(--parish-maroon);
  outline: none;
}

.a11y-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.a11y-btn--on {
  background: rgba(122, 36, 48, 0.1);
  border-color: var(--parish-maroon);
  color: var(--parish-maroon);
}

.a11y-btn--reset {
  color: var(--parish-muted);
}

/* —— Transitions —— */
.menu-enter-active,
.menu-leave-active,
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to,
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 960px) {
  .nav-links {
    display: none;
  }

  .navbar-inner {
    grid-template-columns: 1fr auto;
  }

  .menu-toggle {
    display: inline-flex;
  }
}

@media (max-width: 520px) {
  .preheader-name {
    display: none;
  }

  .preheader-inner {
    justify-content: flex-end;
  }

  .preheader-a11y span {
    display: none;
  }

  .preheader-a11y {
    padding: 6px 10px;
  }

  .menu-toggle__label {
    display: none;
  }
}
</style>

<!-- Search overlay is teleported to body — unscoped styles via named classes -->
<style>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 16px 24px;
  background: rgba(27, 42, 74, 0.45);
  backdrop-filter: blur(4px);
}

.search-dialog {
  width: min(560px, 100%);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(27, 42, 74, 0.25);
  overflow: hidden;
}

.search-dialog-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--parish-card-border, rgba(27, 42, 74, 0.08));
}

.search-dialog-icon {
  color: var(--parish-muted, #5c6570);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-family: var(--font-body, system-ui, sans-serif);
  font-size: 1.05rem;
  color: var(--parish-ink, #1a1a1a);
  background: transparent;
}

.search-input::placeholder {
  color: var(--parish-muted, #5c6570);
}

.search-results {
  max-height: min(52vh, 420px);
  overflow-y: auto;
  padding: 8px;
}

.search-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-body, system-ui, sans-serif);
  transition: background 0.12s ease;
}

.search-result:hover,
.search-result:focus-visible {
  background: rgba(122, 36, 48, 0.07);
  outline: none;
}

.search-result-type {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--parish-maroon, #7a2430);
}

.search-result-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--parish-navy, #1b2a4a);
}

.search-result-excerpt {
  font-size: 0.88rem;
  color: var(--parish-muted, #5c6570);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-empty,
.search-hint {
  margin: 0;
  padding: 28px 16px;
  text-align: center;
  color: var(--parish-muted, #5c6570);
  font-size: 0.95rem;
}

.search-enter-active,
.search-leave-active {
  transition: opacity 0.18s ease;
}

.search-enter-active .search-dialog,
.search-leave-active .search-dialog {
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-from .search-dialog,
.search-leave-to .search-dialog {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>
