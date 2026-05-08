<template>
  <div class="inventario-page">
    <header class="top-section">
      <h1>Estoque de EPIs</h1>
    </header>

    <section class="cards-grid">
      <div
        class="epi-card"
        v-for="epi in epis"
        :key="epi.id"
      >
        <div class="image-box">
          <img :src="epi.imagem" :alt="epi.nome" />
        </div>

        <div class="card-content">
          <h3>{{ epi.nome }}</h3>
          <span class="categoria">{{ epi.categoria }}</span>

          <div class="info-row">
            <div class="info-item">
              <span class="icon">✪</span>

              <div>
                <strong>{{ epi.cor }}</strong>
                <p>(padrão)</p>
              </div>
            </div>

            <div class="info-item">
              <span class="icon">🗃</span>

              <div>
                <strong>Quantidade</strong>
                <p class="estoque">{{ epi.quantidade }} disponíveis</p>
              </div>
            </div>
          </div>

          <div class="info-item ajuste">
            <span class="icon">Aa</span>

            <div>
              <strong>Padrão</strong>
              <p>(alça ajustável)</p>
            </div>
          </div>

          <button class="select-btn">
            Selecionar
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const epis = [
  {
    id: 1,
    nome: 'Óculos de Proteção Anti-Embaçante',
    categoria: 'Óculos',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../oculos.png'
  },

  {
    id: 2,
    nome: 'Luvas de proteção',
    categoria: 'Luvas',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../luvas.png',
  },

  {
    id: 3,
    nome: 'Máscara de Proteção (PFF2)',
    categoria: 'Máscaras',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../mascara.png',
  },

  {
    id: 4,
    nome: 'Protetor Auditivo Tipo Concha',
    categoria: 'Protetores Auditivos',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../protetor-auditivo.png',
  },

  {
    id: 5,
    nome: 'Abafador de Ruído Tipo Concha',
    categoria: 'Protetores Auditivos',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../abafador.png',
  },

  {
    id: 6,
    nome: 'Bota de Segurança',
    categoria: 'Calçados',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../bota.png',
  },

  {
    id: 7,
    nome: 'Colete de Alta Visibilidade',
    categoria: 'Vestimenta',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../colete.png',
  },

  {
    id: 8,
    nome: 'Respirador de Segurança',
    categoria: 'Máscaras',
    cor: 'Prata',
    quantidade: 87,
    imagem: '../respirador.png',
  },
]
</script>

<style scoped>

.top-section {
  margin-bottom: 25px;
}

.top-section h1 {
  font-size: 38px;
  font-weight: 700;
  color: #2f3a4d;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

/* CARD */

.epi-card {
  background: #eadcf6;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0px 5px 18px rgba(0, 0, 0, 0.18);

  transition: 0.2s;
}

.epi-card:hover {
  transform: translateY(-4px);
}

.image-box {
  width: 100%;
  height: 170px;
  background: white;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.image-box img {
  width: 140px;
  height: 140px;
  object-fit: contain;
}

.card-content {
  margin-top: 14px;
}

.card-content h3 {
  font-size: 14px;
  color: #2d2d2d;
  margin-bottom: 3px;
}

.categoria {
  font-size: 12px;
  color: #666;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.info-item strong {
  font-size: 13px;
  color: #1d1d1d;
}

.info-item p {
  font-size: 11px;
  color: #555;
}

.icon {
  font-size: 15px;
  color: #111;
  margin-top: 2px;
}

.estoque {
  color: #00b524 !important;
  font-weight: 600;
}

.ajuste {
  margin-top: 10px;
}

.select-btn {
  width: 100%;
  height: 42px;

  border: none;
  border-radius: 8px;

  margin-top: 18px;

  background: linear-gradient(
    90deg,
    #4a004f,
    #b300c7
  );

  color: white;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s;
}

.select-btn:hover {
  opacity: 0.9;
}

/* RESPONSIVO */

@media (max-width: 1400px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1000px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .inventario-page {
    padding: 20px;
  }

  .top-section h1 {
    font-size: 30px;
  }
}
</style>