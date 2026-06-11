<template>
  <div class="layout-container">
    <header class="header-section">
      <!-- <h1>Cadastro de EPIs</h1>
      <p>Cadastre EPIs no estoque</p> -->
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <div class="icon-box">
            <img class="icon" src="/icone.svg" />
          </div>

          <div>
            <h3>{{ editandoId ? 'Editar Equipamento' : 'Informações do Equipamento' }}</h3>
            <p>Preencha todos os campos obrigatórios</p>
          </div>
        </div>

        <form @submit.prevent="salvar" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome do EPI *</label>
              <input v-model="form.nome" type="text" required />
            </div>

            <div class="form-group">
              <label>CA *</label>
              <input v-model="form.ca" type="text" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Categoria *</label>
              <input v-model="form.categoria" type="text" required />
            </div>

            <div class="form-group">
              <label>Cor *</label>
              <input v-model="form.cor" type="text" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantidade em estoque *</label>
              <input v-model="form.quantidade" type="number" min="0" required />
            </div>

            <div class="form-group">
              <label>Fornecedor *</label>
              <input v-model="form.fornecedor" type="text" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Preço unitário (R$) *</label>
              <input v-model="form.preco" type="number" step="0.01" min="0" required />
            </div>

            <div class="form-group">
              <label>Descrição/Observações</label>
              <input v-model="form.descricao" type="text" />
            </div>
          </div>

          <div class="form-group">
            <label>URL da Foto</label>
            <input v-model="form.foto" type="text" />
          </div>

          <div class="divider"></div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              {{ editandoId ? 'Salvar Alterações' : 'Salvar EPI' }}
            </button>

            <button type="button" @click="resetForm" class="btn btn-outline">
              Limpar formulário
            </button>
          </div>
        </form>
      </section>

      <section class="card-table">
        <div class="table-scroll">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Equipamento</th>
                <th>Categoria</th>
                <th>CA</th>
                <th>Qtde</th>
                <th>Descrição</th>
                <th class="text-center">Ações</th>;
              </tr>
            </thead>

            <tbody>
              <tr v-for="(e, index) in epis" :key="e.id ?? index">
                <td><span class="text-bold">{{ e.nome }}</span></td>
                <td><span class="text-bold">{{ e.categoria }}</span></td>
                <td><span class="badge-ca">{{ e.ca }}</span></td>
                <td><span class="text-bold">{{ e.quantidade }}</span></td>
                <td>{{ e.descricao }}</td>
                <td class="text-center">
                  <button @click="prepararEdicao(e)" class="btn-action edit">
                    Editar
                  </button>
                  <button @click="excluir(e.id)" class="btn-action delete">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: 100%;
}

.header-section {
  text-align: left;
  padding-bottom: 1rem;
}

.header-section h1 {
  color: #332d48;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0rem;
}

.header-section p {
  margin: 0;
  color: #ffffff;
}

/* ── Formulário ── */
.card-form {
  border-radius: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ff6a35, #93039c);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  box-shadow: none;
  padding: 1rem;
}

.icon-box {
  height: 3rem;
  display: flex;
}

.card-header h3 {
  color: #ffffff;
}

.card-header p {
  color: #ffffffc6;
}

.main-form {
  padding: 1rem;
  border: none;
}

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
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  padding-left: 0.5rem;
  margin-bottom: 0.2rem;
}

input {
  height: 2.25rem;
  border-radius: 6px;
  border: none;
  padding: 0 1rem;
  background: #ffffff;
  backdrop-filter: blur(1rem);
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 0.1rem #93039c;
}

.divider {
  width: 100%;
  height: 0.1rem;
  background: rgba(175, 175, 175, 0.3);
  margin: 1rem 0 1.5rem;
}

/* ── Action bar ── */
.action-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  flex: 1;           /* divide o espaço igualmente */
  height: 2.5rem;
  cursor: pointer;
  /* width fixo removido — quebrava em telas estreitas */
}

.btn-primary {
  background: linear-gradient(90deg, #330136, #3e0342);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.btn-outline {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.293);
  border: 0.1rem solid #ffffff;
  color: #ffffff;
}

/* ── Tabela ── */
.card-table {
  margin-top: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  color: #000000;
}

/* wrapper que habilita scroll horizontal em telas estreitas */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.styled-table {
  width: 100%;
  min-width: 36rem; /* impede que colunas fiquem apertadas demais */
  border-collapse: collapse;
}


.styled-table th {
  height: 2.5rem;
  font-size: 0.80rem;
  background: #ff5e35;
  color: white;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 0.75rem;
}

.styled-table td {
  text-align: center;
  height: 3rem;
  font-size: 0.95rem;
  padding: 0 0.75rem;
}

.badge-ca {
  background: #93039c;
  color: #ffffff;
  padding: 0.25rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.edit {
  color: #5e1742;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  margin-right: 1rem;
}

.delete {
  color: #ffffff;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  background-color: #ff3300;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.text-center {
  text-align: center;
}

/* ── Breakpoints ── */

/* Tablet: até 768px */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr; /* campos empilham */
  }

  .card-header {
    padding: 0.75rem;
  }

  .main-form {
    padding: 0.75rem;
  }
}

/* Mobile: até 480px */
@media (max-width: 480px) {
  .card-form {
    padding: 0.75rem;
  }

  .action-bar {
    flex-direction: column; /* botões empilham */
  }

  .btn {
    width: 100%;
  }

  .card-header h3 {
    font-size: 1rem;
  }
}
</style>

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

  if (error) {
    alert('Erro ao carregar EPIs')
    return
  }

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

  if (error) {
    alert('Erro ao salvar EPI')
    return
  }

  resetForm()
  await carregar()
}

const prepararEdicao = (e) => {
  editandoId.value = e.id
  Object.assign(form, e)
}

const excluir = async (id) => {
  if (!confirm('Deseja excluir este EPI? Isso apagará o histórico de retiradas.')) return

  const { error } = await supabase
    .from('epis')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Erro ao excluir EPI')
    return
  }

  await carregar()
}

onMounted(carregar)
</script>