<template>
  <div class="layout-container">
    <header class="header-section">
      <h1>Registrar Retirada de EPIs</h1>
      <p>Registre quando um funcionário retirar um EPI do estoque</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <div class="icon-box">
            <img class="icon" src="/public/icone.svg" />
          </div>

          <div>
            <h3>Informações da Retirada</h3>
            <p>Preencha os dados da retirada do EPI</p>
          </div>
        </div>

        <form @submit.prevent="registrarRetirada" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>EPI a ser retirado *</label>

              <select v-model="form.epi_id" required>
                <option disabled value="">Selecione o EPI</option>

                <option v-for="epi in epis" :key="epi.id" :value="epi.id">
                  {{ epi.nome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Funcionário *</label>

              <select v-model="form.funcionario" required>
                <option disabled value="">Selecione o funcionário</option>

                <option v-for="(funcionario, index) in funcionarios" :key="index" :value="funcionario">
                  {{ funcionario }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Data da retirada *</label>

              <input v-model="form.data_retirada" type="date" required />
            </div>

            <div class="form-group">
              <label>Horário da retirada *</label>

              <input v-model="form.horario_retirada" type="time" required />
            </div>
          </div>

          <div class="form-group">
            <label>Observações</label>

            <textarea v-model="form.observacoes"
              placeholder="Adicione observações sobre a retirada do EPI (opcional)..." />
          </div>

          <div class="divider"></div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              Registrar
            </button>

            <button type="button" class="btn btn-outline" @click="limparFormulario">
              Limpar formulário
            </button>
          </div>
        </form>
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

.header-section h1 {
  color: #000000;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0rem;
}

.header-section p {
  margin: 0;
  color: #00000080;
}

.card-form {
  border-radius: 1rem;
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

.icon-box {
  height: 3rem;
  display: flex;
}

.card-header h3 {
  color: #332d48;
}

.card-header p {
  color: #00000080;
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
  margin-bottom: 0.2rem;
}

input,select,textarea {
  height: 2.25rem;
  border-radius: 1rem;
  border: none;
  padding: 0 1rem;
  background: #ffffff;
  backdrop-filter: blur(1rem);
  font-size: 0.95rem;
}

textarea {
  min-height: 10rem;
  resize: none;
  padding-top: 1rem;
}

input:focus,select:focus,textarea:focus {
  outline: none;
  box-shadow: 0 0 0 0.1rem #93039C;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 1rem 0 1.5rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.btn {
  flex: 1;
  height: 3rem;
  border-radius: 999px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary {
  background: linear-gradient(90deg,
      #42004d,
      #9c00b8);

  color: white;
}

.btn-primary:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;

  border: 1px solid #7e22ce;

  color: #4b0055;
}

.btn-outline:hover {
  background: rgba(126, 34, 206, 0.08);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .action-bar {
    flex-direction: column;
  }
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'

const epis = ref([])

const funcionarios = ref([
  'João Silva',
  'Maria Souza',
  'Carlos Oliveira',
  'Fernanda Lima',
])

const defaultForm = () => ({
  epi_id: '',
  funcionario: '',
  data_retirada: '',
  horario_retirada: '',
  observacoes: '',
})

const form = reactive(defaultForm())

const resetForm = () => {
  Object.assign(form, defaultForm())
}

const carregarEPIs = async () => {
  const { data, error } = await supabase
    .from('epis')
    .select('*')
    .order('nome')

  if (error) {
    console.error('Erro ao carregar EPIs:', error)
    return
  }

  epis.value = data || []
}

const registrarRetirada = async () => {
  const epiSelecionado = epis.value.find(
    (e) => e.id === form.epi_id
  )

  if (!epiSelecionado) {
    alert('Selecione um EPI válido.')
    return
  }

  if (epiSelecionado.quantidade <= 0) {
    alert('Este EPI está sem estoque.')
    return
  }

  const payload = {
    epi_id: form.epi_id,
    funcionario: form.funcionario,
    data_retirada: form.data_retirada,
    horario_retirada: form.horario_retirada,
    observacoes: form.observacoes,
  }

  const { error } = await supabase
    .from('retirada_epis')
    .insert([payload])

  if (error) {
    console.error('Erro ao registrar retirada:', error)
    alert('Erro ao registrar retirada.')
    return
  }

  await supabase
    .from('epis')
    .update({
      quantidade: epiSelecionado.quantidade - 1,
    })
    .eq('id', epiSelecionado.id)

  alert('Retirada registrada com sucesso!')

  resetForm()
  await carregarEPIs()
}

const limparFormulario = () => {
  resetForm()
}

onMounted(() => {
  carregarEPIs()

  const agora = new Date()

  form.data_retirada = agora.toISOString().split('T')[0]

  form.horario_retirada = agora.toTimeString().slice(0, 5)
})
</script>