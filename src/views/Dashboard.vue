<template>
  <main class="dashboard-layout">
 
    <!-- SIDEBAR -->
    <Sidebar />
 
    <!-- CONTEÚDO -->
    <section class="dashboard-content">
      <RouterView />
    </section>
 
  </main>
</template>
 
<script setup>
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
 