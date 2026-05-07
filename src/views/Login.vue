<template>
  <div class="container-login">
    <div class="form-box">
      <div class="logotipo">
        <img class="logo" src="../assets/LogoTipo.svg">
      </div>
      <form @submit.prevent="fazerLogin" class="formulario">
        <div class="form-group">
          <label for="email" class="label">E-mail:</label>
          <input id="email" v-model="email" type="email" placeholder="seu@email.com" class="input" required />
        </div>
        <div class="form-group">
          <label for="senha" class="label">Senha:</label>
          <input id="senha" v-model="senha" type="password" placeholder="Digite sua senha" class="input" required />
        </div>
        <div v-if="erro" class="mensagem-erro">
          <i class="fas fa-exclamation-circle"></i>
          {{ erro }}
        </div>
        <button type="submit" class="botao-entrar" :disabled="carregando">
          <i v-if="carregando" class="fas fa-spinner fa-spin"></i>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>
 
<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0A3B59;
}
 
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding-top: 0.8rem;
  height: 30rem;
  width: 35rem;
  border-color: #0A3B59;
  border: solid 1px;
}
 
.logotipo {
  display: flex;
  padding: 1.2rem;
}
 
.logo {
  height: 6rem;
}
 
.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}
 
.form-group {
  display: flex;
  flex-direction: column;
}
 
.label {
  font-weight: 600;
  font-size: 1.1rem;
  color: #070707;
  padding-left: 1rem;
}
 
.input {
  display: flex;
  width: 25rem;
  height: 2.5rem;
  padding: 0rem 0rem 0rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
  border: solid 1px;
  border-color: #0A3B59;
  border-radius: 2rem;
  color: #070707;
  background-color: #Ffffff;
  transition: all 0.3s ease;
}
 
.input:focus {
  outline: none;
  border-color: #0A3B59;
}
 
.mensagem-erro {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 25rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #FECACA;
  border: 1px solid #FECACA;
  color: #D94d1a;
  font-size: 1rem;
}
 
.mensagem-erro i {
  font-size: 18px;
}
 
.botao-entrar {
  width: 25rem;
  height: 2.5rem;
  background-color: #003D99;
  color: #F2f2f2;
  border: none;
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 44px;
}
 
.botao-entrar:hover:not(:disabled) {
  background-color: #002D73;
}
 
.botao-entrar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
 
@media (max-width: 600px) {
  .form-box {
    padding: 30px 20px;
  }
 
  .titulo {
    font-size: 24px;
  }
 
  .subtitulo {
    font-size: 14px;
  }
}
</style>
 
<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'
const { supabase } = useSupabase()
const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)
async function fazerLogin() {
  erro.value = ''
  if (!email.value || !senha.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }
  carregando.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: senha.value
    })
    if (error) {
      erro.value = 'E-mail ou senha incorretos. Tente novamente.'
      carregando.value = false
      return
    }
    router.push('/Dashboard')
  }
  catch (err) {
    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'
    console.error('Erro ao fazer login:', err)
    carregando.value = false
  }
}
</script>
 