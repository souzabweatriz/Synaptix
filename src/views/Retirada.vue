<template>

  <div class="retirada-page">

    <header class="header-section">
      <h1>Registrar Retirada de EPIs</h1>
      <p>Registre a retirada de EPIs do estoque</p>
    </header>

    <form class="form-retirada" @submit.prevent="registrarRetirada">

      <div class="form-group">
        <label>Funcionário</label>

        <input
          v-model="funcionario"
          type="text"
          placeholder="Digite o nome do funcionário"
          required
        />
      </div>

      <div class="form-group">

        <label>EPI</label>

        <select v-model="epiSelecionado" required>

          <option value="">
            Selecione um EPI
          </option>

          <option
            v-for="epi in epis"
            :key="epi.id"
            :value="epi"
          >
            {{ epi.nome_epi }}
          </option>

        </select>

      </div>

      <div class="form-group">

        <label>Quantidade</label>

        <input
          v-model="quantidade"
          type="number"
          min="1"
          required
        />

      </div>

      <button type="submit">
        Registrar Retirada
      </button>

    </form>

  </div>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const epis = ref([])

const funcionario = ref('')
const epiSelecionado = ref('')
const quantidade = ref(1)

const carregarEPIs = async () => {

  const { data, error } = await supabase
    .from('inventario')
    .select('*')

  if (error) {
    console.error(error)
    return
  }

  epis.value = data
}

const registrarRetirada = async () => {

  if (
    quantidade.value >
    epiSelecionado.value.quantidade
  ) {
    alert('Quantidade indisponível em estoque')
    return
  }

  /* REGISTRA RETIRADA */

  const { error } = await supabase
    .from('retirada')
    .insert([
      {
        funcionario: funcionario.value,
        epi_id: epiSelecionado.value.id,
        nome_epi: epiSelecionado.value.nome_epi,
        quantidade: quantidade.value
      }
    ])

  if (error) {
    console.error(error)
    alert('Erro ao registrar retirada')
    return
  }

  /* ATUALIZA ESTOQUE */

  const novoEstoque =
    epiSelecionado.value.quantidade -
    quantidade.value

  await supabase
    .from('inventario')
    .update({
      quantidade: novoEstoque
    })
    .eq('id', epiSelecionado.value.id)

  alert('Retirada registrada com sucesso')

  funcionario.value = ''
  epiSelecionado.value = ''
  quantidade.value = 1

  carregarEPIs()
}

onMounted(() => {
  carregarEPIs()
})

</script>

<style scoped>

.header-section {
  text-align: left;
  padding-bottom: 1rem;
}

.retirada-page {
  padding: 1rem;
}

.top-section {
  margin-bottom: 30px;
}

.top-section h1 {
  font-size: 36px;
  color: #2f3a4d;
}

.form-retirada {
  width: 100%;
  max-width: 500px;

  background: #eadcf6;

  padding: 24px;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select {

  height: 45px;

  border: none;
  border-radius: 8px;

  padding: 0 14px;

  font-size: 14px;

  outline: none;
}

button {

  height: 46px;

  border: none;
  border-radius: 10px;

  background: #7300FF;

  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

button:hover {
  opacity: 0.9;
}

</style>