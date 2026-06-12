<template>
    <footer id="contato">
        <div class="footer-cta">
            <div class="cta-content">
                <h2>Gostaria de implementar um gerenciador de estoque de EPIs em sua empresa?</h2>
                <button class="cta-btn" @click="router.push('/Login')">Solicitar demonstração →</button>
            </div>
        </div>

        <div class="footer-main">
            <RouterLink to="/" class="footer-logo">
                <img src="../public/Images/logo.png" alt="Synaptix" class="footer-logo-img" />
            </RouterLink>

            <div class="footer-links">
                <p class="footer-links-title">Links Úteis</p>
                <a href="#inicio" @click.prevent="scrollToSection('inicio')">Início</a>
                <a href="#funcionalidades" @click.prevent="scrollToSection('funcionalidades')">Funcionalidades</a>
                <a href="#contato" @click.prevent="scrollToSection('contato')">Contato</a>
            </div>

            <button class="impl-btn" @click="router.push('/Login')">Implementar agora</button>
        </div>

        <div class="footer-bottom">
            <div class="footer-contact">
                <hr class="footer-divider" />
                <p>+55 (19) 91234-5678</p>
                <p>contato@synaptix.com.br</p>
            </div>
            <p class="footer-copy">© 2025 — Copyright</p>
        </div>

        <div class="footer-social">
            <a href="https://wa.me/5519912345678" target="_blank" aria-label="WhatsApp">
                <i class="pi pi-whatsapp"></i>
            </a>
            <a href="https://instagram.com/synaptix" target="_blank" aria-label="Instagram">
                <i class="pi pi-instagram"></i>
            </a>
        </div>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const scrollToSection = (id) => {
    const el = document.querySelector(`#${id}`)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
        // Se a seção não existir, navegação não é feita aqui; mantém comportamento atual
    }
}
</script>

<style scoped>
footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: inherit;
}

.footer-cta {
    position: relative;
    width: 100%;
    min-height: 90px;
    background-image: url('../public/Images/footerImg.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    padding: 1.25rem 2rem;
}

.footer-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(20, 10, 30, 0.55);
}

.cta-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 420px;
}

.cta-content h2 {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
}

.cta-btn {
    align-self: flex-start;
    background: #ff6a2e;
    color: #fff;
    border-radius: 2rem;
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: background 200ms ease;
}

.cta-btn:hover {
    background: #e85a1e;
}

.footer-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem 0.75rem;
    background: #fff;
    gap: 1.5rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.footer-logo-img {
    width: 6rem;
    height: auto;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.footer-links-title {
    font-size: 0.72rem;
    font-weight: 600;
    color: #888;
    margin: 0 0 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.footer-links a {
    color: #333;
    text-decoration: none;
    font-size: 0.82rem;
    transition: color 200ms;
}

.footer-links a:hover,
.footer-links a.router-link-active {
    color: #ff6a2e;
}

.impl-btn {
    background: #ff6a2e;
    color: #fff;
    border-radius: 2rem;
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition: background 200ms ease;
}

.impl-btn:hover {
    background: #e85a1e;
}

.footer-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 2rem 0.75rem;
    background: #fff;
}

.footer-contact {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.footer-divider {
    border: none;
    border-top: 1.5px solid #ddd;
    width: 2rem;
    margin: 0 0 0.4rem;
}

.footer-contact p {
    margin: 0;
    font-size: 0.78rem;
    color: #444;
}

.footer-copy {
    font-size: 0.72rem;
    color: #aaa;
    margin: 0;
}

.footer-social {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem 2rem 1rem;
    background: #fff;
}

.footer-social a {
    color: #aaa;
    font-size: 1rem;
    transition: color 200ms;
    text-decoration: none;
}

.footer-social a:hover {
    color: #ff6a2e;
}

@media (max-width: 768px) {
    .footer-cta {
        padding: 1rem 1.25rem;
        min-height: auto;
    }

    .cta-content {
        max-width: 100%;
    }

    .cta-content h2 {
        font-size: 0.85rem;
    }

    .footer-main {
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25rem;
        gap: 1rem;
    }

    .impl-btn {
        width: 100%;
        text-align: center;
    }

    .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0 1.25rem 0.75rem;
    }

    .footer-copy {
        align-self: flex-end;
    }

    .footer-social {
        padding: 0.5rem 1.25rem 1rem;
    }
}

@media (max-width: 480px) {
    .footer-logo-img {
        width: 3.5rem;
    }

    .cta-btn {
        width: 100%;
        text-align: center;
    }
}
</style>