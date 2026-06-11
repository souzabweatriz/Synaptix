<template>
  <section class="rastrear-page">
    <header class="rastrear-topbar">
      <div class="stats-grid">
        <div class="stat-card stat-card--green">
          <strong>{{ totalEpis }}</strong>
          <span>EPIs em uso</span>
        </div>
        <div class="stat-card stat-card--green">
          <strong>{{ devolucoes }}</strong>
          <span>devoluções</span>
        </div>
        <div class="stat-card stat-card--green">
          <strong>{{ totalResponsaveis }}</strong>
          <span>funcionários e alunos ativos</span>
        </div>
      </div>
    </header>

    <section class="fichas-panel">
      <h2>Fichas dos EPIs</h2>
      <div class="fichas-grid">
        <article class="ficha-card" v-for="f in fichas" :key="f.id">
          <div class="ficha-avatar">{{ initials(f.nomeResponsavel) }}</div>
          <h3>{{ f.nomeResponsavel }}</h3>
          <p class="ficha-role">Retirou: {{ f.nomeEpi }}</p>
          <p class="ficha-description">{{ f.categoria }} · {{ f.quantidade }} unidade(s)</p>
          <p class="ficha-observacao" v-if="f.descricao">
            <strong>Observações:</strong> {{ f.descricao }}
          </p>
          <div class="ficha-data">
            <span>Data de Retirada</span>
            <strong>{{ formatDate(f.dataRetirada) }}</strong>
          </div>
          <div class="ficha-meta">
            <div>
              <span>ID do EPI</span>
              <strong>{{ f.id }}</strong>
            </div>
            <div>
              <span>Devoluções Realizadas</span>
              <strong>{{ f.devolucoes || 0 }}</strong>
            </div>
          </div>
          <div class="ficha-actions">
            <input type="number" class="devolver-input" v-model.number="f._devolverCount" :min="1"
              :max="Math.max(1, (f.quantidade || 0) - (f.devolucoes || 0))" />
            <button class="ficha-button" @click="devolver(f)"
              :disabled="(f.quantidade || 0) - (f.devolucoes || 0) <= 0">Devolver EPI</button>
            <button class="ficha-button ficha-button--excluir" @click="deleteFicha(f)">Excluir</button>
            <button class="ficha-button" @click="gerarPDF(f)">Gerar PDF</button>
          </div>
        </article>
      </div>
      <div v-if="fichas.length === 0" class="empty-state">Nenhuma ficha de EPI encontrada.</div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import jsPDF from 'jspdf'

const fichas = ref([])
const { supabase } = useSupabase()

async function loadFichas() {
  const { data, error } = await supabase
    .from('retirada_epis')
    .select(`
    *,
    epis!fk_retirada_epi (
      id,
      nome,
      categoria
    ),
    funcionarios!fk_retirada_funcionario (
      id_funcionario,
      nome
    )
  `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  fichas.value = (data || []).map(f => ({
    id: f.id,
    nomeEpi: f.epis?.nome || 'EPI não encontrado',
    categoria: f.epis?.categoria || 'Sem categoria',
    quantidade: f.quantidade,
    dataRetirada: f.data_retirada,
    nomeResponsavel: f.funcionarios?.nome || 'Funcionário não encontrado',
    descricao: f.observacoes || '',
    devolucoes: f.devolucoes || 0,
    _devolverCount: 1
  }))
}

function initials(name) {
  return (name || '')
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('pt-BR')
}

const totalEpis = computed(() =>
  fichas.value.reduce((sum, item) => sum + Number(item.quantidade || 0), 0)
)

const devolucoes = computed(() =>
  fichas.value.reduce((sum, item) => sum + Number(item.devolucoes || 0), 0)
)

const totalResponsaveis = computed(() =>
  new Set(fichas.value.map(f => f.nomeResponsavel).filter(Boolean)).size
)

async function devolver(ficha) {
  const requested = Number(ficha._devolverCount || 1)
  const maxAvailable = ficha.quantidade - ficha.devolucoes
  if (maxAvailable <= 0) return
  const novaQtd = ficha.devolucoes + Math.min(requested, maxAvailable)
  const { error } = await supabase
    .from('retirada_epis').update({ devolucoes: novaQtd })
    .eq('id', ficha.id)
  if (error) { console.error(error); return }
  ficha.devolucoes = novaQtd
  ficha._devolverCount = 1
}

async function deleteFicha(ficha) {
  console.log('ID DA FICHA:', ficha.id)
  if (!confirm('Excluir esta ficha?')) return
  const { data, error } = await supabase
    .from('retirada_epis').delete().eq('id', ficha.id).select()
  console.log('DELETE DATA:', data)
  console.log('DELETE ERROR:', error)
  if (error) { alert(error.message); return }
  fichas.value = fichas.value.filter(f => f.id !== ficha.id)
}

function gerarPDF(ficha) {
  const pdf = new jsPDF()
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.text('Ficha de Retirada de EPI', 20, 20)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.text(`Responsável: ${ficha.nomeResponsavel}`, 20, 40)
  pdf.text(`EPI: ${ficha.nomeEpi}`, 20, 50)
  pdf.text(`Categoria: ${ficha.categoria}`, 20, 60)
  pdf.text(`Quantidade: ${ficha.quantidade}`, 20, 70)
  pdf.text(`Data de Retirada: ${formatDate(ficha.dataRetirada)}`, 20, 80)
  pdf.text(`Devoluções: ${ficha.devolucoes || 0}`, 20, 90)
  pdf.text('Observações:', 20, 105)
  const texto = ficha.descricao || 'Nenhuma observação.'
  const linhas = pdf.splitTextToSize(texto, 170)
  pdf.text(linhas, 20, 115)
  pdf.save(`ficha-epi-${ficha.id}.pdf`)
}

onMounted(loadFichas)
</script>

<style scoped>
/* ── Layout base ── */
.rastrear-page {
  padding: 1.75rem;
}

.rastrear-topbar {
  margin-bottom: 2rem;
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ff6a35, #93039c);
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-card--green strong {
  color: #ffffff;
  font-size: 2.75rem;
  line-height: 1;
}

.stat-card span {
  color: rgba(255, 255, 255, 0.65);
}

/* ── Fichas panel ── */
.fichas-panel {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: rgba(115, 0, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.fichas-panel h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #000000;
}

/* ── Cards grid ── */
.fichas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
}

.ficha-card {
  padding: 1.25rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ff4400, #ff6b35de);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* removido width: 20rem — limitava cards em telas estreitas */
  min-width: 0; /* evita overflow no grid */
}

.ficha-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 1);
  color: #000000;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.ficha-card h3 {
  margin: 0;
  color: #ffffff;
}

.ficha-role,
.ficha-description,
.ficha-data span {
  color: rgba(255, 255, 255, 0.65);
}

.ficha-description {
  margin: 0;
}

.ficha-data {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ficha-data strong {
  color: #fff;
}

.ficha-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.ficha-meta span {
  display: block;
  font-size: 0.8rem;
}

.ficha-meta strong {
  color: #d2f0d3;
}

.ficha-observacao {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #ffffff;
}

/* ── Botões ── */
.ficha-button {
  border: none;
  border-radius: 0.85rem;
  padding: 0.85rem;
  color: #fff;
  background: rgba(107, 87, 179, 0.95);
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
}

.ficha-button--excluir {
  background: rgba(200, 40, 40, 0.95);
}

/* ── Actions grid ── */
.ficha-actions {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* input de quantidade ocupa linha inteira */
.devolver-input {
  grid-column: 1 / -1;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 1);
  color: #000000;
  font-weight: 600;
  box-sizing: border-box;
}

.empty-state {
  color: rgba(255, 255, 255, 0.5);
  padding: 2rem 0;
  text-align: center;
}

/* ── Responsividade da tela ── */

/* Tablet: 600–900px */
@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr); /* mantém 3 colunas até 600px */
  }

  .fichas-grid {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}

/* Mobile: até 600px */
@media (max-width: 600px) {
  .rastrear-page {
    padding: 1rem;
  }

  .fichas-panel {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr; /* empilha os 3 cards */
  }

  .stat-card--green strong {
    font-size: 2rem;
  }

  .fichas-grid {
    grid-template-columns: 1fr; /* um card por linha */
  }

  .fichas-panel h2 {
    font-size: 1.25rem;
  }

  /* botões em coluna única no mobile */
  .ficha-actions {
    grid-template-columns: 1fr;
  }

  .ficha-meta {
    grid-template-columns: 1fr 1fr; /* mantém 2 colunas — cabe bem */
  }
}
</style>