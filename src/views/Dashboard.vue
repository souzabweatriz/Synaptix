<template>
  <main class="dashboard-layout">
    <Sidebar class="dashboard-sidebar" />
    <section class="dashboard-content">
      <RouterView />
    </section>
  </main>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #F8F9FA;
}

/* Sidebar fixa na esquerda */
.dashboard-sidebar {
  width: 15rem;
  flex-shrink: 0;
}

/* Conteúdo principal */
.dashboard-content {
  flex: 1;
  padding: 1rem;
  overflow-x: hidden;
}
</style>