<template>
  <!-- Overlay escuro no mobile quando sidebar aberta -->
  <div
    v-if="isMobile && !isCollapsed"
    class="sidebar-overlay"
    @click="closeSidebar"
  />

  <!-- Botão hamburguer FIXO no mobile (fora da sidebar) -->
  <button
    v-if="isMobile && isCollapsed"
    class="mobile-hamburger"
    @click="toggleSidebar"
    aria-label="Abrir menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">

    <!-- TOPO -->
    <div class="sidebar-top">
      <button
        class="hamburger-button"
        @click="toggleSidebar"
        :aria-expanded="!isCollapsed"
        aria-label="Alternar menu"
      >
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

      <RouterLink to="/Dashboard" class="menu-item" exact-active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-dashboard.svg" alt="Dashboard" />
        </div>
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-estoque.svg" alt="Inventário" />
        </div>
        <span>Inventário</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-cadastrar.svg" alt="Adicionar" />
        </div>
        <span>Adicionar EPI</span>
      </RouterLink>

      <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-rastrear.svg" alt="Em Uso" />
        </div>
        <span>EPIs em Uso</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-retirar.svg" alt="Retirada" />
        </div>
        <span>Registrar Retirada</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active" @click="onNavClick">
        <div class="icon-box">
          <img class="icon" src="/icon-funcionarios.svg" alt="Relatórios" />
        </div>
        <span>Relatórios</span>
      </RouterLink>

      <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active" @click="onNavClick">
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
        <img
          v-if="userProfile.avatarUrl"
          :src="userProfile.avatarUrl"
          :alt="userProfile.name"
        />
        <div v-else class="avatar-fallback">
          {{ userInitials }}
        </div>

        <div>
          <strong>{{ userProfile.name }}</strong>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../src/composables/useSupabase'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:collapsed'])

const router = useRouter()
const { supabase, session } = useSupabase()

const MOBILE_BP = 768
const isMobile = ref(window.innerWidth <= MOBILE_BP)
const isCollapsed = ref(isMobile.value ? true : props.collapsed)

// ── Dados do usuário logado ──
const userProfile = ref({ name: '', email: '', avatarUrl: '' })

function capitalizeName(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function loadUserProfile(currentSession) {
  if (!currentSession?.user) {
    userProfile.value = { name: '', email: '', avatarUrl: '' }
    return
  }
  const meta = currentSession.user.user_metadata || {}
  userProfile.value = {
    name: capitalizeName(meta.full_name || meta.name || currentSession.user.email?.split('@')[0] || 'Usuário'),
    email: currentSession.user.email || '',
    avatarUrl: meta.avatar_url || meta.picture || ''
  }
}

const userInitials = computed(() => {
  return userProfile.value.name ? userProfile.value.name.charAt(0).toUpperCase() : '?'
})

watch(session, (newSession) => loadUserProfile(newSession), { immediate: true })

// ── Resize ──
function onResize() {
  const mobile = window.innerWidth <= MOBILE_BP

  if (mobile !== isMobile.value) {
    isMobile.value = mobile

    if (mobile) {
      isCollapsed.value = true
      emit('update:collapsed', true)
    } else {
      isCollapsed.value = false
      emit('update:collapsed', false)
    }
  }
}

onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

function closeSidebar() {
  isCollapsed.value = true
  emit('update:collapsed', true)
}

function onNavClick() {
  if (isMobile.value) closeSidebar()
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
/* ── Overlay mobile ── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99;
}

/* ── Botão hamburguer FIXO no mobile (visível quando sidebar fechada) ── */
.mobile-hamburger {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.mobile-hamburger span {
  display: block;
  width: 18px;
  height: 3px;
  background: #333;
  border-radius: 999px;
  margin: 0 auto;
}

/* ── Sidebar base ── */
.sidebar {
  width: 15.625rem;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0.25rem 0 0.625rem rgba(0, 0, 0, 0.4);
  transition: width 0.25s ease, transform 0.25s ease;
}

/* ── Recolhida (desktop) ── */
.sidebar--collapsed {
  width: 5rem;
}

/* ── TOPO ── */
.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
}

/* ── Hamburger dentro da sidebar (desktop) ── */
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

/* ── Logo ── */
.logotipo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 110px;
}

/* ── Icon box ── */
.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.25rem;
  transition: 0.2s;
  flex-shrink: 0;
}

.icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  transition: 0.2s;
  filter: brightness(0) saturate(100%) invert(75%);
}

/* ── Menu ── */
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  text-decoration: none;
  color: #747474;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
  overflow: hidden;
}

.menu-item:hover {
  background: #eeeeee;
}

.menu-item.active {
  background: linear-gradient(90deg, #ff6a35, #93039c);
  color: white;
  font-weight: 600;
}

.menu-item.active .icon-box {
  background: rgba(194, 121, 207, 0.381);
}

.menu-item.active .icon {
  filter: brightness(0) invert(1);
}

/* ── Sidebar recolhida — centraliza ícones ── */
.sidebar--collapsed .menu-item {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.sidebar--collapsed .menu-item span:not(.icon) {
  display: none;
}

/* ── Footer ── */
.footer {
  width: 100%;
  margin-top: auto;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(90deg, #e74c3c, #93039c);
  color: white;
}

.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

.avatar-fallback {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.user strong { font-size: 15px; }
.user p { margin-top: 4px; font-size: 12px; }

.dot {
  width: 6px;
  height: 6px;
  background: #00ff6a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

/* ════════════════════════════
   MOBILE — drawer behavior
════════════════════════════ */
@media (max-width: 768px) {
  /* Sidebar sempre com largura total, animada por transform */
  .sidebar {
    width: 15.625rem;
    transform: translateX(-100%);
  }

  /* Aberta */
  .sidebar:not(.sidebar--collapsed) {
    transform: translateX(0);
  }

  /* Fechada — completamente fora da tela */
  .sidebar--collapsed {
    width: 15.625rem;
    transform: translateX(-100%);
  }
}

/* No desktop o botão fixo mobile não aparece */
@media (min-width: 769px) {
  .mobile-hamburger {
    display: none;
  }
}
</style>