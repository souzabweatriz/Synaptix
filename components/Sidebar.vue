<template>
  <div class="shell">
    <aside class="sidebar">
 
      <!-- LOGO -->
      <div class="logotipo">
        <!-- <img class="logo" src="/public/logo-sf.png" alt="logo" /> -->
      </div>
 
      <!-- MENU -->
      <nav class="menu">
        <RouterLink to="/Dashboard/Dashboard" class="menu-item" active-class="active">
          <!-- <img src="/public/dashboard.png" alt="dashboard"/> -->
          <span>Dashboard</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Inventario" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/inventario.png" alt="inventário"/> -->
          <span>Inventário</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Adicionar" class="menu-item" active-class="active">  
          <!-- <img class="icon" src="/public/adicionar.png" alt="adicionar"/> -->
          <span>Adicionar EPI</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/EmUso" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/em-uso.png" alt="em uso"/> -->
          <span>EPIs em Uso</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Retirada" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/retirada.png" alt="retirada"/> -->
          <span>Registrar Retirada</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/relatorios.png"/> -->
          <span>Relatórios</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Perfil" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/perfil.png"/> -->
          <span>Perfil</span>
        </RouterLink>
 
        <RouterLink to="/Dashboard/Configuracoes" class="menu-item" active-class="active">
          <!-- <img class="icon" src="/public/configuracoes.png"/> -->
          <span>Configurações</span>
        </RouterLink>
      </nav>
 
      <!-- USUÁRIO + SAIR -->
      <div class="footer">
 
        <button @click="sair" class="botao-sair">
          Sair
        </button>
 
        <div class="user">
          <!-- <img src="/public/user.png" alt="user" /> -->
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
 
<style scoped>
 
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
 