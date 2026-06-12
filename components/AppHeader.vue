<template>
    <header class="header-container">
        <div class="header-content">
            <img class="image-header" src="../public/Images/logo.png" alt="LogoImage">

            <nav class="nav-header">
                <ul class="ul-header">
                    <a href="#inicio" class="li-header" @click.prevent="scrollToSection('inicio')">Início</a>
                    <a href="#funcionalidades" class="li-header" @click.prevent="scrollToSection('funcionalidades')">Funcionalidades</a>
                    <a href="#contato" class="li-header" @click.prevent="scrollToSection('contato')">Contato</a>
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
            <a href="#inicio" class="mobile-link" @click.prevent="scrollToSection('inicio')">Início</a>
            <a href="#funcionalidades" class="mobile-link" @click.prevent="scrollToSection('funcionalidades')">Funcionalidades</a>
            <a href="#contato" class="mobile-link" @click.prevent="scrollToSection('contato')">Contato</a>
            <button class="mobile-login" @click="() => { isOpen = false; router.push('/Login') }">Entrar</button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => { isOpen.value = !isOpen.value };

const scrollToSection = (id) => {
    isOpen.value = false;
    const el = document.querySelector(`#${id}`)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
        router.push('/').then(() => {
            const next = document.querySelector(`#${id}`)
            if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }
};
</script>

<style scoped>
.header-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.423);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #fff;
    transition: background-color 0.3s ease;
}

.header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    padding: 0 2rem;
    gap: 1.5rem;
}

.image-header {
    width: 8rem;
    height: 3rem;
    object-fit: contain;
    flex-shrink: 0;
}

.ul-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.li-header {
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
}

.li-header:hover {
    color: #FF5E35;
}

.login-button {
    width: 5.5rem;
    height: 2.2rem;
    flex-shrink: 0;
    background-color: #FF5E35;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #E64A19;
}

/* Hamburger */
.menu-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.4rem;
    flex-shrink: 0;
}

.menu-toggle .bar {
    display: block;
    width: 1.6rem;
    height: 2px;
    background: #333;
    margin: 4px 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-toggle .bar.open:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.menu-toggle .bar.open:nth-child(2) { opacity: 0; }
.menu-toggle .bar.open:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Mobile nav dropdown */
.mobile-nav {
    display: none;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1.5rem 1.25rem;
    background: #fff;
    border-top: 1px solid #f0f0f0;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

.mobile-link {
    text-decoration: none;
    color: #111;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.55rem 0;
    border-bottom: 1px solid #f4f4f4;
}

.mobile-link:last-of-type {
    border-bottom: none;
}

.mobile-login {
    background: #FF5E35;
    color: #fff;
    border: none;
    padding: 0.6rem 0;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background-color 0.2s;
}

.mobile-login:hover {
    background: #E64A19;
}

/* ── TABLET ── */
@media (max-width: 900px) {
    .ul-header { display: none; }
    .login-button { display: none; }
    .menu-toggle { display: block; }
    .mobile-nav { display: flex; }

    .header-content {
        padding: 0 1.25rem;
    }
}

/* ── MOBILE ── */
@media (max-width: 640px) {
    .header-content {
        padding: 0 1rem;
        height: 4rem;
    }

    .image-header {
        width: 6.5rem;
        height: 2.4rem;
    }
}

@media (max-width: 375px) {
    .header-content {
        padding: 0 0.75rem;
        height: 3.75rem;
    }

    .image-header {
        width: 5.5rem;
        height: 2rem;
    }
}
</style>