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
                        consegue consultar o histórico de utilização de cada EPI e ver qual funcionário está utilizando
                        ou
                        se esqueceu de devolver.
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
import AppHeader from '../../components/AppHeader.vue';
import 'primeicons/primeicons.css';
import Card from '../../components/Cards.vue';
</script>

<style scoped>
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4.5rem;
}

.features-section {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end
}

.subtitle-dashboard-one {
    font-weight: 300;
    font-size: 1.3rem;
    padding: 2rem;
    color: black;
    background: linear-gradient(135deg, #ff9408, #FF9E1B, #FF9E1B, #FF9E1B);
    width: 45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    color: white;
}

.subtitle-dashboard-two {
    font-weight: 300;
    font-size: 1.3rem;
    padding: 2rem;
    color: black;
    background: linear-gradient(135deg, #ff9408, #FF9E1B, #FF9E1B, #FF9E1B);
    width: 45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    color: white;
}

.subtitle-dashboard-three {
    font-weight: 300;
    font-size: 1.3rem;
    padding: 2rem;
    color: black;
    background: linear-gradient(135deg, #ff9408, #FF9E1B, #FF9E1B, #FF9E1B);
    width: 45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    color: white;
}


.section-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 3rem;
    margin-top: 3rem;
}

.aside-row {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.aside-dashboard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;
    gap: 1rem;
}

.aside-dashboard-left {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    width: 50%;
    gap: 1rem;
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