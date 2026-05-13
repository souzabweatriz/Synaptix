<template>
  <button class="google-btn">
    <i class="fab fa-google"></i>
    Continuar com Google
  </button>
</template>

<script setup>
// Add Google login logic here if needed
</script>

<style scoped>
.google-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
}

.google-btn:hover {
  background: #f5f5f5;
}

.google-btn i {
  margin-right: 10px;
}
</style>