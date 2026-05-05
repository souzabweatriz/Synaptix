<template>
    <div class="home">
        <AppHeader />
        <div class="section">
            <div class="home-aside">
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
                    <button class="button-aside">Solicitar demonstração</button>
                    <i class="pi pi-arrow-right"></i>
                </div>
            </div>
            <img src="../../public/Images/homeImg.svg" alt="Imagem de controle de estoque" class="image-aside">
        </div>
    </div>
</template>

<script setup>
import AppHeader from '../../components/AppHeader.vue';
import 'primeicons/primeicons.css';
</script>

<style scoped>
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 1rem 0 0;
}

.home-aside {
    display: flex;
    margin-left: 1.5rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.85rem;
    width: 45%;
    flex-wrap: wrap;
}

.image-aside {
    margin-top: 4rem;
    width: 50%;
}

.title-aside {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
}

.title-aside span {
    background-image: linear-gradient(to right, #ff9408, #FF9E1B, #FF9E1B, #FF9E1B);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle-aside {
    font-size: 1.2rem;
    color: black;
    margin-bottom: 0.25rem;
}

.subtitle-aside span {
    font-weight: 800;
}

.items-aside {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    width: 100%;
}

.card-items-aside {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 4rem;
    border: 0.06rem solid #cc6670;
    border-radius: 0.45rem;
    background: #fff;
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
}

.button-aside + i {
    display: flex;
    align-items: center;
    color: #fff;
}

.button-aside i {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
}

@media (max-width: 640px) {
    .section {
        flex-direction: column;
        align-items: flex-start;
    }

    .home-aside {
        margin-left: 0;
        width: 100%;
        padding: 0 1rem;
    }

    .image-aside {
        width: 100%;
        margin-top: 1rem;
    }

    .card-items-aside {
        width: 100%;
    }

    .button-aside {
        width: 100%;
    }
}
</style>