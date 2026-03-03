<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mail, Lock, User } from 'lucide-vue-next'

import BaseInput from '@/components/VInpput/VInput.vue'
import PasswordInput from '@/components/VInpput/VPasswordInput.vue'
import BaseButton from '@/components/VButton/VButton.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const passwordsMatch = computed(() => {
    return (
        password.value &&
        confirmPassword.value &&
        password.value === confirmPassword.value
    )
})
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-600 to-green-500 px-4">
        <div
            class="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 text-white">
            <!-- Title -->
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold">Crear Cuenta</h2>
                <p class="text-white/80 text-sm mt-2">
                    Regístrate para comenzar
                </p>
            </div>

            <form class="space-y-5">

                <!-- Name -->
                <BaseInput v-model="name" label="Nombre" type="text" placeholder="Tu nombre" :icon="User" />

                <!-- Email -->
                <BaseInput v-model="email" label="Email" type="email" placeholder="correo@email.com" :icon="Mail" />

                <!-- Password -->
                <PasswordInput v-model="password" label="Contraseña" :icon="Lock" />

                <!-- Confirm Password -->
                <div>
                    <PasswordInput v-model="confirmPassword" label="Confirmar Contraseña" :icon="Lock" />

                    <p v-if="confirmPassword && !passwordsMatch" class="text-red-300 text-sm mt-1">
                        Las contraseñas no coinciden
                    </p>
                </div>

                <!-- Button -->
                <BaseButton type="submit" text="Crear Cuenta" />

            </form>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-6">
                <div class="flex-1 h-px bg-white/40"></div>
                <span class="text-sm text-white/80">o</span>
                <div class="flex-1 h-px bg-white/40"></div>
            </div>

            <!-- Login link -->
            <p class="text-center text-sm text-white/90">
                ¿Ya tienes cuenta?
                <RouterLink to="/login" class="font-semibold hover:underline">
                    Inicia sesión aquí
                </RouterLink>
            </p>

        </div>
    </div>
</template>