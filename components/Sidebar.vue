<template>
    <div class="shell">
        <aside class="sidebar">
            <div class="logotipo">
                <img class="logo" src="../assets/LogoTipo.svg">
            </div>
            <nav class="menu">
                <RouterLink to="/Dashboard/Funcionarios" class="menu-item" active-class="active">
                    <span>Funcionários</span>
                </RouterLink>
                <RouterLink to="/Dashboard/Entregas" class="menu-item" active-class="active">
                    <span>Entregas de EPI</span>
                </RouterLink>
                <RouterLink to="/Dashboard/Relatorios" class="menu-item" active-class="active">
                    <span>Relatórios</span>
                </RouterLink>
            </nav>
            <button @click="sair" class="botao-sair">
                <i class="fas fa-sign-out-alt"></i>
                <span>Sair</span>
            </button>
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
.sidebar {
    display: flex;
    gap: 1rem;
    width: 15rem;
    height: 100vh;
    background-color: #0A3B59;
    flex-direction: column;
    position: fixed;
    z-index: 1000;
    overflow-y: auto;
}
.logotipo{
    display: flex;
    background-color: #f2f2f2;
    width: 15rem;
}
.logo {
    width: 14rem;
    padding-left: 1rem;
}
.menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.menu-item {
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    color: #f2f2f2;
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}
.menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.menu-item.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    border-left: 0.2rem solid #f2f2f2;
}
.menu-item i {
    font-size: 20px;
    width: 24px;
    text-align: center;
}
.botao-sair {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    color: #f2f2f2;
    border: none;
    height: 2.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    width: 100%;
}
.botao-sair:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.botao-sair:active {
    transform: scale(0.98);
}
.botao-sair i {
    font-size: 18px;
}
.conteudo {
    flex-grow: 1;
    margin-left: 250px;
    padding: 30px;
    overflow-y: auto;
    background-color: #FFFFFF;
}
@media (max-width: 768px) {
    .sidebar {
        width: 200px;
    }
    .conteudo {
        margin-left: 200px;
        padding: 20px;
    }
    .logo {
        font-size: 20px;
        margin-bottom: 30px;
    }
    .menu-item {
        padding: 12px 15px;
        font-size: 14px;
    }
}
@media (max-width: 480px) {
    .sidebar {
        width: 100%;
        position: absolute;
        height: auto;
    }
    .conteudo {
        margin-left: 0;
        padding: 15px;
    }
}
</style>
 
<script setup>
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
const { supabase } = useSupabase()
const router = useRouter()
async function sair() {
    try {
        await supabase.auth.signOut()
        router.push('/Login')
    }
    catch (err) {
        console.error('Erro ao fazer logout:', err)
    }
}
</script>