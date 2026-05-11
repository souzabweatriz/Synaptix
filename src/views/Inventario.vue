<template>
  <div class="inventario-page">

    <header class="top-section">
      <h1>Estoque de EPIs</h1>
    </header>

    <!-- GRID DOS CARDS -->
    <div class="grid-cards">

      <div
        v-for="epi in epis"
        :key="epi.id"
        class="card-epi"
      >

        <!-- IMAGEM -->
        <div class="card-image">
          <img
            :src="epi.foto"
            :alt="epi.nome || 'EPI'"
            loading="lazy"
          />
        </div>

        <!-- CONTEÚDO -->
        <div class="card-body">

          <!-- TOPO -->
          <div class="top-info">

            <div class="equipamento-info">

              <h3>{{ epi.nome }}</h3>

              <p class="categoria">
                {{ epi.categoria }}
              </p>

            </div>

            <div class="status">
              Disponível
            </div>

          </div>

          <!-- COR + ESTOQUE -->
          <div class="card-info-row">

            <!-- COR -->
            <div class="info-item">

              <div class="info-content">

                <img
                  class="info-icon"
                  src="/cor.png"
                  alt="Ícone cor"
                />

                <div class="info-text">

                  <span class="label">
                    Cor
                  </span>

                  <strong>
                    {{ epi.cor }}
                  </strong>

                </div>

              </div>

            </div>

            <!-- ESTOQUE -->
            <div class="info-item">

              <div class="info-content">

                <img
                  class="info-icon"
                  src="/estoque-pronto.png"
                  alt="Ícone estoque"
                />

                <div class="info-text">

                  <span class="label">
                    Qtd. Estoque
                  </span>

                  <strong>
                    {{ epi.quantidade || 0 }} unidades
                  </strong>

                </div>

              </div>

            </div>

          </div>

          <!-- PREÇO -->
          <div class="card-info">

            <div class="info-item">

              <div class="info-content">

                <img
                  class="info-icon"
                  src="/bolsa-de-dinheiro.png"
                  alt="Ícone preço"
                />

                <div class="info-text">

                  <span class="label">
                    Preço
                  </span>

                  <strong>
                    R$
                    {{
                      Number(epi.preco || 0).toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2
                        }
                      )
                    }}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const epis = ref([])

const carregarEPIs = async () => {

  const { data, error } = await supabase
    .from('epis')
    .select('*')

  if (error) {
    console.error(error)
    return
  }

  epis.value = data
}

onMounted(() => {
  carregarEPIs()
})

</script>

<style scoped>

.top-section {
  margin-bottom: 1.56rem;
}

.top-section h1 {
  font-size: 1.5em;
  font-weight: 600;
  color: #332D48;
}

/* GRID */

.grid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* CARD */

.card-epi {
  background: rgba(115, 0, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0rem 0.31rem 1.12rem rgba(0, 0, 0, 0.10);
  transition: 0.2s ease;
}

.card-epi:hover {
  transform: translateY(-0.25rem);
}

/* IMAGEM */

.card-image {
  width: 100%;
  height: 13rem;
  background: #ffffff;
  border-radius: 0.87rem;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.75rem;
}

/* BODY */

.card-body {
  margin-top: 1.25rem;
}

/* TOPO */

.top-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.equipamento-info {
  display: flex;
  flex-direction: column;
}

/* NOME */

.card-body h3 {
  font-size: 0.875rem;
  color: #000000;
  font-weight: bold;
  margin: 0;
  line-height: 1.3;
}

/* CATEGORIA */

.categoria {
  font-size: 0.875rem;
  color: #666666;
  margin-top: 0.10rem;
}

/* STATUS */

.status {
  background: #bbf0cf;
  color: #119543;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 62.45rem;
  white-space: nowrap;
  margin-top: 0.125rem;
}

/* INFOS */

.card-info {
  margin-bottom: 0.125rem;
}

.card-info-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.875rem;
}

.info-item {
  flex: 1;
}

/* ALINHAMENTO IGUAL À IMAGEM */

.info-content {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.info-icon {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  color: #000000;
  font-weight: bold;
  line-height: 1.1;
}

.info-item strong {
  font-size: 0.8rem;
  color: #666666;
  font-weight: 500;
  line-height: 1.1;
  margin-top: 0.15rem;
}

/* RESPONSIVO */

@media (max-width: 1400px) {

  .grid-cards {
    grid-template-columns: repeat(3, 1fr);
  }

}

@media (max-width: 1000px) {

  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 700px) {

  .grid-cards {
    grid-template-columns: 1fr;
  }

  .top-section h1 {
    font-size: 30px;
  }

}

</style>