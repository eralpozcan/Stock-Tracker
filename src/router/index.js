import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: (to, from,next) => {
        const authStore = useAuthStore()
        if (!authStore.isLoggedIn) next({ name: 'home' })
        else next()
      }
    },
    {
      path: '/symbol/:symbol',
      name: 'Results',
      component: () => import('../views/ResultsView.vue')
    }
  ]
})

export default router
