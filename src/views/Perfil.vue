<template>
    <section class="profile-page">
        <div class="page-header">
            <p class="subtitle">Perfil</p>
            <h1>Meu Perfil</h1>
        </div>

        <div class="profile-card">
            <div class="profile-card-top">
                <div class="profile-avatar"></div>

                <div class="profile-top-info">
                    <h2>{{ profile.nome }}</h2>
                    <span>{{ profile.cargo }}</span>
                </div>
            </div>

            <div class="profile-card-body">
                <div class="profile-grid">

                    <div
                        class="profile-field"
                        v-for="(field, key) in fields"
                        :key="key"
                    >
                        <label>{{ field.label }}</label>

                        <div v-if="!isEditing" class="profile-value">
                            <span class="field-icon">
                                {{ field.icon }}
                            </span>

                            {{ profile[key] }}
                        </div>

                        <div v-else class="profile-input-wrapper">
                            <span class="field-icon">
                                {{ field.icon }}
                            </span>

                            <input
                                v-model="profile[key]"
                                class="profile-input"
                                type="text"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div class="profile-card-footer">

                <button
                    class="btn btn-edit"
                    @click="toggleEdit"
                >
                    {{ isEditing ? 'Salvar Perfil' : 'Editar Perfil' }}
                </button>

                <button
                    class="btn btn-delete"
                    @click="showDeleteModal = true"
                >
                    Excluir Perfil
                </button>

            </div>
        </div>

        <!-- MODAL EXCLUIR -->
        <div
            v-if="showDeleteModal"
            class="modal-overlay"
        >
            <div class="modal-card">

                <h2>Confirmar Exclusão</h2>

                <p>
                    Digite sua senha para excluir sua conta permanentemente.
                </p>

                <input
                    v-model="password"
                    type="password"
                    placeholder="Digite sua senha"
                    class="modal-input"
                />

                <div class="modal-actions">
                    <button
                        class="btn-cancel"
                        @click="closeModal"
                    >
                        Cancelar
                    </button>

                    <button
                        class="btn-confirm"
                        @click="deleteProfile"
                    >
                        Confirmar Exclusão
                    </button>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const isEditing = ref(false)
const showDeleteModal = ref(false)
const password = ref('')

const profile = ref({
    nome: 'Ana Paula',
    setor: 'Laboratório',
    cargo: 'Professora de Química',
    admissao: '10/11/2025',
    id: 'AP0804001',
    telefone: '(19) 90123-4567',
    nascimento: '08/04/2001',
    email: 'ana.paula@senaisc.edu.br'
})

const fields = {
    nome: {
        label: 'Nome',
        icon: '👤'
    },
    setor: {
        label: 'Setor',
        icon: '🏢'
    },
    cargo: {
        label: 'Cargo',
        icon: '📌'
    },
    admissao: {
        label: 'Data de Admissão',
        icon: '📅'
    },
    id: {
        label: 'ID',
        icon: '🔒'
    },
    telefone: {
        label: 'Telefone',
        icon: '📞'
    },
    nascimento: {
        label: 'Data de Nascimento',
        icon: '🎂'
    },
    email: {
        label: 'E-mail',
        icon: '✉️'
    }
}

const toggleEdit = async () => {
    if (isEditing.value) {
        await saveProfile()
    }

    isEditing.value = !isEditing.value
}

const saveProfile = async () => {
    try {
        const {
            data: { user }
        } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('profiles')
            .update({
                nome: profile.value.nome,
                setor: profile.value.setor,
                cargo: profile.value.cargo,
                telefone: profile.value.telefone
            })
            .eq('id', user.id)

        if (error) throw error

        alert('Perfil atualizado com sucesso!')
    } catch (error) {
        console.error(error)
        alert('Erro ao atualizar perfil.')
    }
}

const deleteProfile = async () => {
    try {
        const {
            data: { user }
        } = await supabase.auth.getUser()

        // Reautenticar usuário
        const { error: loginError } =
            await supabase.auth.signInWithPassword({
                email: profile.value.email,
                password: password.value
            })

        if (loginError) {
            alert('Senha incorreta.')
            return
        }

        // Deletar perfil da tabela
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', user.id)

        if (profileError) throw profileError

        // Logout
        await supabase.auth.signOut()

        alert('Perfil excluído com sucesso.')

        window.location.href = '/login'

    } catch (error) {
        console.error(error)
        alert('Erro ao excluir perfil.')
    }
}

const closeModal = () => {
    showDeleteModal.value = false
    password.value = ''
}
</script>

<style scoped>
.profile-page {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 1.5rem 2rem;
    min-height: calc(100vh - 2rem);
    background: #07101f;
    color: #f3f4f8;
}

.page-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.page-header h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
}

.subtitle {
    color: #7f8fa4;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
}

.profile-card {
    width: 100%;
    background: #141823;
    border-radius: 2rem;
    overflow: hidden;
}

.profile-card-top {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2.5rem;
}

.profile-avatar {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff7a18 0%, #8e2de2 100%);
}

.profile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 2rem;
}

.profile-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.profile-value,
.profile-input-wrapper {
    min-height: 3.5rem;
    background: #242b3a;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.profile-input {
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    outline: none;
    font-size: 1rem;
}

.field-icon {
    width: 2rem;
    text-align: center;
}

.profile-card-footer {
    display: flex;
    gap: 1rem;
    padding: 2rem;
}

.btn {
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: bold;
}

.btn-edit {
    background: #1d4f34;
    color: white;
}

.btn-delete {
    background: #e30a1c;
    color: white;
}

/* MODAL */

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-card {
    width: 100%;
    max-width: 420px;
    background: #141823;
    padding: 2rem;
    border-radius: 1.5rem;
}

.modal-card h2 {
    margin-bottom: 1rem;
}

.modal-card p {
    color: #9ea8bf;
    margin-bottom: 1rem;
}

.modal-input {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    background: #242b3a;
    color: white;
    margin-bottom: 1.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
}

.btn-cancel,
.btn-confirm {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: bold;
}

.btn-cancel {
    background: #2d3748;
    color: white;
}

.btn-confirm {
    background: #e30a1c;
    color: white;
}

@media (max-width: 768px) {
    .profile-grid {
        grid-template-columns: 1fr;
    }
}
</style>