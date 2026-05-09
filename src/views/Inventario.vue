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

        <div class="card-image">

          <img
            :src="epi.imagem_url"
            :alt="epi.nome_epi || 'EPI'"
            loading="lazy"
          />

        </div>

        <div class="card-body">

          <h3>{{ epi.nome_epi }}</h3>

          <div class="info">
            <span>Categoria</span>
            <strong>{{ epi.categoria }}</strong>
          </div>

          <div class="info">
            <span>Cor</span>
            <strong>{{ epi.cor }}</strong>
          </div>

          <div class="info">
            <span>Preço</span>
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

          <div class="info">

            <span>Qtd. Estoque</span>

            <strong>
              {{ epi.quantidade || 0 }} unidades
            </strong>

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

.inventario-page {
  padding: 1rem;
}

.top-section {
  margin-bottom: 25px;
}

.top-section h1 {
  font-size: 38px;
  font-weight: 700;
  color: #2f3a4d;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.card-epi {
  background: #eadcf6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 5px 18px rgba(0, 0, 0, 0.18);
  transition: 0.2s;
}

.card-epi:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 220px;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}

.card-body {
  padding: 18px;
}

.card-body h3 {
  font-size: 16px;
  color: #2d2d2d;
  margin-bottom: 16px;
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info span {
  font-size: 13px;
  color: #555;
}

.info strong {
  font-size: 14px;
  color: #111;
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