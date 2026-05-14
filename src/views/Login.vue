<template>
  <div class="login-page">

    <!-- LADO ESQUERDO -->
    <div class="left-side">

      <div class="form-container">

        <div class="mini-logo">
          ✣
        </div>

        <h1>Bem-vindo(a) de volta!</h1>

        <GoogleButton />

        <div class="divider">
          <span>ou entre com o seu e-mail</span>
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

            <a href="#">
              Esqueceu senha?
            </a>

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

    <!-- LADO DIREITO -->
    <div class="right-side">

      <img src="/imagem-login.png" alt="Imagem Login" class="login-image" />

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'
import GoogleButton from '../../components/GoogleButton.vue'
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
  }
  catch (err) {
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
  min-height: 100vh;
  background: #f5f5f5;
}

/* LADO ESQUERDO */

.left-side {
  width: 40%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

/* FORMULÁRIO */

.form-container {
  width: 100%;
  max-width: 380px;
  animation: fade 0.6s ease;
}

/* LOGO */

.mini-logo {
  font-size: 40px;
  color: #7B1E6A;
  margin-bottom: 20px;
}

/* TÍTULO */

h1 {
  font-size: 38px;
  color: #444;
  margin-bottom: 30px;
}

/* DIVISOR */

.divider {
  margin: 25px 0;
  text-align: center;
  color: #aaa;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 1px;
  background: #ddd;
  top: 50%;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

/* INPUTS */

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: 0.3s;
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: #bbb;
}

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
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: #7B1E6A;
  cursor: pointer;
  font-weight: bold;
}

/* OPÇÕES */

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.options a {
  color: #7B1E6A;
  text-decoration: none;
}

.options a:hover {
  text-decoration: underline;
}

/* MENSAGEM DE ERRO */

.mensagem-erro {
  color: #d32f2f;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
}

.mensagem-erro i {
  margin-right: 8px;
}

/* BOTÃO */

.botao-entrar {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: #7B1E6A;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.botao-entrar:hover {
  background: #4A1240;
  transform: translateY(-2px);
}

/* LADO DIREITO */

.right-side {
  width: 60%;
  overflow: hidden;
}

.login-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

/* ANIMAÇÃO */

@keyframes fade {

  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVO */

@media (max-width: 900px) {

  .login-page {
    flex-direction: column;
  }

  .left-side {
    width: 100%;
    min-height: 100vh;
  }

  .right-side {
    display: none;
  }

  h1 {
    font-size: 30px;
  }
}
</style>