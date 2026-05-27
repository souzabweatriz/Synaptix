<template>
  <div class="error-container">
    <div class="error-wrapper">
      
      <div class="image-box">
        <img 
          src="/Captura de tela ERRO.2.png" 
          alt="Ilustração de erro" 
          class="home__hero-img shadow-lg"
        >
      </div>

      <div class="content-box">
        <div class="text-relative">
          <h1 class="error-code">{{ errorCode }}</h1>
          <p class="error-badge">Ops! Algo deu errado.</p>
        </div>

        <h2 class="error-title">{{ title }}</h2>
        <p class="error-message">{{ message }}</p>

        <div class="actions-group">
          <button class="btn-primary" @click="goHome">
            Voltar para Home
          </button>
          <button class="btn-secondary" @click="refreshPage">
            Recarregar Página
          </button>
        </div>

        <p class="support-text">
          Se o problema persistir, entre em contato com o 
          <a href="#" class="support-link">suporte técnico</a>.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  errorCode: {
    type: String,
    default: '404'
  },
  title: {
    type: String,
    default: 'A Página não foi encontrada'
  },
  message: {
    type: String,
    default: 'A página que você está procurando não foi encontrada.'
  }
});

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const refreshPage = () => {
  window.location.reload();
};
</script>

<style scoped>
/* --- Layout Base --- */
.error-container {
  min-height: 100vh;
  background-color: #f9fafb; /* gray-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-family: sans-serif;
}

.error-wrapper {
  display: flex;
  flex-direction: column; /* Mobile primeiro: em coluna */
  align-items: center;
  gap: 2rem;
  max-width: 48rem; /* max-w-3xl */
  width: 100%;
  text-align: center;
}

/* --- Responsividade (Lado a Lado no Desktop) --- */
@media (min-width: 768px) {
  .error-wrapper {
    flex-direction: row; /* Alinha lado a lado no PC */
    text-align: left;    /* Alinha o texto para a esquerda */
    gap: 3rem;
  }

  .image-box {
    flex: 0 0 40%; /* Ocupa exatamente 40% da largura */
  }

  .content-box {
    flex: 1;       /* Ocupa o restante do espaço */
  }
}

/* --- Componentes: Imagem --- */
.home__hero-img {
  display: block;
  width: 100%;
  max-width: 220px;
  border-radius: 150px;
  margin: 0 auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.2s ease-in-out;
}

/* --- Componentes: Textos --- */
.text-relative {
  position: relative;
  margin-bottom: 1.5rem;
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  color: #e5e7eb; /* gray-200 */
  margin: 0;
  line-height: 1;
  user-select: none;
}

.error-badge {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4f46e5; /* indigo-600 */
  margin: 0;
  padding-top: 1rem;
}

@media (min-width: 768px) {
  .error-code {
    font-size: 8rem;
  }
  .error-badge {
    justify-content: flex-start; /* Alinha o texto "Ops!" à esquerda no PC */
    padding-top: 0;
  }
}

.error-title {
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  color: #111827; /* gray-900 */
  margin: 0;
  letter-spacing: -0.025em;
}

.error-message {
  margin-top: 0.75rem;
  color: #4b5563; /* gray-600 */
  font-size: 1rem;
  line-height: 1.5;
}

/* --- Botões de Ação --- */
.actions-group {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .actions-group {
    flex-direction: row;
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .actions-group {
    justify-content: flex-start;
  }
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5; /* indigo-600 */
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca; /* indigo-700 */
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #d1d5db; /* gray-300 */
  color: #374151; /* gray-700 */
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #f3f4f6; /* gray-100 */
}

/* --- Suporte --- */
.support-text {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #9ca3af; /* gray-400 */
}

.support-link {
  color: #9ca3af;
  text-decoration: underline;
}

.support-link:hover {
  color: #4f46e5;
}

/* --- Animações --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
