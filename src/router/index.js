import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsListView from '../views/NewsListView.vue'
import NewsArticleView from '../views/NewsArticleView.vue'

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
      path: '/pastorais',
      name: 'pastorais',
      redirect: '/#pastorais',
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

export default router
