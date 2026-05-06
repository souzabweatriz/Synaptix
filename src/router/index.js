import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../composables/useSupabase'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Inventario from '../views/Inventario.vue'
import Adicionar from '../views/Adicionar.vue'
import EmUso from '../views/EmUso.vue'
import Retirada from '../views/Retirada.vue'
import Relatorio from '../views/Relatorio.vue'

const routes = [

  {
    path: '/Dashboard', component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/Dashboard/Inventario' },
      { path: 'Inventario', component: Inventario },
      { path: 'Adicionar', component: Adicionar },
      { path: 'EmUso', component: EmUso },
      { path: 'Retirada', component: Retirada },
      { path: 'Relatorios', component: Relatorio },
    ]
  },

  {
    path: '/',
    name: 'home',
    component: Home,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  try {
    const requiresAuth = to.matched.some(record => record.meta && record.meta.requiresAuth)

    if (!requiresAuth) {
      return next()
    }

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