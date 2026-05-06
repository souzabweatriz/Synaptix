<template>
  <main class="dashboard-layout">
    <Sidebar  class="dashboard-sidebar"/>
    <section class="dashboard-content">
      <RouterView />
    </section>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '../../components/Sidebar.vue';
</script>