<template>
  <div class="shell">
    <Sidebar v-model:collapsed="isSidebarCollapsed" />

    <main class="conteudo" :class="{ 'conteudo--collapsed': isSidebarCollapsed }">
      <section class="dashboard-top" v-if="isDashboardRoot">

        <div class="stat-grid">
          <article class="stat-card stat-card--green">
            <span class="stat-label">EPIs cadastrados</span>
            <strong>{{ totalEPIs }}</strong>
            <small>Total de itens no sistema</small>
          </article>

          <article class="stat-card stat-card--orange">
            <span class="stat-label">EPIs retirados hoje</span>
            <strong>{{ retiradosHoje }}</strong>
            <small>Movimentação do dia</small>
          </article>

          <article class="stat-card stat-card--red">
            <span class="stat-label">EPIs sem estoque</span>
            <strong>{{ semEstoque }}</strong>
            <small>Produtos críticos</small>
          </article>

          <article class="stat-card stat-card--blue">
            <span class="stat-label">Maior quantidade</span>
            <strong>{{ maiorQuantidadeNome || '—' }}</strong>
            <small>EPI com mais unidades</small>
          </article>

          <article class="stat-card stat-card--purple">
            <span class="stat-label">EPIs mais caros</span>
            <strong>{{ expensiveChart.length ? expensiveChart[0].label : '—' }}</strong>
            <small>Maior valor unitário</small>
          </article>
        </div>

        <div class="charts-grid">
          <section class="chart-card">
            <div class="chart-card__header">
              <div>
                <h2>EPIs com mais quantidade</h2>
                <p>Relação dos itens em estoque ordenados por volume.</p>
              </div>
              <span class="chip">Top 5</span>
            </div>
            <div class="bar-chart">
              <div class="bar-row" v-for="item in quantityChart" :key="item.label">
                <div class="bar-info">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.value }}</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ width: item.width + '%' }"></div>
                </div>
              </div>
            </div>
          </section>

          <section class="chart-card chart-card--split">
            <div class="chart-card__header">
              <div>
                <h2>EPIs mais caros</h2>
                <p>O valor unitário dos itens de maior custo.</p>
              </div>
            </div>
            <div class="price-list">
              <div class="price-item" v-for="item in expensiveChart" :key="item.label">
                <div>
                  <span class="price-name">{{ item.label }}</span>
                  <p class="price-subtitle">R$ {{ item.price.toFixed(2) }}</p>
                </div>
                <strong>{{ item.margin }}%</strong>
              </div>
            </div>
          </section>
        </div>
      </section>

      <RouterView v-if="!isDashboardRoot" />
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'
import Sidebar from '../../components/Sidebar.vue'

const isSidebarCollapsed = ref(false)
const route = useRoute()
const isDashboardRoot = computed(() => route.path === '/Dashboard')

const { supabase } = useSupabase()

const totalEPIs = ref(0)
const retiradosHoje = ref(0)
const semEstoque = ref(0)
const maiorQuantidadeNome = ref('')

const quantityChart = ref([])
const expensiveChart = ref([])

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('epis').select('*')
    if (error) {
      console.error('Erro ao buscar EPIs:', error)
      return
    }

    const rows = data || []
    totalEPIs.value = rows.length

    semEstoque.value = rows.filter(r => !(r.quantidade) || Number(r.quantidade) <= 0).length

    const byQuantity = rows.slice().sort((a, b) => (Number(b.quantidade) || 0) - (Number(a.quantidade) || 0))
    maiorQuantidadeNome.value = byQuantity.length ? (byQuantity[0].nome || '') : ''

    const topQty = byQuantity.slice(0, 5).map(r => ({
      label: r.nome || '—',
      value: Number(r.quantidade) || 0
    }))
    const maxVal = topQty.length ? Math.max(...topQty.map(i => i.value)) : 1
    quantityChart.value = topQty.map(i => ({ ...i, width: maxVal ? Math.round((i.value / maxVal) * 100) : 0 }))

    const byPrice = rows.slice().sort((a, b) => (Number(b.preco) || 0) - (Number(a.preco) || 0))
    const topExp = byPrice.slice(0, 4).map(r => ({
      label: r.nome || '—',
      price: Number(r.preco) || 0
    }))
    const highest = topExp.length ? topExp[0].price : 1
    expensiveChart.value = topExp.map(e => ({ ...e, margin: highest ? Math.round((e.price / highest) * 100) : 0 }))

    const { count, error: retiradaError } = await supabase
      .from('retirada_epis')
      .select('*', { count: 'exact', head: true })

    if (!retiradaError) {
      retiradosHoje.value = count || 0
    }

  } catch (err) {
    console.error('Erro ao carregar dashboard:', err)
  }
})
</script>

<style scoped>
/* ── Layout shell ── */
.shell {
  background: #fff;
  display: flex;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

/* ── Conteúdo principal ── */
.conteudo {
  flex: 1;
  /* margem padrão: sidebar expandida (250px) */
  margin-left: 250px;
  padding: 30px;
  color: #ffffff;
  min-width: 0; /* impede overflow em flex */
  transition: margin-left 0.25s ease;
}

/* sidebar recolhida */
.conteudo--collapsed {
  margin-left: 80px;
}

/* ── Stat grid ── */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(13, 40, 17, 0.9);
  border: 1px solid rgba(126, 213, 111, 0.16);
  border-radius: 18px;
  padding: 1.5rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(126, 213, 111, 0.45);
}

.stat-label {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
}

.stat-card strong {
  font-size: 1.2rem;
  margin: 0.75rem 0 0.5rem;
  display: block;
  word-break: break-word;
}

.stat-card small {
  color: #ffffffcc;
  font-size: 0.8rem;
}

.stat-card--green,
.stat-card--orange,
.stat-card--red,
.stat-card--blue,
.stat-card--purple {
  background: linear-gradient(135deg, #ff6a35, #93039c);
}

/* ── Charts grid ── */
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 1rem;
}

.chart-card {
  background: linear-gradient(135deg, #ff4400, #ff6b35de);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  min-height: 380px;
}

.chart-card--split {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-card__header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 600;
}

.chart-card__header p {
  margin: 0.4rem 0 0;
  color: #ffffffcc;
  font-size: 0.9rem;
}

/* ── Chip ── */
.chip {
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #ffffffc3;
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  white-space: nowrap;
}

/* ── Bar chart ── */
.bar-chart {
  display: grid;
  gap: 1rem;
}

.bar-row {
  display: grid;
  gap: 0.5rem;
}

.bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
}

.bar-track {
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #ffffff;
  border-radius: 999px;
}

/* ── Price list ── */
.price-list {
  display: grid;
  gap: 0.75rem;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  background: #ffffff;
  transition: background 0.2s ease;
}

.price-item:hover {
  background: #e8e8e8;
}

.price-name {
  display: block;
  color: #000000;
  font-weight: 600;
  font-size: 0.9rem;
}

.price-subtitle {
  margin: 0.25rem 0 0;
  color: #333333;
  font-size: 0.85rem;
}

.price-item strong {
  color: #000;
  font-size: 0.95rem;
}

/* ════════════════════════════
   BREAKPOINTS
════════════════════════════ */

/* Telas grandes mas sem espaço suficiente para 5 colunas */
@media (max-width: 1400px) {
  .stat-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Tablet landscape / desktop pequeno */
@media (max-width: 1100px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-card {
    min-height: auto;
  }
}

/* Tablet portrait — sidebar some ou vira overlay */
@media (max-width: 768px) {
  .conteudo,
  .conteudo--collapsed {
    margin-left: 0;
    padding: 20px 16px;
  }

  .shell {
    flex-direction: column;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile */
@media (max-width: 480px) {
  .conteudo {
    padding: 16px 12px;
  }

  .stat-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: 110px;
    padding: 1.1rem;
  }

  .chart-card {
    padding: 1rem;
    border-radius: 16px;
  }

  .chart-card__header {
    flex-wrap: wrap;
  }

  .price-item {
    padding: 0.75rem;
  }
}
</style>