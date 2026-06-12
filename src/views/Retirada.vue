<template>
  <div class="layout-container">
    <header class="header-section">
      <!-- <h1>Registrar Retirada de EPIs</h1>
      <p>Registre quando um funcionário retirar um EPI do estoque</p> -->
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
              <label>Funcionário *</label>
              <select v-model.number="form.id_funcionario" required>
                <option disabled value="">Selecione o funcionário</option>
                <option v-for="func in funcionarios" :key="func.id_funcionario" :value="func.id_funcionario">{{
                  func.nome }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>EPI a ser retirado *</label>
              <select v-model="form.id_epi" required>
                <option disabled value="">Selecione o EPI</option>
                <option v-for="epi in epis" :key="epi.id" :value="epi.id" :disabled="epi.quantidade <= 0">{{ epi.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Estoque disponível</label>
              <input type="text" :value="epiSelecionado?.quantidade ?? 0" disabled />
            </div>

            <div class="form-group">
              <label>Quantidade a retirar *</label>
              <input v-model.number="form.quantidade" type="number" min="1" :max="epiSelecionado?.quantidade || 1"
                required />
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
              placeholder="Adicione observações sobre a retirada do EPI..."></textarea>
          </div>

          <div class="divider"></div>
          <div class="action-bar">
            <button type="submit" class="btn btn-primary">Registrar</button>
            <button type="button" class="btn btn-outline" @click="limparFormulario">Limpar formulário</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: 100%;
}


.card-form {
  border-radius: 1rem;
  padding: 1rem;
    background: linear-gradient(135deg, #ff6a35, #93039c);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: #ffffff;
}

.icon-box {
  height: 3rem;
  display: flex;
}

.main-form {
  padding: 1rem;
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
  font-family: 'Montserrat' sans-serif;
  font-weight: 600;
  color: #ffffff;
  padding-left: 0.5rem;
  margin-bottom: 0.2rem;
}

input,
select,
textarea {
  height: 2.25rem;
  border-radius: 5px;
  border: none;
  padding: 0 1rem;
  background: #fff;
  font-size: 0.95rem;
}

textarea {
  min-height: 10rem;
  padding-top: 1rem;
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 0.1rem #93039C;
}

.divider {
  width: 100%;
  height: 0.1rem;
  background: rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.action-bar {
  display: flex;
  justify-content: space-between;
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
  width: 35.8rem;
  border-radius: 8px;
  font-weight: 500;
}

.btn-outline {
  border-radius: 8px;
  width: 35.8rem;
  background: rgba(69, 69, 69, 0.293);
  border: 0.1rem solid #ffffff;
  color: #ffffff;
}
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'

const epis = ref([])
const funcionarios = ref([])

const defaultForm = () => ({
  id_funcionario: '',
  id_epi: '',
  quantidade: 1,
  data_retirada: '',
  horario_retirada: '',
  observacoes: ''
})

const form = reactive(defaultForm())

const epiSelecionado = computed(() => {
  return epis.value.find(e => e.id === form.id_epi)
})

const resetForm = () => {
  Object.assign(form, defaultForm())

  const agora = new Date()
  form.data_retirada = agora.toISOString().split('T')[0]
  form.horario_retirada = agora.toTimeString().slice(0, 5)
}

const carregarEPIs = async () => {
  const { data, error } = await supabase
    .from('epis')
    .select('*')
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro EPIs:', error)
    alert('Erro ao carregar EPIs')
    return
  }

  epis.value = (data || []).map(e => ({
    ...e,
    quantidade: Number(e.quantidade)
  }))
}

const carregarFuncionarios = async () => {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('id_funcionario, nome')
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro funcionários:', error)
    alert('Erro ao carregar funcionários')
    return
  }

  funcionarios.value = data || []
}

const registrarRetirada = async () => {
  const epi = epiSelecionado.value
  const qtd = Number(form.quantidade)

  if (!epi) {
    alert('Selecione um EPI válido')
    return
  }

  if (qtd <= 0) {
    alert('Quantidade inválida')
    return
  }

  if (qtd > epi.quantidade) {
    alert('Estoque insuficiente')
    return
  }

  try {
    // 1. Inserir retirada
    const { error: retiradaError } = await supabase
      .from('retirada_epis')
      .insert([{
        id_funcionario: form.id_funcionario,
        id_epi: form.id_epi,
        quantidade: qtd,
        data_retirada: form.data_retirada,
        horario_retirada: form.horario_retirada,
        observacoes: form.observacoes
      }])

    if (retiradaError) {
      alert('Erro ao registrar retirada')
      return
    }

    // 2. Atualizar estoque (com proteção contra race condition simples)
    const { error: estoqueError } = await supabase
      .from('epis')
      .update({
        quantidade: epi.quantidade - qtd
      })
      .eq('id', form.id_epi)

    if (estoqueError) {
      alert('Erro ao atualizar estoque')
      return
    }

    resetForm()
    await carregarEPIs()

    alert('Retirada registrada com sucesso!')

  } catch (err) {
    console.error('Erro retirada:', err)
    alert('Erro ao registrar retirada')
  }
}

onMounted(() => {
  resetForm()
  carregarEPIs()
  carregarFuncionarios()
})
</script>