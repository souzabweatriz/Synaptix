<template>
  <aside class="sidebar">

    <!-- LOGO -->
    <div class="logotipo">
      <img class="logo" src="/logo-sf.png" alt="Logo Synaptix" />
    </div>

    <!-- MENU -->
    <nav class="menu">
      <!-- INVENTÁRIO -->
      <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active">
        <img class="icon" src="/inventario.png" alt="" />
        <span>Inventário</span>
      </RouterLink>

      <!-- ADICIONAR -->
      <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active">
        <img class="icon" src="/adicionar.png" alt="" />
        <span>Adicionar EPI</span>
      </RouterLink>

      <!-- EM USO -->
      <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active">
        <img class="icon" src="/em-uso.png" alt="" />
        <span>EPIs em Uso</span>
      </RouterLink>

      <!-- RETIRADA -->
      <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active">
        <img class="icon" src="/retirada.png" alt="" />
        <span>Registrar Retirada</span>
      </RouterLink>

      <!-- RELATÓRIOS -->
      <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
        <img class="icon" src="/relatorios.png" alt="" />
        <span>Relatórios</span>
      </RouterLink>

      <!-- PERFIL -->
      <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active">
        <img class="icon" src="/perfil.png" alt="" />
        <span>Perfil</span>
      </RouterLink>

      <!-- CONFIGURAÇÕES -->
      <RouterLink to="/Dashboard/Configuracoes" class="menu-item" active-class="active">
        <img class="icon" src="/configuracoes.png" alt="" />
        <span>Configurações</span>
      </RouterLink>

      <!-- SAIR -->
      <button @click="sair" class="menu-item botao-sair">
        <img class="icon" src="/sair.png" alt="" />
        <span>Sair</span>
      </button>

    </nav>

    <!-- FOOTER -->
    <div class="footer">
      <div class="user">

        <img src="/user.png" alt="Usuário" />

        <div>
          <strong>
            Julie Antrez
          </strong>
          <p>
            <span class="dot"></span>
            Conectado
          </p>
  <div class="shell">
    <aside class="sidebar">
 
      <!-- LOGO -->
      <div class="logotipo">
        <img class="logo" src="/public/logo-sf.png" alt="logo" />
      </div>
 
      <!-- MENU -->
      <nav class="menu">
        <RouterLink to="/Dashboard/Dashboard" class="menu-item" active-class="active">
          <img src="/public/dashboard.png" alt="dashboard"/>
          <span>Dashboard</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active">
          <img class="icon" src="/public/inventario.png" alt="inventário"/>
          <span>Inventário</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active">  
          <img class="icon" src="/public/adicionar.png" alt="adicionar"/>
          <span>Adicionar EPI</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active">
          <img class="icon" src="/public/em-uso.png" alt="em uso"/>
          <span>EPIs em Uso</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active">
          <img class="icon" src="/public/retirada.png" alt="retirada"/>
          <span>Registrar Retirada</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
          <img class="icon" src="/public/relatorios.png"/>
          <span>Relatórios</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active">
          <img class="icon" src="/public/perfil.png"/>
          <span>Perfil</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Configuracoes" class="menu-item" active-class="active">
          <img class="icon" src="/public/configuracoes.png"/>
          <span>Configurações</span>
        </RouterLink>
      </nav>
 
      <!-- USUÁRIO + SAIR -->
      <div class="footer">
 
        <button @click="sair" class="botao-sair">
          Sair
        </button>
 
        <div class="user">
          <img src="/public/user.png" alt="user" />
          <div>
            <strong>Julie Antrez</strong>
            <p><span class="dot"></span> Conectado</p>
          </div>
        </div>

      </div>

    </div>

  </aside>
 
    </aside>
 
    <main class="conteudo">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSupabase } from '../src/composables/useSupabase'

const router = useRouter()

const { supabase } = useSupabase()

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
  }
  
  /* LOGO */
  .logotipo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
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
    background: linear-gradient(90deg,#330136,#93039c);
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

  /* FOOTER */
  .footer {
    width: 100%;
  }


  /* USER */
  .user {
    margin-top: 7.7rem;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    background: linear-gradient(90deg,#330136,#93039c);
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
 
.logotipo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
 
img.logo {
  width: 5rem;
  height: 2rem;
}
 
.menu-item {
  display: flex;
  align-items: center;
  padding-right: 10rem;
}
 
.icon {
  width: 1rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}
 
 
/* SIDEBAR */
.sidebar {
  width: 15rem;
  height: 100vh;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.15);
}
 
 
/* MENU */
.menu {
  display: flex;
  flex-direction: column;
}
 
.menu-item {
  padding: 14px 20px;
  text-decoration: none;
  color: #666;
  font-size: 15px;
  transition: 0.3s;
}
 
.menu-item:hover {
  background: #eaeaea;
}
 
/* ITEM ATIVO (igual imagem) */
.menu-item.active {
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
  font-weight: 600;
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
  gap: 10px;
  padding: 15px;
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
}
 
.user img {
  border-radius: 50%;
}
 
.user p {
  margin: 0;
  font-size: 12px;
}
 
.dot {
  height: 8px;
  width: 8px;
  background: #00ff6a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
 
/* BOTÃO SAIR */
.botao-sair {
  background: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
  color: #666;
  font-weight: 600;
}
 
.botao-sair:hover {
  background: #eaeaea;
}
 
/* CONTEÚDO */
.conteudo {
  flex-grow: 1;
  margin-left: 250px;
  padding: 30px;
  background-color: #F8F9FA;
}
</style>
 
