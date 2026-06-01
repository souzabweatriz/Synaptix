<template>
  <div class="inventario-page">

    <header class="top-section">
      <!-- <h1>Estoque de EPIs</h1> -->
    </header>

    <!-- GRID DOS CARDS -->
    <div class="grid-cards">

      <div v-for="epi in epis" :key="epi.id" class="card-epi">

        <!-- IMAGEM -->
        <div class="card-image">
          <img :src="epi.foto" :alt="epi.nome || 'EPI'" loading="lazy" />
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

            <div class="status" :class="{
              indisponivel: (epi.quantidade || 0) <= 0
            }">
              {{
                (epi.quantidade || 0) > 0
                  ? 'Disponível'
                  : 'Indisponível'
              }}
            </div>

          </div>

          <!-- LINHA COR + ESTOQUE -->
          <div class="info-row">

            <!-- COR -->
            <div class="info-item">

              <div class="info-content">

                <img class="info-icon" src="/cor.png" alt="Ícone cor" />

                <div class="info-text">

                  <span class="label">
                    Cor
                  </span>

                  <strong>
                    {{ epi.cor || 'Não informado' }}
                  </strong>

                </div>

              </div>

            </div>

            <!-- ESTOQUE -->
            <div class="info-item">

              <div class="info-content">

                <img class="info-icon" src="/estoque-pronto.png" alt="Ícone estoque" />

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
          <div class="info-price">

            <div class="info-content">

              <img class="info-icon" src="/bolsa-de-dinheiro.png" alt="Ícone preço" />

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
/* .top-section {
  margin-bottom: 1.8rem;
} */

.top-section h1 {
  font-size: 2.3rem;
  font-weight: 700;
  color: #332D48;
}

/* GRID */

.grid-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* CARD */

.card-epi {
  background: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e9e9e9;
  overflow: hidden;
  transition: 0.25s ease;
}

.card-epi:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.06);
}

/* IMAGEM */

.card-image {
  width: 100%;
  height: 210px;
  padding: 0.9rem;
  border-bottom: 1px solid #eeeeee;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.9rem;
  background: #dac7f8;
}

/* BODY */

.card-body {
  padding: 1rem;
}

/* TOPO */

.top-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.equipamento-info {
  flex: 1;
}

/* NOME */

.card-body h3 {
  font-size: 1.1rem;
  color: #111111;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

/* CATEGORIA */

.categoria {
  font-size: 0.92rem;
  color: #777777;
  margin-top: 0.2rem;
}

/* STATUS */

.status {
  background: #d9f7e5;
  color: #119543;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  white-space: nowrap;
}

.status.indisponivel {
  background: #ffdede;
  color: #d11a2a;
}

/* LINHA DE INFO */

.info-row {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

/* BOX */

.info-item,
.info-price {
  flex: 1;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #f7f7f7;
  border: 1px solid #ececec;
  border-radius: 0.9rem;
  padding: 0.9rem;
  height: 100%;
}

/* ÍCONES */

.info-icon {
  width: 1.7rem;
  height: 1.7rem;
  object-fit: contain;
  flex-shrink: 0;
}

/* TEXTO */

.info-text {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.78rem;
  color: #707070;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.info-item strong,
.info-price strong {
  font-size: 1rem;
  color: #1f1f1f;
  font-weight: 700;
  line-height: 1.2;
}

/* RESPONSIVO */

@media (max-width: 1400px) {

  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 900px) {

  .grid-cards {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 600px) {

  .info-row {
    flex-direction: column;
  }

  .top-section h1 {
    font-size: 2rem;
  }

}
</style>