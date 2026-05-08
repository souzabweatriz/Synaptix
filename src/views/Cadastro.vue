<template>
  <div class="layout-container">

    <header class="header-section">
      <h1>Cadastro de EPIs</h1>
      <p>Cadastre EPIs no estoque</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <div class="icon-box">
            <img class="icon" src="/public/Group 1686550907.svg" />
          </div>
          <div>
            <h3>{{ editandoId ? 'Editar Equipamento' : 'Informações do Equipamento' }}</h3>
            <p> Preencha todos os campos obrigatórios</p>
          </div>
        </div>

        <form @submit.prevent="salvar" class="main-form">

          <div class="form-group">
            <label>Nome do EPI *</label>
            <input v-model="form.nome" type="text" required>
          </div>

          <div class="form-group">
            <label>Categoria *</label>
            <input v-model="form.categoria" type="text" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Localização no estoque *</label>
              <input v-model="form.localizacao" type="text">
            </div>

            <div class="form-group">
              <label>Quantidade mínima *</label>
              <input v-model="form.quantidade_minima" type="number">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantidade em estoque *</label>
              <input v-model="form.quantidade" type="number">
            </div>

            <div class="form-group">
              <label>Fornecedor *</label>
              <input v-model="form.fornecedor" type="text">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Preço unitário (R$) *</label>
              <input v-model="form.preco" type="number" step="0.01">
            </div>

            <div class="form-group">
              <label>Descrição/Observações</label>
              <input v-model="form.descricao" type="text">
            </div>
          </div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              {{ editandoId ? 'Salvar Alterações' : 'Salvar EPI' }}
            </button>

            <button type="button" @click="cancelarEdicao" class="btn btn-outline">
              Limpar formulário
            </button>
          </div>

        </form>
      </section>

      <section class="card-table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Equipamento</th>
              <th>C.A</th>
              <th>Descrição</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in epis" :key="e.id">
              <td><span class="text-bold">{{ e.nome }}</span></td>
              <td><span class="badge-ca">{{ e.ca }}</span></td>
              <td>{{ e.descricao }}</td>
              <td class="text-center">
                <button @click="prepararEdicao(e)" class="btn-action edit">Editar</button>
                <button @click="excluir(e.id)" class="btn-action delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  background-color: #F8F9FA;
  height: 100%;
}

.header-section {
  text-align: left;
  padding-bottom: 1rem;
}

.icon-box {
  height: 3rem;
  display: flex;
}

.header-section h1 {
  color: #000000;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
}

.header-section p {
  margin: 0;
  color: #00000080;
}

.card-form {
  border-radius: 16px;
  padding: 1rem;
  background: rgba(115, 0, 255, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  box-shadow: none;
  padding: 1rem;
}

.card-header h3 {
  color: #0a3b59;
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
  color: #374151;
  padding-left: 0.5rem;
  margin-bottom: 4px;
}

input {
  height: 42px;
  border-radius: 999px;
  border: none;
  padding: 0 1rem;
  background: #ffffffcc;
  backdrop-filter: blur(4px);
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #a855f7;
}

.btn {
  height: 2.5rem;
  width: 12rem;
  border-radius: 1rem;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(90deg, #330136, #93039C);
  color: white;
  border: none;
  width: 30rem;
  border-radius: 999px;
  font-weight: 500;
}

.btn-outline {
  border-radius: 999px;
  background: transparent;
  border: 1px solid #c4b5fd;
  width: 30rem;
  color: #6b21a8;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.card-table {
  background: rgba(115, 0, 255, 0.1);
  margin-top: 1rem;
  overflow: hidden;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 1rem;
  border-color: #0a3b59;
  border: solid 0.1rem;
}

.styled-table th {
  background-color: #f2f2f2;
  height: 2.5rem;
  width: 15rem;
  text-align: center;
  font-size: 0.80rem;
  color: #0a3b59;
  text-transform: uppercase;
  border-color: #0a3b59;
  border-block: solid 0.15rem;
}

.styled-table td {
  text-align: center;
  height: 3rem;
  font-size: 0.95rem;
}

.badge-ca {
  background: #0d4c73;
  color: #f2f2f2;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.95rem;
}

.edit {
  color: #0d4c73;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  margin-right: 10px;
}

.delete {
  color: #D94D1A;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { supabase } from '../composables/useSupabase';

const epis = ref([]);
const editandoId = ref(null);
const form = reactive({
  nome: '',
  ca: '',
  descricao: '',
  categoria: '',
  localizacao: '',
  quantidade_minima: 0,
  quantidade: 0,
  fornecedor: '',
  preco: 0
});

// Busca os EPIs no banco
const carregar = async () => {
  const { data } = await supabase.from('epis').select('*').order('nome');
  epis.value = data || [];
};

// Salva ou Atualiza
const salvar = async () => {
  if (editandoId.value) {
    await supabase.from('epis').update(form).eq('id', editandoId.value);
  } else {
    await supabase.from('epis').insert([form]);
  }
  cancelarEdicao();
  await carregar();
  alert('EPI salvo com sucesso!');
};

const prepararEdicao = (e) => {
  editandoId.value = e.id;
  Object.assign(form, { nome: e.nome, ca: e.ca, descricao: e.descricao });
};

const excluir = async (id) => {
  if (confirm('Deseja excluir este equipamento?')) {
    await supabase.from('epis').delete().eq('id', id);
    carregar();
  }
};

const cancelarEdicao = () => {
  editandoId.value = null;
  Object.assign(form, { nome: '', ca: '', descricao: '' });
};

onMounted(carregar);
</script>