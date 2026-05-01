<template>
    <header class="header-container">
        <div class="header-content">
            <img class="image-header" src="../public/Images/logo.png" alt="LogoImage">
            <nav class="nav-header">
                <ul class="ul-header">
                    <router-link to="/" class="li-header">Início</router-link>
                    <router-link to="/Funcionalidades" class="li-header">Funcionalidades</router-link>
                    <router-link to="/Contato" class="li-header">Contato</router-link>
                </ul>
            </nav>
            <button class="login-button" @click="router.push('/Login')">Entrar</button>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>


<style scoped>

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.423);
}

.header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.image-header {
    width: 8rem;
    height: 3rem;
}

.ul-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
}

.li-header{
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    list-style: none;
    font-weight: 500;
}

.li-header:hover {
    color: #FF5E35;
}

.login-button{
    width: 5.5rem;
    height: 2.2rem;
    background-color: #FF5E35;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-weight: 500;
}

.login-button:hover {
    background-color: #E64A19;
    transition: background-color 0.3s ease;
}

</style>