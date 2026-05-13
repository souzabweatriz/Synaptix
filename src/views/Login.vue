<template>
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

      <form @submit.prevent="login">

        <div class="input-group">
          <label>E-mail</label>
          <input
            type="email"
            v-model="email"
            placeholder="mail@abc.com"
          />
        </div>

        <div class="input-group">
          <label>Senha</label>

          <div class="password-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Digite sua senha"
            />

            <button
              type="button"
              class="show-btn"
              @click="showPassword = !showPassword"
            >
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

        <button class="login-btn">
          Entrar
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const login = () => {
  if (!email.value || !password.value) {
    alert('Preencha todos os campos!')
    return
  }

  alert('Login realizado!')
}
</script>

<style scoped>
.left-side {
  width: 40%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 380px;
}

.mini-logo {
  font-size: 40px;
  color: #7B1E6A;
  margin-bottom: 20px;
}

h1 {
  font-size: 38px;
  color: #444;
  margin-bottom: 30px;
}

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
}

.input-group input:focus {
  border-color: #7B1E6A;
  outline: none;
  box-shadow: 0 0 0 4px rgba(123, 30, 106, 0.1);
}

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
}

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

.login-btn {
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

.login-btn:hover {
  background: #4A1240;
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .left-side {
    width: 100%;
    height: 100vh;
  }
}
</style>


---