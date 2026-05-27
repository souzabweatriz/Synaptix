<template>
  <div class="page-container">
    <main class="main-content">
      <header class="content-header">
        <h1>Relatórios</h1>
        <p>Gere e visualize relatórios sobre o estoque de EPIs</p>
      </header>

      <section class="reports-card-panel">
        <h2>Relatórios Disponíveis</h2>
        <p class="subtitle">Clique para visualizar ou fazer download</p>

        <div class="report-list">
          <div class="report-row-item">
            <div class="report-info-group">
              <div class="icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div class="report-text">
                <h3>Relatório de Movimentação Completa</h3>
                <p>Histórico global de entradas e saídas do estoque</p>
              </div>
            </div>
            <div class="button-group">
              <button class="btn-action-outline" @click="abrirVisualizacao('movimentacao')">Visualizar</button>
              <button class="btn-action-filled" @click="baixarDireto('movimentacao')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>

          <div class="report-row-item">
            <div class="report-info-group">
              <div class="icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
              <div class="report-text">
                <h3>Inventário Completo</h3>
                <p>Lista completa de todos os EPIs em estoque</p>
              </div>
            </div>
            <div class="button-group">
              <button class="btn-action-outline" @click="abrirVisualizacao('inventario')">Visualizar</button>
              <button class="btn-action-filled" @click="baixarDireto('inventario')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>

          <div class="report-row-item">
            <div class="report-info-group">
              <div class="icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <div class="report-text">
                <h3>Análise de Fornecedores</h3>
                <p>Comparativo de preços e qualidade dos fornecedores</p>
              </div>
            </div>
            <div class="button-group">
              <button class="btn-action-outline" @click="abrirVisualizacao('fornecedores')">Visualizar</button>
              <button class="btn-action-filled" @click="baixarDireto('fornecedores')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>

          <div class="report-row-item">
            <div class="report-info-group">
              <div class="icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div class="report-text">
                <h3>Itens com Estoque Baixo</h3>
                <p>EPIs que precisam de reposição urgente</p>
              </div>
            </div>
            <div class="button-group">
              <button class="btn-action-outline" @click="abrirVisualizacao('estoque_baixo')">Visualizar</button>
              <button class="btn-action-filled" @click="baixarDireto('estoque_baixo')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer class="info-footer-card">
        <div class="footer-title">
          <span class="lightbulb-icon">💡</span>
          <h3>Informações úteis</h3>
        </div>
        <p>Os relatórios auxiliam nas análises necessárias para tomadas de decisões sobre diversas situações. Ao emitir um relatório de "Itens com Estoque Baixo", por exemplo, você pode visualizar quais produtos já possuem um saldo baixo e providenciar uma nova compra com o setor de Suprimentos.</p>
        <p>Para o "Relatório de Movimentação Mensal", é possível acompanhar quais EPIs possuem maiores entradas ou compras e quais estão saindo mais do que entrando no estoque.</p>
      </footer>

      <div v-if="mostrarModalVisualizar" class="modal-overlay" @click.self="mostrarModalVisualizar = false">
        <div class="modal-box">
          <header class="modal-header">
            <h3>Visualização: {{ tituloRelatorioAtivo }}</h3>
            <button class="btn-close" @click="mostrarModalVisualizar = false">✕</button>
          </header>
          <div class="modal-body">
            <div v-if="carregando" class="loading-state">Buscando dados no Supabase...</div>
            
            <div v-else-if="dadosRelatorio.length === 0" class="loading-state">Nenhum registro encontrado no banco de dados.</div>

            <div v-else class="table-container">
              <table class="preview-table">
                <thead>
                  <tr v-if="tipoRelatorioAtivo === 'movimentacao'">
                    <th>Funcionário</th>
                    <th>EPI</th>
                    <th>Quantidade</th>
                    <th>Data Retirada</th>
                    <th>Observações</th>
                  </tr>
                  <tr v-else-if="tipoRelatorioAtivo === 'inventario' || tipoRelatorioAtivo === 'estoque_baixo'">
                    <th>Nome</th>
                    <th>C.A.</th>
                    <th>Categoria</th>
                    <th>Qtd Estoque</th>
                    <th>Fornecedor</th>
                    <th>Preço</th>
                  </tr>
                  <tr v-else-if="tipoRelatorioAtivo === 'fornecedores'">
                    <th>Fornecedor</th>
                    <th>EPI</th>
                    <th>Preço</th>
                    <th>Status Atual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in dadosRelatorio" :key="item.id">
                    <template v-if="tipoRelatorioAtivo === 'movimentacao'">
                      <td>{{ item.funcionarios?.nome || 'Não Informado' }}</td>
                      <td>{{ item.epis?.nome || 'Não Informado' }}</td>
                      <td>{{ item.quantidade }} un</td>
                      <td>{{ formatarData(item.data_retirada) }}</td>
                      <td>{{ item.observacoes || '-' }}</td>
                    </template>
                    
                    <template v-if="tipoRelatorioAtivo === 'inventario' || tipoRelatorioAtivo === 'estoque_baixo'">
                      <td>{{ item.nome }}</td>
                      <td>{{ item.ca_numero || '-' }}</td>
                      <td>{{ item.categoria || '-' }}</td>
                      <td :class="{ 'text-danger': item.quantidade <= 5 }">{{ item.quantidade }} un</td>
                      <td>{{ item.fornecedor || '-' }}</td>
                      <td>R$ {{ item.preco?.toFixed(2) }}</td>
                    </template>

                    <template v-if="tipoRelatorioAtivo === 'fornecedores'">
                      <td><strong>{{ item.fornecedor || 'Sem Fornecedor' }}</strong></td>
                      <td>{{ item.nome }}</td>
                      <td>R$ {{ item.preco?.toFixed(2) }}</td>
                      <td>{{ item.ativo ? 'Ativo' : 'Inativo' }}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div style="display: none;">
        <div id="pdf-template-container" class="pdf-print-area">
          <h2>Synaptix &mdash; {{ tituloRelatorioAtivo }}</h2>
          <p>Relatório gerado em: {{ new Date().toLocaleDateString('pt-BR') }}</p>
          <hr />
          <table class="pdf-table">
            <thead>
              <tr v-if="tipoRelatorioAtivo === 'movimentacao'">
                <th>Funcionário</th><th>EPI</th><th>Qtd</th><th>Data</th>
              </tr>
              <tr v-else>
                <th>Item</th><th>C.A.</th><th>Fornecedor</th><th>Qtd</th><th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dadosRelatorio" :key="item.id">
                <template v-if="tipoRelatorioAtivo === 'movimentacao'">
                  <td>{{ item.funcionarios?.nome }}</td>
                  <td>{{ item.epis?.nome }}</td>
                  <td>{{ item.quantidade }}</td>
                  <td>{{ formatarData(item.data_retirada) }}</td>
                </template>
                <template v-else>
                  <td>{{ item.nome }}</td>
                  <td>{{ item.ca_numero || '-' }}</td>
                  <td>{{ item.fornecedor || '-' }}</td>
                  <td>{{ item.quantidade }}</td>
                  <td>R$ {{ item.preco?.toFixed(2) }}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useSupabase } from '../composables/useSupabase';
import html2pdf from 'html2pdf.js';

const { supabase } = useSupabase();

const mostrarModalVisualizar = ref(false);
const tipoRelatorioAtivo = ref('');
const dadosRelatorio = ref([]);
const carregando = ref(false);

const tituloRelatorioAtivo = computed(() => {
  if (tipoRelatorioAtivo.value === 'movimentacao') return 'Relatório de Movimentação Mensal';
  if (tipoRelatorioAtivo.value === 'inventario') return 'Inventário Completo';
  if (tipoRelatorioAtivo.value === 'fornecedores') return 'Análise de Fornecedores';
  if (tipoRelatorioAtivo.value === 'estoque_baixo') return 'Itens com Estoque Baixo';
  return 'Relatório';
});

const buscarDadosBanco = async (tipo) => {
  carregando.value = true;
  tipoRelatorioAtivo.value = tipo;
  dadosRelatorio.value = [];
  
  try {
    if (tipo === 'movimentacao') {
      const { data, error } = await supabase
        .from('retirada_epis')
        .select(`
          id,
          quantidade,
          data_retirada,
          observacoes,
          funcionarios!fk_retirada_funcionarios ( nome ),
          epis!fk_retirada_epis ( nome )
        `)
        .order('data_retirada', { ascending: false });
        
      if (error) throw error;
      dadosRelatorio.value = data || [];
    } 
    else if (tipo === 'inventario') {
      const { data, error } = await supabase
        .from('epis')
        .select('*')
        .order('nome');
        
      if (error) throw error;
      dadosRelatorio.value = data || [];
    }
    else if (tipo === 'estoque_baixo') {
      const { data, error } = await supabase
        .from('epis')
        .select('*')
        .lte('quantidade', 10)
        .order('quantidade');
        
      if (error) throw error;
      dadosRelatorio.value = data || [];
    }
    else if (tipo === 'fornecedores') {
      const { data, error } = await supabase
        .from('epis')
        .select('id, nome, fornecedor, preco, ativo')
        .order('fornecedor');
        
      if (error) throw error;
      dadosRelatorio.value = data || [];
    }
    
    console.log(`Dados carregados (${tipo}):`, dadosRelatorio.value);
  } catch (err) {
    console.error("Erro ao carregar dados do Supabase:", err.message);
  } finally {
    carregando.value = false;
  }
};

const abrirVisualizacao = async (tipo) => {
  await buscarDadosBanco(tipo);
  mostrarModalVisualizar.value = true;
};

const baixarDireto = async (tipo) => {
  await buscarDadosBanco(tipo);
  await nextTick();
  
  const elemento = document.getElementById('pdf-template-container');
  const opcoes = {
    margin:       15,
    filename:     `synaptix_${tipo}_2026.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opcoes).from(elemento).save();
};

const formatarData = (dataStr) => {
  if (!dataStr) return '-';
  const parts = dataStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`; 
};
</script>

<style scoped>
.page-container { min-height: 100vh; background-color: #f7f6fb; display: flex; justify-content: center; width: 100%; }
.main-content { flex: 1; padding: 40px 50px; max-width: 1200px; }
.content-header { margin-bottom: 30px; }
.content-header h1 { font-size: 26px; color: #1e1e24; margin: 0 0 6px 0; font-family: sans-serif; }
.content-header p { color: #72727a; margin: 0; font-size: 14.5px; }
.reports-card-panel { background-color: #f0e7f6; border-radius: 16px; padding: 30px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01); margin-bottom: 35px; }
.reports-card-panel h2 { font-size: 20px; color: #2d2d35; margin: 0; }
.subtitle { color: #72727a; font-size: 13.5px; margin: 4px 0 25px 0; }
.report-list { display: flex; flex-direction: column; gap: 14px; }
.report-row-item { background-color: #ffffff; border-radius: 12px; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e3dbe8; }
.report-info-group { display: flex; align-items: center; gap: 18px; }
.icon-wrapper { width: 44px; height: 44px; background-color: #7a1fa2; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.report-text h3 { font-size: 15.5px; color: #2d2d35; margin: 0 0 3px 0; font-weight: 600; }
.report-text p { font-size: 12.5px; color: #72727a; margin: 0; }
.button-group { display: flex; gap: 12px; }
.btn-action-outline { border: 1px solid #ced4da; background: white; padding: 9px 20px; border-radius: 6px; font-weight: 600; font-size: 13.5px; cursor: pointer; color: #495057; }
.btn-action-outline:hover { background-color: #f8f9fa; }
.btn-action-filled { background-color: #4a148c; color: white; border: none; padding: 9px 20px; border-radius: 6px; font-weight: 600; font-size: 13.5px; display: flex; align-items: center; cursor: pointer; }
.btn-action-filled:hover { background-color: #320d5f; }
.info-footer-card { background-color: #fef4f6; border-radius: 12px; padding: 24px; border: 1px solid #fcd5dd; }
.footer-title { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #c2185b; }
.footer-title h3 { margin: 0; font-size: 15px; font-weight: 600; }
.info-footer-card p { font-size: 13px; color: #495057; line-height: 1.6; margin: 0 0 12px 0; }
.info-footer-card p:last-child { margin-bottom: 0; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-box { background: white; border-radius: 12px; width: 90%; max-width: 900px; padding: 24px; max-height: 85vh; display: flex; flex-direction: column; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.btn-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #aaa; }
.table-container { overflow-x: auto; flex: 1; }
.preview-table { width: 100%; border-collapse: collapse; }
.preview-table th { background-color: #f1f3f5; padding: 10px; text-align: left; font-size: 13px; color: #495057; border-bottom: 2px solid #dee2e6; }
.preview-table td { padding: 12px 10px; border-bottom: 1px solid #dee2e6; font-size: 13.5px; color: #333; }
.text-danger { color: #dc3545; font-weight: bold; }
.loading-state { text-align: center; padding: 30px; color: #72727a; }
.pdf-print-area { font-family: Arial, sans-serif; }
.pdf-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
.pdf-table th { background-color: #4a148c; color: white; padding: 8px; text-align: left; font-size: 12px; }
.pdf-table td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 11px; }
</style>