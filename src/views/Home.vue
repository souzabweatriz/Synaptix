<template>
    <div class="home">
        <AppHeader />
        <section id="inicio" class="section">
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
        <section id="funcionalidades" class="features">
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
                        Todos os produtos estarão devidamente cadastrados na aba "Inventário de EPIs'". Nela, é possível
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
                        Analise a movimentação mensal de EPIs, realize inventários, elabore uma checagem de preços por
                        fornecedores e itens com baixo estoque.
                    </div>
                </div>
            </div>
        </div>
        <div class="image-section">
            <h1 class="colored-text">Pensamos em cada necessidade</h1>
            <h2 class="subtitle-image-section">Esteja no controle de tudo sobre o seu estoque na palma da sua mão, aonde estiver</h2>
            <img src="../../public/Images/phone.png" alt="Celular com dados do site e gráficos com resultados simulados" class="image-section-phone">
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import 'primeicons/primeicons.css';
import Card from '../../components/Cards.vue';
import Footer from '../../components/Footer.vue';

onMounted(() => {
    const cards = Array.from(document.querySelectorAll('.section-dashboard > div'));
    if (!cards.length) return;

    cards.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        el.style.opacity = '0';
        el.style.transform = `translateX(${dir * 40}px)`;
        el.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 700ms';
        el.style.willChange = 'transform, opacity';
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const idx = cards.indexOf(el);
            el.style.transitionDelay = `${idx * 120}ms`;
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
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

/* ── IMAGE SECTION ── */
.image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding: 0 1.5rem;
}

.image-section-phone {
    width: 60%;
    height: auto;
    display: block;
}

.subtitle-image-section {
    font-weight: bolder;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    max-width: 50rem;
}

.colored-text {
    font-size: 1.20rem;
    text-align: center;
    background-image: linear-gradient(to right, #330136, #330136, #FF9E1B, #FF9E1B);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* ── FEATURES ── */
.features-section {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
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
    padding: 0 1.5rem;
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
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1rem;
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

/* ── HERO ── */
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
    width: 50%;
    flex-wrap: wrap;
    padding-left: 5rem;
}
.image-aside {
    width: 45%;
    max-width: 500px;
    height: auto;
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
    width: calc(50% - 0.425rem);
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
    margin-left: 1rem;
    flex-shrink: 0;
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
    padding: 0 0.5rem;
}

.button-aside {
    display: flex;
    width: 100%;
    height: 2.7rem;
    margin-top: 0.4rem;
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
    transition: background 0.2s;
}

.button-aside:hover {
    background: #ff5e35;
}

.button-aside i {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
}

/* ── DASHBOARD ── */
.section-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    padding: 2rem 6rem;
    width: 100%;
}

.section-dashboard > div {
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: 0.8rem;
    padding: 2rem 2.5rem;
    width: 100%;
    max-width: 1100px;
    min-height: 14rem;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.597) 0px 0.7rem 1.4rem;
    transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 520ms;
    will-change: transform;
}

.aside-dashboard:hover,
.aside-dashboard-left:hover {
    transform: translateY(-0.14rem) !important;
    box-shadow: 0 0.72rem 1.2rem rgba(51, 16, 41, 0.09);
}

.aside-dashboard-left {
    flex-direction: row-reverse;
}

.section-dashboard img {
    width: 22rem;
    height: auto;
    flex-shrink: 0;
    border-radius: 0.5rem;
    object-fit: cover;
}

.aside-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
}

.title-dashboard {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
}

.subtitle-dashboard-one,
.subtitle-dashboard-two,
.subtitle-dashboard-three {
    font-size: 0.98rem;
    font-weight: 300;
    line-height: 1.45;
    margin: 0;
    color: white;
}

.section-dashboard > div:nth-child(1) { background: linear-gradient(135deg, #ff7a2e, #ff9e1b); }
.section-dashboard > div:nth-child(2) { background: linear-gradient(135deg, #5b2a86, #8b4bb0); }
.section-dashboard > div:nth-child(3) { background: linear-gradient(135deg, #e74c3c, #ff6a35); }

/* ── TABLET (≤ 1024px) ── */
@media (max-width: 1024px) {
    .section {
        flex-direction: column;
        padding: 2rem;
        gap: 2rem;
    }

    .home-aside {
        width: 100%;
        margin-top: 0;
        align-items: center;
        text-align: center;
    }

    .title-aside {
        width: 100%;
        font-size: 2.4rem;
        text-align: center;
    }

    .subtitle-aside {
        text-align: center;
        width: 100%;
    }

    .items-aside {
        justify-content: center;
    }

    .button-aside {
        max-width: 20rem;
    }

    .image-aside {
        display: none;
    }

    .features-cards {
        flex-wrap: wrap;
    }

    .purple-p {
        width: 100%;
        max-width: 30rem;
        height: auto;
        padding: 0.4rem 1rem;
        font-size: 0.82rem;
    }

    .title-features {
        width: 100%;
        font-size: 1.5rem;
    }

    .features-section {
        flex-direction: column;
        align-items: center;
    }

    .text-section {
        width: 100%;
        justify-content: center;
    }

    .features-text {
        width: 100%;
        font-size: 1.4rem;
        justify-content: center;
    }

    .section-dashboard {
        padding: 2rem 1.5rem;
        gap: 1.5rem;
    }

    .section-dashboard > div {
        flex-direction: column !important;
        align-items: center;
        text-align: center;
        min-height: auto;
        padding: 1.5rem;
        gap: 1.25rem;
    }

    .section-dashboard img {
        width: 100%;
        max-width: 280px;
    }

    .image-section-phone {
        width: 80%;
    }

    .subtitle-image-section {
        font-size: 1.2rem;
    }
}

/* ── MOBILE (≤ 640px) ── */
@media (max-width: 640px) {
    .section {
        padding: 1.5rem 1rem;
    }

    .title-aside {
        font-size: 2rem;
    }

    .subtitle-aside {
        font-size: 1rem;
    }

    .card-items-aside {
        width: 100%;
    }

    .button-aside {
        max-width: 100%;
    }

    .features {
        padding: 0 1rem;
    }

    .title-features {
        font-size: 1.3rem;
    }

    .section-dashboard {
        padding: 1.5rem 1rem;
    }

    .section-dashboard > div {
        padding: 1.25rem 1rem;
    }

    .title-dashboard {
        font-size: 1.1rem;
    }

    .subtitle-dashboard-one,
    .subtitle-dashboard-two,
    .subtitle-dashboard-three {
        font-size: 0.9rem;
    }

    .image-section-phone {
        width: 90%;
    }

    .subtitle-image-section {
        font-size: 1rem;
    }
}

/* ── SMALL MOBILE (≤ 400px) ── */
@media (max-width: 400px) {
    .title-aside {
        font-size: 1.7rem;
    }

    .subtitle-aside {
        font-size: 0.9rem;
    }

    .card-items-aside i {
        margin-left: 0.6rem;
        width: 2.2rem;
        height: 1.8rem;
        font-size: 0.8rem;
    }

    .title-items-aside {
        font-size: 0.72rem;
    }

    .title-features {
        font-size: 1.1rem;
    }

    .image-section-phone {
        width: 95%;
    }
}
</style>