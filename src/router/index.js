import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../composables/useSupabase'
import Home from '../Views/Home.vue'
import Login from '../Views/Login.vue'
import Dashboard from '../Views/Dashboard.vue'
// import Cadastro from '../Views/Cadastro.vue'
// import Relatorios from '../Views/Relatorios.vue'
// import Entregas from '../Views/Entregas.vue'
// import Funcionarios from '../Views/Funcionarios.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/Login', component: Login },
  { path: '/Dashboard', component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      // { path: 'Cadastro', component: Cadastro },
      // { path: 'Entregas', component: Entregas },
      // { path: 'Relatorios', component: Relatorios },
      // { path: 'Funcionarios', component: Funcionarios }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const { data: { session } } = await supabase.auth.getSession()
  if (requiresAuth && !session) {
    next('/Login')
  } else {
    next()
  }
})
export default router