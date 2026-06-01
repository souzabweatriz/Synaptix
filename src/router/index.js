import { createRouter, createWebHistory } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Inventario from '../views/Inventario.vue'
import Adicionar from '../views/Adicionar.vue'
import EmUso from '../views/EmUso.vue'
import Retirada from '../views/Retirada.vue'
import Relatorio from '../views/Relatorio.vue'
import Perfil from '../views/Perfil.vue'
import Erro from '../views/Erro.vue'

const { supabase } = useSupabase()

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/Login',
    name: 'Login',
    component: Login
  },

  {
    path: '/Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'Inventario',
        component: Inventario
      },
      {
        path: 'Adicionar',
        component: Adicionar
      },
      {
        path: 'EmUso',
        component: EmUso
      },
      {
        path: 'Retirada',
        component: Retirada
      },
      {
        path: 'Relatorios',
        component: Relatorio
      },
      {
        path: 'Perfil',
        component: Perfil
      }
    ]
  },

  {
    path: '/erro',
    name: 'Erro',
    component: Erro
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Erro,
    props: {
      errorCode: '404',
      title: 'A página não foi encontrada',
      message: 'A página que você está procurando não existe ou foi removida.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(
    route => route.meta?.requiresAuth
  )

  if (!requiresAuth) {
    return next()
  }

  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      return next('/Login')
    }

    next()
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    next('/Login')
  }
})

export default router