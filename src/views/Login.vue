<template>
  <div class="login-page">
    <div class="right-side">
      <img src="/public/imagem-login.svg" alt="Background" class="login-image" />
    </div>

    <!-- LADO ESQUERDO — formulário -->
    <div class="left-side">
      <div class="form-container">

        <div class="mini-logo">
          <img class="abs-logo" src="/public/icon-abstract-login.svg" alt="Logo">
        </div>

        <h1>Bem-vindo(a) de volta!</h1>

        <div class="divider">
          <span>forneça suas credenciais</span>
        </div>

        <form @submit.prevent="fazerLogin">

          <div class="input-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" placeholder="mail@abc.com" />
          </div>

          <div class="input-group">
            <label for="password">Senha</label>
            <div class="password-box">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="senha"
                placeholder="Digite sua senha" />
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="senha"
                placeholder="Digite sua senha"
              />
              <button type="button" class="show-btn" @click="showPassword = !showPassword">
                {{ showPassword ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>
          </div>

          <div class="options">
            <label>
              <input type="checkbox" />
              Lembrar senha
            </label>
            <a href="#">Esqueceu senha?</a>
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

    <!-- LADO DIREITO — imagem decorativa (some no mobile) -->
    <div class="right-side">
      <img src="/public/imagem-login.svg" alt="Background" class="login-image" />
    </div>

  </div>
</template>

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
const showPassword = ref(false)

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
  } catch (err) {
    erro.value = 'Erro ao fazer login. Tente novamente mais tarde.'
    console.error('Erro ao fazer login:', err)
    carregando.value = false
  }
}
</script>

<style scoped>
/* ESTRUTURA PRINCIPAL */
.login-page {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.login-image {
  display: none;
}

/* LADO ESQUERDO */
.left-side {
  width: 45%;
  min-width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  background: #fff;
  z-index: 1;
}

/* FORMULÁRIO */
.form-container {
  width: 100%;
  max-width: 400px;
  animation: fade 0.6s ease;
}

/* LOGO */
.mini-logo {
  margin-bottom: 1rem;
}

.abs-logo {
  width: 3rem;
}

/* TÍTULO */
h1 {
  font-size: 2rem;
  color: #444;
  margin: 0 0 0.5rem;
}

/* DIVISOR */
.divider {
  margin: 1.5rem 0;
  text-align: center;
  color: #aaa;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  width: 22%;
  height: 1px;
  background: #dadada;
  top: 50%;
}

.divider::before { left: 0; }
.divider::after  { right: 0; }

/* INPUTS */
.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: 0.3s;
  box-sizing: border-box;
  font-size: 14px;
}

.input-group input::placeholder { color: #bbb; }

.input-group input:focus {
  border-color: #7B1E6A;
  outline: none;
  box-shadow: 0 0 0 4px rgba(123, 30, 106, 0.1);
}

/* SENHA */
.password-box {
  position: relative;
}

.show-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: #a593a2;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  padding: 0;
}

.show-btn:hover { opacity: 0.7; }

/* OPÇÕES */
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.options label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.options a {
  color: #7B1E6A;
  text-decoration: none;
  font-weight: 500;
}

.options a:hover { text-decoration: underline; }

/* ERRO */
.mensagem-erro {
  color: #d32f2f;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 1.25rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mensagem-erro i { flex-shrink: 0; }

/* BOTÃO */
.botao-entrar {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background: #7B1E6A;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.botao-entrar:hover:not(:disabled) {
  background: #4A1240;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(123, 30, 106, 0.3);
}

.botao-entrar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ANIMAÇÃO */
@keyframes fade {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── RESPONSIVO ── */
@media (max-width: 900px) {
  .login-page {
    background: #fff;
    justify-content: center;
    align-items: center;
  }

/* Abaixo de 960px — esconde a imagem, formulário ocupa tudo */
@media (max-width: 960px) {
  .right-side {
    display: none;
  }

  .left-side {
    width: 100%;
    min-height: 100vh;
    padding: 2rem 1.5rem;
  }

  .form-container {
    max-width: 420px;
    margin: 0 auto;
  }

  h1 { font-size: 1.75rem; }
}

@media (max-width: 480px) {
  .left-side {
    padding: 2.5rem 1.25rem;
    align-items: flex-start;
  }

  .form-container {
    max-width: 100%;
  }

  h1 { font-size: 1.5rem; }

  .botao-entrar {
    padding: 13px;
    font-size: 0.95rem;
  }
}
</style>