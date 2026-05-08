<template>
  <main class="dashboard-layout">
    <Sidebar class="dashboard-sidebar" />

    <!-- SIDEBAR -->
    <Sidebar />

    <!-- CONTEÚDO -->
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
import { RouterView } from 'vue-router'
import Sidebar from '../../components/Sidebar.vue'
</script>

<style scoped>

/* LAYOUT */

.dashboard-layout {
  display: flex;

  width: 100%;
  min-height: 100vh;

  background: #f8f9fa;
}

/* CONTEÚDO */

.dashboard-content {
  flex: 1;

  margin-left: 250px;

  padding: 30px;

  min-height: 100vh;

  overflow-x: hidden;
}

</style>