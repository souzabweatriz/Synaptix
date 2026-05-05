<template>
  <div class="shell">
    <aside class="sidebar">

      <!-- LOGO -->
      <div class="logotipo">
        <img class="logo" src="/logo-sf.png" alt="logo" />
      </div>

      <!-- MENU -->
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

        <!-- SAIR -->
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
  padding: 16px;
}

.logo {
  width: 80px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
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
  width: 20px;
  height: 20px;
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
  gap: 10px;
  padding: 15px;
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
  font-size: 14px;
}

.user img {
  border-radius: 50%;
  width: 40px;
}

.user p {
  margin: 0;
  font-size: 12px;
}

.dot {
  height: 6px;
  width: 6px;
  background: #00ff6a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

/* CONTEÚDO */
.conteudo {
  flex-grow: 1;
  margin-left: 250px;
  padding: 30px;
}

</style>