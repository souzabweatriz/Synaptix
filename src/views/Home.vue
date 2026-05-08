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
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 3rem;
    background-color: #FAFAFA;
}

.home-aside {
    display: flex;
    margin-top: 2rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.85rem;
    width: 45%;
    flex-wrap: wrap;
}

.image-aside {
    margin-top: 4rem;
    width: 45%;
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

@media (max-width: 1024px) {
    .section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .home-aside {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        padding: 2rem;
    }
    .items-aside {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        align-items: center;
    }   
    .image-aside {
        display: none;
    }
    .title-aside{
        width: 80%;
    }
    .subtitle-aside{
        width: 80%;
    }
}

@media (max-width: 640px) {
    .home-aside{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .items-aside {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30rem;
        align-items: center;
    }

    .home-aside {
        margin-left: 0;
        width: 100%;
        padding: 0 1rem;
    }

    .image-aside {
        width: 80%;
        margin-top: 1rem;
    }

    .card-items-aside {
        width: 100%;
    }

    .button-aside {
        width: 17rem;
    }
}

@media (max-width: 480px) {
    .section {
        gap: 1.5rem;
        padding: 0 0.75rem;
    }

    .home-aside {
        width: 100%;
        padding: 1rem 0.5rem;
        gap: 0.6rem;
    }

    .title-aside {
        font-size: 2rem;
        width: 100%;
    }

    .subtitle-aside {
        font-size: 0.95rem;
        width: 100%;
        text-align: left;
    }

    .items-aside {
        width: 100%;
        gap: 0.6rem;
    }

    .card-items-aside {
        width: 100%;
        height: 3.5rem;
    }

    .card-items-aside i {
        width: 2.5rem;
        height: 2rem;
        margin-left: 1rem;
        font-size: 0.85rem;
    }

    .title-items-aside {
        font-size: 0.75rem;
    }

    .button-aside {
        width: 100%;
        height: 2.5rem;
        font-size: 0.85rem;
    }

    .button-aside + i {
        font-size: 0.75rem;
    }
}

@media (max-width: 375px) {
    .section {
        gap: 1rem;
        padding: 0 0.5rem;
        margin-top: 0.25rem;
    }

    .home-aside {
        width: 100%;
        padding: 0.75rem 0.5rem;
        gap: 0.5rem;
    }

    .title-aside {
        font-size: 1.75rem;
        width: 100%;
        margin-bottom: 0.15rem;
    }

    .subtitle-aside {
        font-size: 0.9rem;
        width: 100%;
        text-align: left;
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
        border-radius: 0.35rem;
    }

    .card-items-aside i {
        width: 2.2rem;
        height: 1.8rem;
        margin-left: 0.75rem;
        font-size: 0.75rem;
    }

    .title-items-aside {
        font-size: 0.7rem;
        font-weight: 600;
    }

    .button-aside {
        width: 100%;
        height: 2.3rem;
        font-size: 0.8rem;
        margin-top: 0.6rem;
    }

    .button-aside + i {
        font-size: 0.7rem;
        margin-left: 0.3rem;
    }

    .image-aside {
        width: 100%;
        margin-top: 0.75rem;
    }
}
</style>