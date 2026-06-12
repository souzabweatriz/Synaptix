<template>
  <div class="layout-container">

    <header class="page-header">
      <div class="header-left">
        <div class="header-icon-box">
          <img class="icon" src="/icone.svg" />
        </div>
        <div>
          <h1>{{ editandoId ? 'Editar Equipamento' : 'Cadastrar EPI' }}</h1>
          <p class="page-subtitle">Preencha todos os campos obrigatórios</p>
        </div>
      </div>
      <div class="header-tag">{{ editandoId ? 'Modo edição' : 'Novo equipamento' }}</div>
    </header>

    <main class="content">

      <!-- FORMULÁRIO -->
      <section class="card card-form">
        <form @submit.prevent="salvar" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome do EPI *</label>
              <input v-model="form.nome" type="text" placeholder="Ex: Capacete de segurança" required />
            </div>
            <div class="form-group">
              <label>CA *</label>
              <input v-model="form.ca" type="text" placeholder="Ex: 12345" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Categoria *</label>
              <input v-model="form.categoria" type="text" placeholder="Ex: Proteção da cabeça" required />
            </div>
            <div class="form-group">
              <label>Cor *</label>
              <input v-model="form.cor" type="text" placeholder="Ex: Amarelo" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantidade em estoque *</label>
              <input v-model="form.quantidade" type="number" min="0" placeholder="0" required />
            </div>
            <div class="form-group">
              <label>Fornecedor *</label>
              <input v-model="form.fornecedor" type="text" placeholder="Nome do fornecedor" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Preço unitário (R$) *</label>
              <input v-model="form.preco" type="number" step="0.01" min="0" placeholder="0,00" required />
            </div>
            <div class="form-group">
              <label>Descrição / Observações</label>
              <input v-model="form.descricao" type="text" placeholder="Informações adicionais" />
            </div>
          </div>

          <div class="form-group">
            <label>URL da Foto</label>
            <input v-model="form.foto" type="text" placeholder="https://..." />
          </div>

          <div class="divider"></div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              <span>{{ editandoId ? 'Salvar Alterações' : 'Cadastrar EPI' }}</span>
            </button>
            <button type="button" @click="resetForm" class="btn btn-outline">
              Limpar formulário
            </button>
          </div>
        </form>
      </section>

      <!-- TABELA -->
      <section class="card card-table">
        <div class="table-header">
          <div>
            <h2>Equipamentos cadastrados</h2>
            <p>{{ epis.length }} iten{{ epis.length !== 1 ? 's' : '' }} no sistema</p>
          </div>
        </div>

        <div class="table-scroll">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Equipamento</th>
                <th>Categoria</th>
                <th>CA</th>
                <th>Qtde</th>
                <th>Descrição</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(e, index) in epis" :key="e.id ?? index">
                <td><span class="text-bold">{{ e.nome }}</span></td>
                <td><span class="text-muted">{{ e.categoria }}</span></td>
                <td><span class="badge-ca">{{ e.ca }}</span></td>
                <td><span class="text-bold">{{ e.quantidade }}</span></td>
                <td><span class="text-muted">{{ e.descricao || '—' }}</span></td>
                <td class="text-center">
                  <button @click="prepararEdicao(e)" class="btn-action edit">Editar</button>
                  <button @click="excluir(e.id)" class="btn-action delete">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="epis.length === 0" class="empty-state">
          <p>Nenhum equipamento cadastrado ainda.</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const epis = ref([])
const editandoId = ref(null)

const defaultForm = () => ({
  nome: '',
  ca: '',
  categoria: '',
  cor: '',
  quantidade: 0,
  fornecedor: '',
  preco: 0,
  descricao: '',
  foto: ''
})

const form = reactive(defaultForm())

const resetForm = () => {
  Object.assign(form, defaultForm())
  editandoId.value = null
}

const carregar = async () => {
  const { data, error } = await supabase
    .from('epis')
    .select('*')
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) { alert('Erro ao carregar EPIs'); return }
  epis.value = data || []
}

const salvar = async () => {
  const payload = {
    nome: form.nome,
    ca: form.ca,
    categoria: form.categoria,
    cor: form.cor,
    quantidade: Number(form.quantidade),
    fornecedor: form.fornecedor,
    preco: Number(form.preco),
    descricao: form.descricao,
    foto: form.foto
  }

  const { error } = editandoId.value
    ? await supabase.from('epis').update(payload).eq('id', editandoId.value)
    : await supabase.from('epis').insert([payload])

  if (error) { alert('Erro ao salvar EPI'); return }

  resetForm()
  await carregar()
}

const prepararEdicao = (e) => {
  editandoId.value = e.id
  Object.assign(form, e)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const excluir = async (id) => {
  if (!confirm('Deseja excluir este EPI? Isso apagará o histórico de retiradas.')) return
  const { error } = await supabase.from('epis').delete().eq('id', id)
  if (error) { alert('Erro ao excluir EPI'); return }
  await carregar()
}

onMounted(carregar)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

/* ── Base ── */
.layout-container {
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

/* ── Header ── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
  padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #ff6a35, #93039c);

  border-radius: 24px;
  backdrop-filter: blur(20px);
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}


.page-header h1 {
  margin: 0;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 700;
  color: #ffffff;
}

.page-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: #ffffff;
}

.header-tag {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(154, 153, 154, 0.15));
  border: 1px solid rgba(255, 106, 53, 0.3);
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Card base ── */
.card {
  padding: 1.75rem;
  margin-bottom: 1.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* ── Formulário ── */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #000000;
  padding-left: 0.25rem;
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
}

input {
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid rgb(183, 183, 183);
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: #000000;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-sizing: border-box;
  width: 100%;
}

input::placeholder { color: rgba(0, 0, 0, 0.3); }

input:focus {
  outline: none;
  border-color: rgba(147, 3, 156, 0.6);
  background: rgba(255, 255, 255, 0.09);
  box-shadow: 0 0 0 3px rgba(147, 3, 156, 0.15);
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0.5rem 0 1.5rem;
}

/* ── Action bar ── */
.action-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  flex: 1;
  height: 2.75rem;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  transition: transform 0.2s ease, filter 0.2s ease;
  border: none;
}

.btn:hover { transform: translateY(-1px); filter: brightness(1.1); }

.btn-primary {
  background: linear-gradient(135deg, #ff6a35, #93039c);
  color: #fff;
}

.btn-outline {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgb(97, 97, 97);
  color: #000000;
}

/* ── Tabela header ── */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-header h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #000000;
}

.table-header p {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: #000000;
}

/* ── Tabela ── */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.styled-table {
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
}

.styled-table thead tr {
  background: linear-gradient(90deg, #ff6a35, #93039c);
}

.styled-table th {
  padding: 0.9rem 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  white-space: nowrap;
  text-align: left;
}

.styled-table th.text-center { text-align: center; }

.styled-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.15s ease;
}

.styled-table tbody tr:last-child { border-bottom: none; }

.styled-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.styled-table td {
  padding: 0.85rem 1rem;
  font-size: 0.92rem;
  vertical-align: middle;
}

.styled-table td.text-center { text-align: center; }

.text-bold { color: #000000; font-weight: 600; }
.text-muted { color: #000000; }

.badge-ca {
  background: rgba(147, 3, 156, 0.25);
  border: 1px solid rgba(147, 3, 156, 0.4);
  color: #000000;
  padding: 0.2rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Botões ação ── */
.btn-action {
  border: none;
  border-radius: 7px;
  padding: 0.4rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
  font-family: 'Montserrat', sans-serif;
}

.btn-action:hover { transform: translateY(-1px); filter: brightness(1.15); }

.btn-action.edit {
  background: rgba(255, 106, 53, 0.15);
  color: #ffb59a;
  margin-right: 0.4rem;
}

.btn-action.delete {
  background: rgba(220, 38, 38, 0.2);
  color: #fca5a5;
}

/* ── Empty state ── */
.empty-state {
  padding: 2.5rem;
  text-align: center;
  color: #000000;
  font-size: 0.95rem;
}

/* ── Responsivo ── */
@media (max-width: 900px) {
  .layout-container { padding: 1.25rem; }
}

@media (max-width: 768px) {
  .layout-container { padding: 1rem; }
  .page-header { padding: 1.25rem; }
  .form-row { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .card { padding: 1.25rem; }
  .action-bar { flex-direction: column; }
  .btn { width: 100%; }
  .page-header { flex-direction: column; align-items: flex-start; }
  .header-tag { align-self: flex-start; }
}
</style>