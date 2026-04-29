import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { supabase } from '../composables/useSupabase.js'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta && r.meta.requiresAuth)

  if (!requiresAuth) {
    return next()
  }

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return next({ name: 'login' })
    }

    next()
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    next({ name: 'login' })
  }
})

export default router