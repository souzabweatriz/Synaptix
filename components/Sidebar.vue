<template>
  <div class="shell">

    <aside class="sidebar">
      <div class="logotipo">
        <img class="logo" src="/logo-sf.png" alt="logo" />
      </div>
      <nav class="menu">
        <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active">
          <img class="icon" src="/inventario.png" />
          <span>Inventário</span>
        </RouterLink>

        <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active">
          <img class="icon" src="/adicionar.png" />
          <span>Adicionar EPI</span>
        </RouterLink>

        <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active">
          <img class="icon" src="/em-uso.png" />
          <span>EPIs em Uso</span>
        </RouterLink>

        <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active">
          <img class="icon" src="/retirada.png" />
          <span>Registrar Retirada</span>
        </RouterLink>

        <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
          <img class="icon" src="/relatorios.png" />
          <span>Relatórios</span>
        </RouterLink>

        <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active">
          <img class="icon" src="/perfil.png" />
          <span>Perfil</span>
        </RouterLink>

        <RouterLink to="/Dashboard/Configuracoes" class="menu-item" active-class="active">
          <img class="icon" src="/configuracoes.png" />
          <span>Configurações</span>
        </RouterLink>

        <button @click="sair" class="menu-item botao-sair">
          <img class="icon" src="/sair.png" />
          <span>Sair</span>
        </button>
      </nav>

      <!-- USER -->
      <div class="footer">
        <div class="user">
          <img src="/user.png" />
          <div>
            <strong>Julie Antrez</strong>
            <p><span class="dot"></span> Conectado</p>
          </div>
        </div>
      </div>

    </aside>

    <main class="conteudo">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSupabase } from '../src/composables/useSupabase';

const router = useRouter();
const { supabase } = useSupabase();

async function sair() {
  try {
    await supabase.auth.signOut();
    router.push('/Login');
  } catch (error) {
    console.error('Erro ao sair:', error);
  }
}
</script>

<style scoped>
.shell {
  display: flex;
  height: 100vh;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.15);
}

/* LOGO */
.logotipo {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.logo {
  width: 6rem;
}

/* MENU */
.menu {
  display: flex;
  padding-bottom: 8rem;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.25rem;
  text-decoration: none;
  color: #666;
  font-size: 0.875rem;
  transition: 0.3s;
  border: none;
  background: transparent;
  cursor: pointer;
}

.menu-item:hover {
  background: #eaeaea;
}

/* ÍCONE */
.icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: 0.3s;
}

/* ATIVO (AQUI A MÁGICA) */
.menu-item.active {
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
  font-weight: 600;
}

/* deixa o ícone branco */
.menu-item.active .icon {
  filter: brightness(0) invert(1);
}

/* FOOTER */
.footer {
  display: flex;
  flex-direction: column;
}

/* USER */
.user {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1.25rem;
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
  font-size: 0.875rem;
}

.user img {
  border-radius: 50%;
  width: 2.5rem;
}

.user p {
  margin: 0;
  font-size: 0.75rem;
}

.dot {
  height: 0.375rem;
  width: 0.375rem;
  background: #00ff6a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.25rem;
}

/* CONTEÚDO */
.conteudo {
  flex-grow: 1;
  margin-left: 15.625rem;
  background-color: #F8F9FA;
  padding: 1.875rem;
}
</style>