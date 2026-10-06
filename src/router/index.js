import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsListView from '../views/NewsListView.vue'
import NewsArticleView from '../views/NewsArticleView.vue'
import HistoriaView from '../views/HistoriaView.vue'
import ParocosView from '../views/ParocosView.vue'
import PastoraisView from '../views/PastoraisView.vue'
import ComunidadesView from '../views/ComunidadesView.vue'
import PedidoOracoesView from '../views/PedidoOracoesView.vue'
import { site } from '../data/site'

const DEFAULT_TITLE = `${site.name} | ${site.city}`

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/noticias',
      name: 'noticias',
      component: NewsListView,
    },
    {
      path: '/noticias/:slug',
      name: 'noticia',
      component: NewsArticleView,
      props: true,
    },
    {
      path: '/historia',
      name: 'historia',
      component: HistoriaView,
      meta: { title: 'Nossa História' },
    },
    {
      path: '/paroco',
      name: 'paroco',
      component: ParocosView,
      meta: { title: 'Nossos Párocos' },
    },
    {
      path: '/pastorais',
      name: 'pastorais',
      component: PastoraisView,
      meta: { title: 'Pastorais e Movimentos' },
    },
    {
      path: '/comunidades',
      name: 'comunidades',
      component: ComunidadesView,
      meta: { title: 'Nossas Comunidades' },
    },
    {
      path: '/pedido-de-oracoes',
      name: 'pedido-de-oracoes',
      component: PedidoOracoesView,
      meta: { title: 'Pedido de Oração' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 72 }
    }
    return { top: 0 }
  },
})

// Título da aba: rotas com meta.title usam "Título | Paróquia"; as demais voltam ao padrão.
// Páginas com título dinâmico (ex.: notícia) sobrescrevem no próprio componente.
router.afterEach((to) => {
  if (typeof document === 'undefined') return
  document.title = to.meta?.title ? `${to.meta.title} | ${site.name}` : DEFAULT_TITLE
})

export default router
