<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">

    <!-- TOPO -->
    <div class="sidebar-top">
      <button class="hamburger-button" @click="toggleSidebar" :aria-expanded="!isCollapsed" aria-label="Alternar menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="logotipo" v-if="!isCollapsed">
        <img class="logo" src="/logo-sf.png" alt="Logo Synaptix" />
      </div>
    </div>

    <!-- MENU -->
    <nav class="menu">

      <RouterLink to="/Dashboard" class="menu-item" exact-active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-dashboard.svg" alt="Dashboard" />
        </div>
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-estoque.svg" alt="Inventário" />
        </div>
        <span>Inventário</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-cadastrar.svg" alt="Adicionar" />
        </div>
        <span>Adicionar EPI</span>
      </RouterLink>

      <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-rastrear.svg" alt="Em Uso" />
        </div>
        <span>EPIs em Uso</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-retirar.svg" alt="Retirada" />
        </div>
        <span>Registrar Retirada</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-funcionarios.svg" alt="Relatórios" />
        </div>
        <span>Relatórios</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active">
        <div class="icon-box">
          <img class="icon" src="/icon-perfil.svg" alt="Perfil" />
        </div>
        <span>Perfil</span>
      </RouterLink>

      <button @click="sair" class="menu-item botao-sair">
        <div class="icon-box">
          <img class="icon" src="/icon-logout.svg" alt="Sair" />
        </div>
        <span>Sair</span>
      </button>

    </nav>

    <!-- FOOTER -->
    <div class="footer" v-if="!isCollapsed">
      <div class="user">
        <img src="/user.png" alt="Usuário" />

        <div>
          <strong>Julie Antrez</strong>

          <p>
            <span class="dot"></span>
            Conectado
          </p>
        </div>
      </div>
    </div>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../src/composables/useSupabase'

const router = useRouter()
const { supabase } = useSupabase()

const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

async function sair() {
  try {
    await supabase.auth.signOut()
    router.push('/Login')
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
</script>

<style scoped>
/* SIDEBAR */
.sidebar {
  width: 15.625rem;
  height: 100vh;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0.25rem 0 0.625rem rgba(0, 0, 0, 0.1);
  transition: width 0.25s ease;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.25rem;
  transition: 0.2s;
}

.icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  transition: 0.2s;
  filter: brightness(0) saturate(100%) invert(75%);
}

/* destaque da caixinha quando ativo */
.menu-item.active .icon-box {
  background: rgba(194, 121, 207, 0.381);
}

/* ícone branco quando ativo */
.menu-item.active .icon {
  filter: brightness(0) invert(1);
}

.sidebar--collapsed {
  width: 5rem;
}

/* TOPO */
.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
}

.sidebar--collapsed .sidebar-top {
  justify-content: center;
}

/* HAMBURGER */
.hamburger-button {
  position: absolute;
  left: 1rem;
  width: 2.375rem;
  height: 2.375rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3125rem;
  background: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 0.35rem;
  cursor: pointer;
}

.hamburger-button span {
  display: block;
  width: 18px;
  height: 3px;
  background: #333;
  border-radius: 999px;
  margin: 0 auto;
}

/* LOGO */
.logotipo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 110px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 1rem;
}

/* MENU ITEM */
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  text-decoration: none;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

/* HOVER */
.menu-item:hover {
  background: #eeeeee;
}

/* ITEM ATIVO */
.menu-item.active {
  background: linear-gradient(90deg, #330136, #93039c);
  background-repeat: no-repeat;
  color: white;
  font-weight: 600;
}

/* ÍCONES */
.icon {
  width: 20px;
  height: 20px;
}

/* ÍCONE BRANCO */
.menu-item.active .icon {
  filter: brightness(0) invert(1);
}

/* TEXTO MENU */
.menu-label {
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s ease;
}

/* SIDEBAR RECOLHIDA */
.sidebar--collapsed .menu-label {
  opacity: 0;
  width: 0;
}

.sidebar--collapsed .menu-item {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.sidebar--collapsed .botao-sair {
  justify-content: center;
}

.sidebar--collapsed .icon {
  margin: 0;
}

/* FOOTER */
.footer {
  width: 100%;
  margin-top: auto;
}

/* USER */
.user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(90deg, #330136, #93039c);
  color: white;
}

.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.user strong {
  font-size: 15px;
}

.user p {
  margin-top: 4px;
  font-size: 12px;
}

/* STATUS */
.dot {
  width: 6px;
  height: 6px;
  background: #00ff6a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
</style>