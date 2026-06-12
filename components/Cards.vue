<template>
    <div class="carousel-wrapper">
        <div class="carousel-container">
            <div class="carousel-track">
                <div
                    v-for="card in cardsLoop"
                    :key="card.id"
                    class="card"
                    @click="() => scrollToFunctionalidades()"
                    role="button"
                    tabindex="0"
                    @keypress.enter="() => scrollToFunctionalidades()"
                >
                    <div class="card-content">
                        <i :class="`pi ${card.icon}`"></i>
                        <h1 class="card-title">{{ card.title }}</h1>
                        <p class="card-description">{{ card.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import 'primeicons/primeicons.css';

const cards = [
    {
        icon: 'pi-chart-bar',
        title: 'Análises e Dashboards',
        description: 'Acompanhe métricas em tempo real'
    },
    {
        icon: 'pi-inbox',
        title: 'Rastreamento de EPIs',
        description: 'Controle de equipamentos simplificado'
    },
    {
        icon: 'pi-times-circle',
        title: 'Pare de tornar dinheiro',
        description: 'Maximize sua margem de lucro'
    },
    {
        icon: 'pi-check-circle',
        title: 'Compatibilidade',
        description: 'Integração com seus sistemas'
    },
    {
        icon: 'pi-check-circle',
        title: 'Compatibilidade',
        description: 'Integração com seus sistemas'
    },
    {
        icon: 'pi-check-circle',
        title: 'Compatibilidade',
        description: 'Integração com seus sistemas'
    },
    {
        icon: 'pi-check-circle',
        title: 'Compatibilidade',
        description: 'Integração com seus sistemas'
    }
];

const cardsLoop = computed(() => {
    return [...cards, ...cards].map((card, index) => ({
        ...card,
        id: `${index}-${card.title}`
    }));
});

const scrollToFunctionalidades = () => {
    const el = document.querySelector('#funcionalidades')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 11rem;
}

.carousel-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: max-content;
    height: 100%;
    animation: marquee 18s linear infinite;
    will-change: transform;
}

.card {
    flex: 0 0 13rem;
    width: 13rem;
    height: 8.75rem;
    background: linear-gradient(135deg, #FF9E1B, #FF8635, #FF4235);
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    text-align: center;
    color: #fff;
}

.card-content i {
    font-size: 2rem;
    color: #fff;
}

.card-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: #fff;
}

.card-description {
    font-size: 0.66rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
}

.card:hover {
    box-shadow: 0 8px 20px rgba(255, 106, 53, 0.3);
    transform: translateY(-0.25rem);
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@media (max-width: 1024px) {
    .carousel-wrapper {
        height: 10rem;
    }

    .card {
        flex: 0 0 11rem;
        width: 11rem;
        height: 7.75rem;
    }

    .card-content i {
        font-size: 1.8rem;
    }

    .card-title {
        font-size: 0.84rem;
    }

    .card-description {
        font-size: 0.58rem;
    }
}

@media (max-width: 768px) {
    .carousel-wrapper {
        height: 9rem;
    }

    .card {
        flex: 0 0 10rem;
        width: 10rem;
        height: 7rem;
    }

    .carousel-track {
        gap: 0.6rem;
    }

    .card-content {
        gap: 0.3rem;
    }

    .card-content i {
        font-size: 1.6rem;
    }

    .card-title {
        font-size: 0.76rem;
    }

    .card-description {
        font-size: 0.52rem;
    }
}

@media (max-width: 480px) {
    .carousel-wrapper {
        height: 8rem;
    }

    .card {
        flex: 0 0 8.8rem;
        width: 8.8rem;
        height: 6.4rem;
    }

    .carousel-track {
        gap: 0.5rem;
    }

    .card-content {
        gap: 0.25rem;
    }

    .card-content i {
        font-size: 1.35rem;
    }

    .card-title {
        font-size: 0.66rem;
    }

    .card-description {
        font-size: 0.46rem;
    }
}

@media (max-width: 375px) {
    .carousel-wrapper {
        height: 7rem;
    }

    .card {
        flex: 0 0 8rem;
        width: 8rem;
        height: 6rem;
    }

    .carousel-track {
        gap: 0.4rem;
    }

    .card-content {
        gap: 0.2rem;
    }

    .card-content i {
        font-size: 1.2rem;
    }

    .card-title {
        font-size: 0.62rem;
    }

    .card-description {
        font-size: 0.42rem;
    }
}

    @media (prefers-color-scheme: dark) {
        .card {
            background: linear-gradient(135deg, #ff8a1c 0%, #ff6f2f 45%, #ef4b2e 100%);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .card:hover {
            box-shadow: 0 10px 24px rgba(255, 126, 51, 0.32);
        }

        .card-content i,
        .card-title,
        .card-description {
            color: #fff;
        }

        .card-description {
            color: rgba(255, 255, 255, 0.88);
        }
    }

    @media (prefers-color-scheme: light) {
        .card {
            background: linear-gradient(135deg, #ff9e1b 0%, #ff8635 50%, #ff4235 100%);
            box-shadow: 0 6px 14px rgba(255, 106, 53, 0.2);
        }

        .card:hover {
            box-shadow: 0 8px 20px rgba(255, 106, 53, 0.3);
        }

        .card-content i,
        .card-title,
        .card-description {
            color: #fff;
        }

        .card-description {
            color: rgba(255, 255, 255, 0.9);
        }
    }
</style>