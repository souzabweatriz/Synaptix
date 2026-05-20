<template>
    <div class="home">
        <AppHeader />
        <section class="section">
            <aside class="home-aside">
                <h1 class="title-aside">
                    Gerencie todo o seu estoque de <span>EPIs</span>
                </h1>
                <p class="subtitle-aside">
                    <span>Synaptix</span> é um sistema de controle de estoque de EPIs que centraliza a gestão dos
                    equipamentos de proteção de forma simples, segura e eficiente. Com relatórios, filtros inteligentes
                    e acesso em qualquer dispositivo, o SafetyHub ajuda empresas a manterem organização, reduzindo
                    gastos com compras desnecessárias de novos equipamentos, modernizando o setor e auxiliando na
                    fluidez.
                </p>
                <div class="items-aside">
                    <div class="card-items-aside">
                        <i class="pi pi-dollar"></i>
                        <h1 class="title-items-aside">Redução nos custos</h1>
                    </div>
                    <div class="card-items-aside">
                        <i class="pi pi-clock"></i>
                        <h1 class="title-items-aside">Implementação Rápida</h1>
                    </div>
                    <div class="card-items-aside">
                        <i class="pi pi-verified"></i>
                        <h1 class="title-items-aside">Estoque seguro e rastreável</h1>
                    </div>
                    <div class="card-items-aside">
                        <i class="pi pi-mobile"></i>
                        <h1 class="title-items-aside">Acesso mobile completo</h1>
                    </div>
                    <button class="button-aside">
                        Solicitar demonstração
                        <i class="pi pi-arrow-right"></i>
                    </button>
                </div>
            </aside>
            <img src="../../public/Images/homeImg.png" alt="Imagem de controle de estoque" class="image-aside">
        </section>
        <section class="features">
            <div class="features-titles">
                <p class="purple-p">Tecnologia que transforme o seu gerenciamento de EPIs</p>
                <h1 class="title-features">Aproveite de todas as funcionalidades que irão facilitar o seu dia a dia</h1>
            </div>
            <div class="features-cards">
                <Card />
            </div>
            <div class="features-section">
                <div class="text-section">
                    <h1 class="features-text">
                        Sistema completo com tudo que a sua empresa precisa
                    </h1>
                </div>
                <div class="features-image">
                    <img class="image-feature" src="../../public/Images/homeFone.png" alt="">
                </div>
            </div>
        </section>
        <div class="section-dashboard">
            <div class="aside-dashboard">
                <img src="../../public/Images/dashboard1.png" alt="Dashboard">
                <div class="aside-row">
                    <h1 class="title-dashboard">Rastreamento do seu estoque de EPIs</h1>
                    <div class="subtitle-dashboard-one">
                        Está sentido a falta de alguns equipamentos em seu estoque? Com o <span>Synaptix</span>, você
                        consegue consultar o histórico de utilização de cada EPI e ver qual funcionário está utilizando ou se esqueceu de devolver.
                    </div>
                </div>
            </div>
            <div class="aside-dashboard-left">
                <img src="../../public/Images/dashboard1.png" alt="Dashboard">
                <div class="aside-row">
                    <h1 class="title-dashboard">Inventário completo de EPIs</h1>
                    <div class="subtitle-dashboard-two">
                        Todos os produtos estarão devidamente cadastrados na aba “Inventário de EPIs’”. Nela, é possível
                        obter a listagem de todos os EPIs cadastrados, o status de utilização, preço e a quantidade.
                    </div>
                </div>
            </div>
            <div class="aside-dashboard">
                <img src="../../public/Images/dashboard1.png" alt="Dashboard">
                <div class="aside-row">
                    <h1 class="title-dashboard">Emissão de relatórios para análises</h1>
                    <div class="subtitle-dashboard-three">
                        É possível emitir relatórios específicos para cada necessidade, tudo dentro do gerenciador.
                        Analise
                        a movimentação mensal de EPIs, realize inventários, elabore uma checagem de preços por
                        fornecedores
                        e itens com baixo estoque.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import 'primeicons/primeicons.css';
import Card from '../../components/Cards.vue';

onMounted(() => {
    const cards = Array.from(document.querySelectorAll('.section-dashboard > div'));
    if (!cards.length) return;

    // inicializa estado oculto e posicionamento alternado
    cards.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        el.style.opacity = '0';
        el.style.transform = `translateX(${dir * 40}px) translateY(0)`;
        el.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 700ms';
        el.style.willChange = 'transform, opacity';
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const idx = cards.indexOf(el);
            // stagger usando delay baseado no índice
            el.style.transitionDelay = `${idx * 120}ms`;
            el.style.opacity = '1';
            el.style.transform = 'translateX(0) translateY(0)';
            obs.unobserve(el);
        });
    }, { threshold: 0.18 });

    cards.forEach(c => io.observe(c));
});
</script>

<style scoped>
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4.4rem;
}

.features-section {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end
}


.subtitle-dashboard-two {
    font-weight: 300;
    font-size: 1.3rem;
    color: white;
}

.subtitle-dashboard-three {
    font-weight: 300;
    font-size: 1.3rem;
    color: white;
}


/* Dashboard: layout em coluna (estilo da imagem), alterna imagem/texto por card */
.section-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2.5rem;
    margin-top: 1rem;
    padding: 2rem 1rem;
}

.aside-row {
    display: flex;
    flex-direction: column;
    align-items: center;
}


/* Card base */

.section-dashboard > div {
    display: flex;
    align-items: center;
    justify-content: center; /* centraliza o conteúdo horizontalmente */
    gap: 1.5rem;
    background: transparent;
    border-radius: 0.8rem;
    box-shadow: 0 0.6rem 1.4rem rgba(51,16,41,0.06);
    padding: 1.5rem;
    width: 100%;
    max-width: 1100px; /* centraliza e limita largura para visual semelhante à imagem */
    min-height: 14rem;
    overflow: visible; /* permitir imagem sair do card */
    position: relative;
}

/* Inverte ordem no segundo card para imagem à direita */

.section-dashboard > div.aside-dashboard-left {
    flex-direction: row-reverse;
}

/* Imagem do card */
.section-dashboard img {
    width: 22rem; /* aumentar imagem */
    height: auto;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 0.5rem;
    transition: transform 300ms ease;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

/* posiciona imagens para fora do card colorido */
.section-dashboard > div:nth-child(1) img {
    left: -6rem;
}
.section-dashboard > div:nth-child(2) img {
    right: -6rem;
    left: auto;
}
.section-dashboard > div:nth-child(3) img {
    left: -6rem;
}

.aside-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center; /* centraliza os textos */
    text-align: center; /* centraliza o texto interno */
    width: 100%;
}

.title-dashboard {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 700;
}


.section-dashboard > div:nth-child(1) {
    background: linear-gradient(135deg,#ff7a2e,#ff9e1b);
    color: #fff;
    padding-left: 9rem; /* espaço para a imagem que fica fora */
}

.section-dashboard > div:nth-child(2) {
    background: linear-gradient(135deg,#5b2a86,#8b4bb0);
    color: #fff;
    padding-right: 9rem; /* espaço para a imagem que fica fora à direita */
}

.section-dashboard > div:nth-child(3) {
    background: linear-gradient(135deg,#e74c3c,#ff6a35);
    color: #fff;
    padding-left: 9rem; /* espaço para a imagem que fica fora */
}

.subtitle-dashboard-one,
.subtitle-dashboard-two,
.subtitle-dashboard-three {
    font-weight: 300;
    font-size: 0.98rem;
    padding: 0.5rem 0.75rem;
    color: inherit; /* usa white do card */
    background: transparent;
    width: calc(100% - 14rem);
    max-width: calc(100% - 14rem);
    line-height: 1.45;
    border-radius: 0.25rem;
}

.image-feature {
    width: 100%;
}

.text-section {
    display: flex;
    width: 50%;
}

.features-text {
    display: flex;
    font-weight: 600;
    font-size: 1.75rem;
    flex-wrap: wrap;
    width: 40%;
    text-align: center;
}

.features {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.features-cards {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width: 100%;
    margin-top: 2rem;
}

.purple-p {
    color: #330136;
    background-color: #683ab620;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    border: #683ab689 0.01rem solid;
    border-radius: 1rem;
    height: 2rem;
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-features {
    width: 70%;
    flex-wrap: wrap;
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.features-titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 3rem;
}

.section {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 3rem;
    background-color: #FAFAFA;
    padding: 2rem 0;
    min-height: auto;
}

.home-aside {
    display: flex;
    margin-top: 2rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    margin-left: 5rem;
    width: 50%;
    flex-wrap: wrap;
}

.image-aside {
    width: 45%;
    max-width: 500px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
}


.title-aside {
    font-size: 3rem;
    margin-bottom: 0.25rem;
    width: 80%;
}

.title-aside span {
    background-image: linear-gradient(to right, #ff9408, #FF9E1B, #FF9E1B, #FF9E1B);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle-aside {
    font-weight: 300;
    font-size: 1.2rem;
    color: black;
    margin-bottom: 0.25rem;
    text-align: justify;
}

.subtitle-aside span {
    font-weight: 800;
}

.items-aside {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    width: 100%;
    transform: translateY(0.5rem);
}


.card-items-aside {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 4rem;
    border: 0.1rem solid #cc6670;
    border-radius: 0.45rem;
    background: #fff;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card-items-aside:hover {
    transform: translateY(-0.35rem);
    box-shadow: 0 0.7rem 1.4rem rgba(139, 47, 67, 0.16);
    border-color: #8b2f43;
}

.card-items-aside i {
    display: flex;
    width: 3rem;
    height: 2.3rem;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 2rem;
    background: #8b2f43;
    color: #fff;
    font-size: 1rem;
}

.title-items-aside {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.83rem;
    font-weight: 600;
    color: #333;
}

.button-aside {
    display: flex;
    width: 15rem;
    height: 2.7rem;
    margin-top: 0.9rem;
    border: none;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background: #ff6a35;
    color: #fff;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
}

.button-aside:hover {
    background: #ff5e35;
}

.button-aside+i {
    display: flex;
    align-items: center;
    color: #fff;
}

.button-aside i {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
}

@media (max-width: 1024px) {
    .section-dashboard {
        /* já em coluna por padrão, manter ajustes menores */
        gap: 1.25rem;
        padding: 0.5rem 0;
        align-items: center;
    }

    .section-dashboard > div {
        width: 100%;
        min-height: auto;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }

    .section-dashboard > div.aside-dashboard-left {
        flex-direction: column;
    }

    .section-dashboard img {
        position: static;
        transform: none;
        width: 60%;
        max-width: 260px;
        margin: 0 auto;
    }

    .subtitle-dashboard-one,
    .subtitle-dashboard-two,
    .subtitle-dashboard-three {
        width: 100%;
        max-width: 100%;
    }

    .section {
        flex-direction: column;
        padding: 1.5rem;
    }

    .home-aside {
        width: 100%;
        margin-left: 0;
        margin-top: 1rem;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    .items-aside {
        width: 100%;
        justify-content: center;
    }

    .card-items-aside {
        width: calc(50% - 0.425rem);
    }

    .image-aside {
        display: none;
    }

    .title-aside {
        width: 100%;
        font-size: 2.5rem;
    }

    .subtitle-aside {
        width: 100%;
    }
}

/* Animações de entrada: cada card aparece vindo de um lado */
@keyframes slideInLeft {
    from { transform: translateX(-3rem); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
    from { transform: translateX(3rem); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInUp {
    from { transform: translateY(2rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* Aplica animações com stagger */
.section-dashboard > div:nth-child(1) {
    animation: slideInLeft 700ms cubic-bezier(.2,.9,.2,1) both 0.05s;
}

.section-dashboard > div:nth-child(2) {
    animation: slideInRight 700ms cubic-bezier(.2,.9,.2,1) both 0.18s;
}

.section-dashboard > div:nth-child(3) {
    animation: slideInUp 700ms cubic-bezier(.2,.9,.2,1) both 0.30s;
}

@media (max-width: 640px) {
    .section {
        padding: 1rem;
    }

    .home-aside {
        width: 100%;
        margin-left: 0;
        padding: 0;
        gap: 1rem;
    }

    .items-aside {
        width: 100%;
        flex-direction: column;
        gap: 0.75rem;
    }

    .card-items-aside {
        width: 100%;
        height: 3.5rem;
    }

    .image-aside {
        display: none;
    }

    .title-aside {
        font-size: 2rem;
        width: 100%;
    }

    .subtitle-aside {
        font-size: 1rem;
        width: 100%;
    }

    .button-aside {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .section {
        padding: 0.75rem;
    }

    .home-aside {
        width: 100%;
        padding: 0;
        gap: 0.75rem;
    }

    .title-aside {
        font-size: 1.75rem;
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .subtitle-aside {
        font-size: 0.9rem;
        width: 100%;
        line-height: 1.4;
    }

    .items-aside {
        width: 100%;
        gap: 0.5rem;
        transform: translateY(0.25rem);
    }

    .card-items-aside {
        width: 100%;
        height: 3.2rem;
        padding: 0.5rem;
    }

    .card-items-aside i {
        width: 2.2rem;
        height: 1.8rem;
        margin-left: 0.75rem;
        font-size: 0.75rem;
    }

    .title-items-aside {
        font-size: 0.7rem;
    }

    .button-aside {
        width: 100%;
        height: 2.3rem;
        font-size: 0.8rem;
        gap: 0.4rem;
    }

    .button-aside i {
        font-size: 0.7rem;
    }

    .image-aside {
        display: none;
    }
}

@media (max-width: 375px) {
    .section {
        padding: 0.5rem;
    }

    .home-aside {
        width: 100%;
        padding: 0;
        gap: 0.5rem;
    }

    .title-aside {
        font-size: 1.5rem;
        width: 100%;
    }

    .subtitle-aside {
        font-size: 0.85rem;
        width: 100%;
        line-height: 1.3;
    }

    .items-aside {
        width: 100%;
        gap: 0.4rem;
    }

    .card-items-aside {
        width: 100%;
        height: 2.8rem;
        padding: 0.4rem;
    }

    .card-items-aside i {
        width: 2rem;
        height: 1.6rem;
        margin-left: 0.5rem;
        font-size: 0.65rem;
    }

    .title-items-aside {
        font-size: 0.65rem;
    }

    .button-aside {
        width: 100%;
        height: 2.1rem;
        font-size: 0.75rem;
        gap: 0.3rem;
    }

    .button-aside i {
        font-size: 0.65rem;
    }

    .image-aside {
        display: none;
    }
}
</style>