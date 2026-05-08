<template>
    <header class="header-container">
        <div class="header-content">
            <img class="image-header" src="../public/Images/logo.png" alt="LogoImage">

            <nav class="nav-header">
                <ul class="ul-header">
                    <router-link to="/" class="li-header" @click="isOpen = false">Início</router-link>
                    <router-link to="/Funcionalidades" class="li-header" @click="isOpen = false">Funcionalidades</router-link>
                    <router-link to="/Contato" class="li-header" @click="isOpen = false">Contato</router-link>
                </ul>
            </nav>

            <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menu" :aria-expanded="isOpen">
                <span class="bar" :class="{ open: isOpen }"></span>
                <span class="bar" :class="{ open: isOpen }"></span>
                <span class="bar" :class="{ open: isOpen }"></span>
            </button>

            <button class="login-button" @click="router.push('/Login')">Entrar</button>
        </div>

        <div class="mobile-nav" v-show="isOpen">
            <router-link to="/" class="mobile-link" @click="isOpen = false">Início</router-link>
            <router-link to="/Funcionalidades" class="mobile-link" @click="isOpen = false">Funcionalidades</router-link>
            <router-link to="/Contato" class="mobile-link" @click="isOpen = false">Contato</router-link>
            <button class="mobile-login" @click="() => { isOpen = false; router.push('/Login')}">Entrar</button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isOpen = ref(false);
const toggleMenu = () => { isOpen.value = !isOpen.value };
</script>


<style scoped>

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.423);
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

/* Menu toggle (mobile) */
.menu-toggle{
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}
.menu-toggle .bar{
    display: block;
    width: 1.6rem;
    height: 2px;
    background: #333;
    margin: 4px 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
}
.menu-toggle .bar.open:nth-child(1){ transform: translateY(6px) rotate(45deg); }
.menu-toggle .bar.open:nth-child(2){ opacity: 0; }
.menu-toggle .bar.open:nth-child(3){ transform: translateY(-6px) rotate(-45deg); }

.mobile-nav{
    display: none;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0.75rem 1rem 1.25rem 1rem;
    background: #fff;
    box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}
.mobile-link{
    text-decoration: none;
    color: #111;
    font-weight: 600;
    padding: 0.5rem 0;
}
.mobile-login{
    background: #FF5E35;
    color: #fff;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.4rem;
    width: 6rem;
}

@media (max-width: 640px){
    .image-header{ width: 6rem; height: 2.2rem; margin-left: 0.5rem }
    .ul-header{ display: none }
    .menu-toggle{ display: block }
    .login-button{ display: none }
    .mobile-nav{ display: flex }
}

@media (max-width: 375px){
    .header-container{ height: auto }
    .header-content{ padding: 0.5rem 0.75rem }
    .image-header{ width: 5.2rem }
    .mobile-nav{ padding-left: 0.75rem; padding-right: 0.75rem }
}


</style>